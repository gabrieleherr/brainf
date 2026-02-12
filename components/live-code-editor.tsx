'use client';

import { interpretBrainF } from '@/lib/brainf-interpreter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

function helloWorldExample(): string {
  return (
    '{mn' +
    '+'.repeat(10) + '[>+++++++>++++++++++>+++<<<-]' +
    '>++.>+.+++++++..+++.>++.' +
    '<<+++++++++++++++.>.+++.------.--------.>+.>+.' +
    '}'
  );
}

export default function LiveCodeEditor() {
  const [code, setCode] = useState(
    helloWorldExample(),
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
          onClick={() => loadExample(helloWorldExample(), 'Hello World')}
          className="font-mono"
        >
          Hello World
        </Button>
        <Button
          variant={selectedExample === 'Input' ? 'default' : 'outline'}
          onClick={() => loadExample('// prints 5 more than the ascii value of the input\n{mn ,+++++.}', 'Input')}
          className="font-mono"
        >
          Input
        </Button>
        <Button
          variant={selectedExample === 'If Statement' ? 'default' : 'outline'}
          onClick={() =>
            loadExample(
              '// if the input is \'6\' print \'7\'\n// otherwise print the input\n{mn +++++++++[->++++++>++++++<<] ,>[-<->]< (fn) >>[-<<+>>]<< .}\n// if cell is nonzero return cell, else return cell+1\n{fn [;] +}',
              'If Statement',
            )
          }
          className="font-mono"
        >
          If Statement
        </Button>
        <Button
          variant={selectedExample === 'Recursion' ? 'default' : 'outline'}
          onClick={() =>
            loadExample(
              '// calculates 2^i for some input i\n{mn <++++++++[->++++++<] ,>[-<->]< (fn)"}\n// if global cell is nonzero return 2^(i-1) * 2, else return 1\n{fn [-]< [->(fn)[->++<]>;] >+}',
              'Recursion',
            )
          }
          className="font-mono"
        >
          Recursion
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
            <label className="mb-2 block text-sm font-medium">BrainF++ code:</label>
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
              Input (for ,: next unicode char; no more input → 0):
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
            {isRunning ? 'Running...' : 'Run code'}
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
