'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function LiveCodeEditor() {
  const [code, setCode] = useState(
    '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.>+.+++.------.--------.>+.>+.',
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
              '+++++++++[>++++++++<-]>+.>++++++++++[>++++++++++<-]>+.+++++++..+++.>++++[>+++++++++++<-]>+.<<+++++++++++++++.>.+++.------.--------.>+.',
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
            loadExample('++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.', 'Simple Hi')
          }
          className="font-mono"
        >
          Simple Hi
        </Button>
        <Button
          variant={selectedExample === 'ABC' ? 'default' : 'outline'}
          onClick={() => loadExample('++++++++[>++++++++<-]>+.+.+.', 'ABC')}
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

// Simple BrainF++ interpreter
function interpretBrainF(code: string, input: string): string {
  const memory = new Array(30000).fill(0);
  let pointer = 0;
  let codePointer = 0;
  let inputPointer = 0;
  let output = '';
  let steps = 0;
  const maxSteps = 100000;

  while (codePointer < code.length && steps < maxSteps) {
    const command = code[codePointer];
    steps++;

    switch (command) {
      case '>':
        pointer = (pointer + 1) % memory.length;
        break;
      case '<':
        pointer = (pointer - 1 + memory.length) % memory.length;
        break;
      case '+':
        memory[pointer] = (memory[pointer] + 1) % 256;
        break;
      case '-':
        memory[pointer] = (memory[pointer] - 1 + 256) % 256;
        break;
      case '.':
        output += String.fromCharCode(memory[pointer]);
        break;
      case ',':
        if (inputPointer < input.length) {
          memory[pointer] = input.charCodeAt(inputPointer);
          inputPointer++;
        } else {
          memory[pointer] = 0;
        }
        break;
      case '[':
        if (memory[pointer] === 0) {
          let bracketCount = 1;
          while (bracketCount > 0 && codePointer < code.length - 1) {
            codePointer++;
            if (code[codePointer] === '[') bracketCount++;
            if (code[codePointer] === ']') bracketCount--;
          }
        }
        break;
      case ']':
        if (memory[pointer] !== 0) {
          let bracketCount = 1;
          while (bracketCount > 0 && codePointer > 0) {
            codePointer--;
            if (code[codePointer] === ']') bracketCount++;
            if (code[codePointer] === '[') bracketCount--;
          }
        }
        break;
    }
    codePointer++;
  }

  if (steps >= maxSteps) {
    throw new Error('Program exceeded maximum execution steps (possible infinite loop)');
  }

  return output;
}
