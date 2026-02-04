'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Play, RotateCcw, Save, Square, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ExecutionResult {
  output: string;
  error?: string;
  steps: number;
  memory: number[];
  pointer: number;
}

export function CodeEditor() {
  const [code, setCode] = useState(
    `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`,
  );
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [selectedExample, setSelectedExample] = useState('');

  const examples = {
    'Hello World': `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`,
    'Simple Counter': `++++++++++[>+>+<<-]>>++++++++++<<[>>+<<-]>>.`,
    'Cat Program': `,+[-.,+]`,
    'Add Two Numbers': `,>++++++[<-------->-],[<+>-]<.`,
  };

  const interpretBrainF = useCallback((code: string, input: string): ExecutionResult => {
    const memory = new Array(30000).fill(0);
    let pointer = 0;
    let codePointer = 0;
    let inputPointer = 0;
    let output = '';
    let steps = 0;
    const maxSteps = 100000;

    const loopStack: number[] = [];

    try {
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
            } else {
              loopStack.push(codePointer);
            }
            break;
          case ']':
            if (memory[pointer] !== 0) {
              codePointer = loopStack[loopStack.length - 1];
            } else {
              loopStack.pop();
            }
            break;
        }
        codePointer++;
      }

      return {
        output,
        steps,
        memory: memory.slice(0, 20), // Show first 20 memory cells
        pointer,
        error: steps >= maxSteps ? 'Execution stopped: Maximum steps exceeded' : undefined,
      };
    } catch (error) {
      return {
        output,
        steps,
        memory: memory.slice(0, 20),
        pointer,
        error: `Runtime error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }, []);

  const runCode = useCallback(() => {
    if (isRunning) return;

    setIsRunning(true);
    setOutput('');
    setExecutionResult(null);

    // Simulate async execution
    setTimeout(() => {
      const result = interpretBrainF(code, input);
      setOutput(result.output);
      setExecutionResult(result);
      setIsRunning(false);
    }, 100);
  }, [code, input, interpretBrainF, isRunning]);

  const stopExecution = useCallback(() => {
    setIsRunning(false);
  }, []);

  const clearOutput = useCallback(() => {
    setOutput('');
    setExecutionResult(null);
  }, []);

  const loadExample = useCallback(
    (exampleName: string) => {
      if (examples[exampleName as keyof typeof examples]) {
        setCode(examples[exampleName as keyof typeof examples]);
        setSelectedExample(exampleName);
        clearOutput();
      }
    },
    [clearOutput],
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Toolbar */}
      <div className="border-border border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-mono text-xl font-bold">BrainF++ editor</h1>
            <Badge variant="secondary" className="font-mono">
              Live interpreter
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedExample}
              onChange={e => loadExample(e.target.value)}
              className="border-border bg-background rounded-md border px-3 py-1 font-mono text-sm"
            >
              <option value="">Load example...</option>
              {Object.keys(examples).map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <Button variant="outline" size="sm" className="bg-transparent font-mono">
              <Upload className="mr-2 h-4 w-4" />
              Load
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent font-mono">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-1">
        {/* Code Editor Panel */}
        <div className="border-border flex flex-1 flex-col border-r">
          <div className="border-border border-b p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono font-semibold">Code editor</h2>
              <div className="flex items-center gap-2">
                <Button onClick={runCode} disabled={isRunning} size="sm" className="font-mono">
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
                <Button
                  onClick={stopExecution}
                  disabled={!isRunning}
                  variant="outline"
                  size="sm"
                  className="bg-transparent font-mono"
                >
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
                <Button
                  onClick={clearOutput}
                  variant="outline"
                  size="sm"
                  className="bg-transparent font-mono"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>

            <Textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter your BrainF++ code here..."
              className="code-block min-h-[300px] resize-none font-mono text-sm"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            />
          </div>

          {/* Input Section */}
          <div className="p-4">
            <h3 className="mb-2 font-mono font-semibold">Input</h3>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Program input (optional)"
              className="font-mono"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex w-1/2 flex-col">
          <Tabs defaultValue="output" className="flex flex-1 flex-col">
            <TabsList className="grid w-full grid-cols-3 font-mono">
              <TabsTrigger value="output">Output</TabsTrigger>
              <TabsTrigger value="memory">Memory</TabsTrigger>
              <TabsTrigger value="debug">Debug</TabsTrigger>
            </TabsList>

            <TabsContent value="output" className="flex-1 p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-mono text-sm">Console output</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="code-block min-h-[200px] whitespace-pre-wrap rounded-lg p-4 font-mono text-sm">
                      {output ||
                        (isRunning
                          ? 'Running...'
                          : "No output yet. Click 'Run' to execute your code.")}
                      {executionResult?.error && (
                        <div className="text-destructive mt-2">Error: {executionResult.error}</div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="memory" className="flex-1 p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-mono text-sm">Memory visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  {executionResult ? (
                    <div className="space-y-4">
                      <div className="text-muted-foreground font-mono text-sm">
                        Data pointer: {executionResult.pointer}
                      </div>
                      <div className="grid grid-cols-10 gap-1">
                        {executionResult.memory.map((value, index) => (
                          <div
                            key={index}
                            className={`border-border flex h-12 w-12 items-center justify-center border font-mono text-xs ${
                              index === executionResult.pointer
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Highlighted cell shows current data pointer position
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground font-mono text-sm">
                      Run your code to see memory state
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="debug" className="flex-1 p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-mono text-sm">Debug information</CardTitle>
                </CardHeader>
                <CardContent>
                  {executionResult ? (
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Execution steps:</span>
                        <span>{executionResult.steps.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Output length:</span>
                        <span>{executionResult.output.length} characters</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory pointer:</span>
                        <span>{executionResult.pointer}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span
                          className={executionResult.error ? 'text-destructive' : 'text-primary'}
                        >
                          {executionResult.error ? 'Error' : 'Success'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground font-mono text-sm">
                      Run your code to see debug information
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
