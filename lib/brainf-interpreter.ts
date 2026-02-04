/**
 * BrainF++ interpreter matching Interpreter.java behavior.
 * Cell values are kept in 0..32767 (Java short as unsigned for output).
 */

export function interpretBrainF(code: string, input: string): string {
  const limit = 26;
  const global = 1;
  const memory = new Array(limit + global).fill(0);
  const funcMap = new Map<string, string>();
  let inputPointer = 0;
  let output = '';
  const maxSteps = 1000000;
  let totalSteps = 0;

  let i = 0;
  let funcName = '';
  let funcBody = '';
  let inFunc = false;

  while (i < code.length) {
    const char = code[i];
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    if (char === '{' && !inFunc) {
      inFunc = true;
      funcBody = '';
      i++;
      while (i < code.length && /\s/.test(code[i])) i++;
      if (i >= code.length || !/[a-zA-Z]/.test(code[i])) {
        return 'ERROR: function name must be two letters';
      }
      funcName = code[i];
      i++;
      if (i >= code.length || !/[a-zA-Z]/.test(code[i])) {
        return 'ERROR: function name must be two letters';
      }
      funcName += code[i];
      i++;
      continue;
    }

    if (char === '}' && inFunc) {
      if (funcMap.has(funcName)) {
        return `ERROR: function ${funcName} defined twice`;
      }
      funcMap.set(funcName, funcBody);
      inFunc = false;
      i++;
      continue;
    }

    if (!inFunc) {
      i++;
      continue;
    }

    if (char === '(') {
      i++;
      while (i < code.length && /\s/.test(code[i])) i++;
      if (i >= code.length || !/[a-zA-Z]/.test(code[i])) {
        return 'ERROR: function name must be two letters';
      }
      funcBody += code[i];
      i++;
      if (i >= code.length || !/[a-zA-Z]/.test(code[i])) {
        return 'ERROR: function name must be two letters';
      }
      funcBody += code[i];
      i++;
      continue;
    }

    if (char === '{') {
      return "ERROR: '{' found inside function declaration";
    }

    if (/[+\-\[\]<>.,;"]/.test(char)) {
      funcBody += char;
    }
    i++;
  }

  if (inFunc) {
    return 'ERROR: unclosed function';
  }

  if (!funcMap.has('mn')) {
    return 'ERROR: main function {mn} not found';
  }

  let steps = 0;
  const getInputChar = () => {
    if (inputPointer < input.length) {
      const code = input.charCodeAt(inputPointer);
      inputPointer++;
      return code;
    }
    return 0;
  };
  const hasInput = () => inputPointer < input.length;
  const outputChar = (char: string) => {
    output += char;
  };
  const outputDebug = (num: number) => {
    output += num + ' ';
  };
  const incrementSteps = () => {
    steps++;
    return steps < maxSteps;
  };

  const result = runFunction(
    'mn',
    global,
    memory,
    limit,
    global,
    funcMap,
    getInputChar,
    hasInput,
    outputChar,
    outputDebug,
    incrementSteps,
  );

  if (result === -1) {
    return output || 'ERROR: execution failed';
  }

  if (steps >= maxSteps) {
    return output + '\nERROR: Program exceeded maximum execution steps';
  }

  return output;
}

/** Emulate Java short: keep value in 16-bit signed range. */
function toShort(value: number): number {
  value = value % 65536;
  if (value >= 32768) value -= 65536;
  return value;
}

/** Match Java: if (memory[cellPointer] < 0) memory[cellPointer] = (short)(Short.MAX_VALUE + memory[cellPointer] + 1); */
function wrapCell(value: number): number {
  if (value < 0) {
    return 32767 + value + 1;
  }
  return value;
}

function runFunction(
  name: string,
  startIndex: number,
  memory: number[],
  limit: number,
  global: number,
  funcMap: Map<string, string>,
  getInputChar: () => number,
  hasInput: () => boolean,
  outputChar: (char: string) => void,
  outputDebug: (num: number) => void,
  incrementSteps: () => boolean,
): number {
  const operations = funcMap.get(name);
  if (!operations) {
    return -1;
  }

  let cellPointer = startIndex;
  let maxPointer = startIndex;
  let codePointer = 0;
  const jumpIndexes: number[] = [];

  while (codePointer < operations.length) {
    if (!incrementSteps()) {
      return -1;
    }

    const command = operations[codePointer];

    switch (command) {
      case ';':
        return memory[cellPointer];

      case '+':
        memory[cellPointer] = wrapCell(toShort(memory[cellPointer] + 1));
        break;

      case '-':
        memory[cellPointer] = wrapCell(toShort(memory[cellPointer] - 1));
        break;

      case '<':
        if (cellPointer === startIndex) {
          cellPointer = global;
        }
        cellPointer--;
        break;

      case '>':
        if (cellPointer === global - 1) {
          cellPointer = startIndex - 1;
        }
        cellPointer++;
        maxPointer = Math.max(maxPointer, cellPointer);
        break;

      case '.':
        // Java: (char) memory[cellPointer] = unsigned 16-bit code point
        outputChar(String.fromCharCode(memory[cellPointer] & 0xffff));
        break;

      case ',':
        memory[cellPointer] = hasInput()
          ? wrapCell(toShort(getInputChar()))
          : 0;
        break;

      case '"':
        outputDebug(memory[cellPointer]);
        break;

      case '[':
        if (memory[cellPointer] === 0) {
          let runningTotal = 1;
          while (runningTotal > 0 && codePointer < operations.length - 1) {
            codePointer++;
            if (operations[codePointer] === ']') runningTotal--;
            else if (operations[codePointer] === '[') runningTotal++;
          }
          if (
            codePointer === operations.length - 1 &&
            operations[codePointer] !== ']'
          ) {
            return -1;
          }
        } else {
          jumpIndexes.push(codePointer);
        }
        break;

      case ']':
        if (memory[cellPointer] !== 0) {
          codePointer = jumpIndexes[jumpIndexes.length - 1];
        } else {
          jumpIndexes.pop();
        }
        break;

      default:
        if (
          codePointer < operations.length - 1 &&
          /[a-zA-Z]/.test(command) &&
          /[a-zA-Z]/.test(operations[codePointer + 1])
        ) {
          const funcName = command + operations[codePointer + 1];

          while (maxPointer >= 0 && memory[maxPointer] === 0) maxPointer--;
          if (maxPointer < cellPointer) maxPointer = cellPointer;

          if (maxPointer === limit - 1) {
            return -1;
          }

          memory[maxPointer + 1] = memory[cellPointer];

          const returnValue = runFunction(
            funcName,
            maxPointer + 1,
            memory,
            limit,
            global,
            funcMap,
            getInputChar,
            hasInput,
            outputChar,
            outputDebug,
            incrementSteps,
          );

          if (returnValue === -1) return -1;

          memory[cellPointer] = wrapCell(toShort(returnValue));

          for (let x = maxPointer + 1; x < limit; x++) {
            memory[x] = 0;
          }

          codePointer++;
        }
        break;
    }

    codePointer++;

    if (cellPointer < 0 || cellPointer >= limit) {
      return -1;
    }
  }

  return memory[cellPointer];
}
