"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function LiveCodeEditor() {
  const [code, setCode] = useState(
    "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.>+.+++.------.--------.>+.>+.",
  )
  const [output, setOutput] = useState("")
  const [input, setInput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    try {
      const result = interpretBrainF(code, input)
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }

    setIsRunning(false)
  }

  const loadExample = (exampleCode: string, description: string) => {
    setCode(exampleCode)
    setOutput("")
    setInput("")
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left Column - Editor and Input */}
      <div className="space-y-4">
        {/* Code Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">BrainF++ Code:</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm min-h-[200px] bg-black/90 text-green-400 border-muted"
            placeholder="Enter your BrainF++ code here..."
          />
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Input (for programs that use ,):</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm h-20 bg-muted/50"
            placeholder="Enter input characters here..."
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button onClick={runCode} disabled={isRunning} className="bg-cyan-500 hover:bg-cyan-600 text-black font-mono">
            {isRunning ? "Running..." : "Run Code"}
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              loadExample(
                "+++++++++[>++++++++<-]>+.>++++++++++[>++++++++++<-]>+.+++++++..+++.>++++[>+++++++++++<-]>+.<<+++++++++++++++.>.+++.------.--------.>+.",
                "Hello World",
              )
            }
            className="font-mono"
          >
            Load Hello World
          </Button>
          <Button
            variant="outline"
            onClick={() => loadExample("++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.", "Hi!")}
            className="font-mono"
          >
            Load Simple Hi
          </Button>
          <Button variant="outline" onClick={() => setCode("")} className="font-mono">
            Clear
          </Button>
        </div>
      </div>

      {/* Right Column - Output */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Output:</label>
          <Card className="h-full">
            <CardContent className="p-4 h-full">
              <pre className="font-mono text-sm bg-black/90 text-green-400 p-4 rounded min-h-[280px] whitespace-pre-wrap">
                {output || "Run your code to see output here..."}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Simple BrainF++ interpreter
function interpretBrainF(code: string, input: string): string {
  const memory = new Array(30000).fill(0)
  let pointer = 0
  let codePointer = 0
  let inputPointer = 0
  let output = ""
  let steps = 0
  const maxSteps = 100000

  while (codePointer < code.length && steps < maxSteps) {
    const command = code[codePointer]
    steps++

    switch (command) {
      case ">":
        pointer = (pointer + 1) % memory.length
        break
      case "<":
        pointer = (pointer - 1 + memory.length) % memory.length
        break
      case "+":
        memory[pointer] = (memory[pointer] + 1) % 256
        break
      case "-":
        memory[pointer] = (memory[pointer] - 1 + 256) % 256
        break
      case ".":
        output += String.fromCharCode(memory[pointer])
        break
      case ",":
        if (inputPointer < input.length) {
          memory[pointer] = input.charCodeAt(inputPointer)
          inputPointer++
        } else {
          memory[pointer] = 0
        }
        break
      case "[":
        if (memory[pointer] === 0) {
          let bracketCount = 1
          while (bracketCount > 0 && codePointer < code.length - 1) {
            codePointer++
            if (code[codePointer] === "[") bracketCount++
            if (code[codePointer] === "]") bracketCount--
          }
        }
        break
      case "]":
        if (memory[pointer] !== 0) {
          let bracketCount = 1
          while (bracketCount > 0 && codePointer > 0) {
            codePointer--
            if (code[codePointer] === "]") bracketCount++
            if (code[codePointer] === "[") bracketCount--
          }
        }
        break
    }
    codePointer++
  }

  if (steps >= maxSteps) {
    throw new Error("Program exceeded maximum execution steps (possible infinite loop)")
  }

  return output
}
