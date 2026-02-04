'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function LiveCodeEditor() {
  const [code, setCode] = useState(
    '{mn++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.>+.+++.------.--------.>+.>+.}',
  );
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    try {
      const result = interpretBrainF(code, input);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    setIsRunning(false);
  };

  const loadExample = (exampleCode: string, name: string) => {
    setCode(exampleCode);
    setOutput('');
    setInput('');
    setSelectedExample(name);
  };

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant={selectedExample === 'Hello World' ? 'default' : 'outline'}
          onClick={() =>
            loadExample(
              '{mn++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.>+.+++.------.--------.>+.>+.}',
              'Hello World',
            )
          }
          className="font-mono"
        >
          Hello World
        </Button>
        <Button
          variant={selectedExample === 'Simple Hi' ? 'default' : 'outline'}
          onClick={() =>
            loadExample('{mn++++++++[>+++++++++<-]>.>++++[>++++++++<-]>+<[->+<]>.}', 'Simple Hi')
          }
          className="font-mono"
        >
          Simple Hi
        </Button>
        <Button
          variant={selectedExample === 'ABC' ? 'default' : 'outline'}
          onClick={() => loadExample('{mn++++++++[>++++++++<-]>+.+.+.}', 'ABC')}
          className="font-mono"
        >
          ABC
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setCode('');
            setSelectedExample(null);
          }}
          className="font-mono"
        >
          Clear
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Editor and Input */}
        <div className="space-y-4">
          {/* Code Editor */}
          <div>
            <label className="mb-2 block text-sm font-medium">BrainF++ Code:</label>
            <Textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="min-h-[200px] border-muted bg-black/90 font-mono text-sm text-green-400"
              placeholder="Enter your BrainF++ code here..."
            />
          </div>

          {/* Input */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Input (for programs that use ,):
            </label>
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="h-20 bg-muted/50 font-mono text-sm"
              placeholder="Enter input characters here..."
            />
          </div>
          <Button
            onClick={runCode}
            disabled={isRunning}
            className="w-full bg-cyan-500 font-mono text-black hover:bg-cyan-600"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>

        {/* Right Column - Output */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Output:</label>
            <Card className="h-full">
              <CardContent className="h-full p-4">
                <pre className="min-h-[280px] rounded bg-black/90 p-4 font-mono text-sm whitespace-pre-wrap text-green-400">
                  {output || 'Run your code to see output here...'}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// BrainF++ interpreter matching Interpreter.java behavior
function interpretBrainF(code: string, input: string): string {
  const limit = 26; // total cells
  const global = 1; // global variables
  const memory = new Array(limit + global).fill(0);
  const funcMap = new Map<string, string>();
  let inputPointer = 0;
  let output = '';
  const maxSteps = 1000000;
  let totalSteps = 0;

  // Parse functions from code
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
      // Skip whitespace
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
      // Skip whitespace
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

    if (/[+\-\[\]<>.,;]/.test(char)) {
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

  // Run main function
  let steps = 0;
  const getInputChar = () => {
    if (inputPointer < input.length) {
      const char = input.charCodeAt(inputPointer);
      inputPointer++;
      return char;
    }
    return 0;
  };
  const hasInput = () => inputPointer < input.length;
  const outputChar = (char: string) => { output += char; };
  const incrementSteps = () => { steps++; return steps < maxSteps; };

  const result = runFunction('mn', global, memory, limit, global, funcMap, getInputChar, hasInput, outputChar, incrementSteps);
  
  if (result === -1) {
    return output || 'ERROR: execution failed';
  }

  if (steps >= maxSteps) {
    return output + '\nERROR: Program exceeded maximum execution steps';
  }

  return output;
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
  incrementSteps: () => boolean
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
        memory[cellPointer]++;
        break;

      case '-':
        memory[cellPointer]--;
        break;

      case '<':
        if (cellPointer === startIndex) {
          cellPointer = global;
        } else {
          cellPointer--;
        }
        break;

      case '>':
        if (cellPointer === global - 1) {
          cellPointer = startIndex - 1;
        }
        cellPointer++;
        maxPointer = Math.max(maxPointer, cellPointer);
        break;

      case '.':
        outputChar(String.fromCharCode(memory[cellPointer]));
        break;

      case ',':
        if (hasInput()) {
          memory[cellPointer] = getInputChar();
        } else {
          memory[cellPointer] = 0;
        }
        break;

      case '[':
        if (memory[cellPointer] === 0) {
          let runningTotal = 1;
          while (runningTotal > 0 && codePointer < operations.length - 1) {
            codePointer++;
            if (operations[codePointer] === ']') runningTotal--;
            else if (operations[codePointer] === '[') runningTotal++;
          }
          if (codePointer === operations.length - 1 && operations[codePointer] !== ']') {
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
        // Function call - two letters
        if (codePointer < operations.length - 1 && /[a-zA-Z]/.test(command) && /[a-zA-Z]/.test(operations[codePointer + 1])) {
          const funcName = command + operations[codePointer + 1];
          
          // Find maxPointer (last non-zero cell)
          while (maxPointer >= 0 && memory[maxPointer] === 0) maxPointer--;
          if (maxPointer < cellPointer) maxPointer = cellPointer;
          
          if (maxPointer === limit - 1) {
            return -1;
          }

          // Pass current cell value as input
          memory[maxPointer + 1] = memory[cellPointer];
          
          // Call function
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
            incrementSteps
          );
          
          if (returnValue === -1) return -1;
          
          // Replace current cell with return value
          memory[cellPointer] = returnValue;
          
          // Clear memory after function call
          for (let x = maxPointer + 1; x < limit; x++) {
            memory[x] = 0;
          }
          
          codePointer++; // Skip second letter
        }
        break;
    }

    codePointer++;

    // Check bounds
    if (cellPointer < 0 || cellPointer >= limit) {
      return -1;
    }

    // Wrap negative values (like Java short wrapping)
    // Java: memory[cellPointer] = (short) (Short.MAX_VALUE + memory[cellPointer] + 1);
    if (memory[cellPointer] < 0) {
      memory[cellPointer] = 32767 + memory[cellPointer] + 1;
    }
    // Wrap to 16-bit signed range
    while (memory[cellPointer] > 32767) {
      memory[cellPointer] -= 65536;
    }
    while (memory[cellPointer] < -32768) {
      memory[cellPointer] += 65536;
    }
  }

  return memory[cellPointer];
}
