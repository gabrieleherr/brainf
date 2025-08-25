import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-3xl font-bold font-mono text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text"
            >
              BrainF++
            </a>
            <nav className="flex gap-6">
              <a href="/" className="text-muted-foreground hover:text-cyan-400 font-mono">
                Home
              </a>
              <a href="/contest" className="text-muted-foreground hover:text-cyan-400 font-mono">
                Contest
              </a>
              <a href="/docs" className="text-cyan-400 hover:text-cyan-300 font-mono">
                Docs
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge className="mb-4 font-mono" variant="secondary">
              Documentation
            </Badge>
            <h1 className="text-4xl font-bold mb-4">BrainF++ Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Complete guide to programming in BrainF++ and using the contest platform.
            </p>
          </div>

          <Tabs defaultValue="language" className="w-full">
            <TabsList className="grid w-full grid-cols-4 font-mono">
              <TabsTrigger value="language">Language</TabsTrigger>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="language" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Reference</CardTitle>
                  <CardDescription>Essential BrainF++ commands</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { cmd: ">", desc: "Move pointer right", example: ">>" },
                      { cmd: "<", desc: "Move pointer left", example: "<<" },
                      { cmd: "+", desc: "Increment cell", example: "++++" },
                      { cmd: "-", desc: "Decrement cell", example: "----" },
                      { cmd: ".", desc: "Output character", example: "." },
                      { cmd: ",", desc: "Input character", example: "," },
                      { cmd: "[", desc: "Start loop", example: "[" },
                      { cmd: "]", desc: "End loop", example: "]" },
                    ].map(({ cmd, desc, example }) => (
                      <div key={cmd} className="flex gap-3 p-3 rounded-lg bg-muted">
                        <span className="font-mono text-lg text-primary font-bold w-6">{cmd}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{desc}</div>
                          <div className="text-xs text-muted-foreground font-mono">{example}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Patterns</CardTitle>
                  <CardDescription>Useful code snippets and techniques</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-mono text-accent mb-2">Set cell to value (e.g., 10)</h4>
                    <div className="code-block p-3 rounded-lg font-mono text-sm">
                      <span className="text-primary">++++++++++</span>
                      <span className="text-muted-foreground ml-4">// Adds 10 to current cell</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-accent mb-2">Clear current cell</h4>
                    <div className="code-block p-3 rounded-lg font-mono text-sm">
                      <span className="text-primary">[-]</span>
                      <span className="text-muted-foreground ml-4">// Sets current cell to 0</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-accent mb-2">Copy cell value</h4>
                    <div className="code-block p-3 rounded-lg font-mono text-sm">
                      <span className="text-primary">
                        [&gt;-&gt;+&gt;&gt;{"&lt;&lt;"}]&gt;&gt;[{"&lt;&lt;"}+&gt;&gt;&gt;-]
                      </span>
                      <span className="text-muted-foreground ml-4">// Copies cell 0 to cell 2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="editor" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Editor Features</CardTitle>
                  <CardDescription>How to use the online BrainF++ editor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Running Code</h4>
                    <p className="text-muted-foreground text-sm">
                      Click the "Run" button to execute your BrainF++ code. The output will appear in the console panel.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Memory Visualization</h4>
                    <p className="text-muted-foreground text-sm">
                      The Memory tab shows the current state of the memory array, with the data pointer highlighted.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Debug Information</h4>
                    <p className="text-muted-foreground text-sm">
                      View execution statistics including step count, output length, and error messages in the Debug
                      tab.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example Programs</h4>
                    <p className="text-muted-foreground text-sm">
                      Use the dropdown menu to load pre-written example programs and learn from working code.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contest Rules</CardTitle>
                  <CardDescription>How contests work on the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Registration</h4>
                    <p className="text-muted-foreground text-sm">
                      Register for contests individually or as a team. Team contests require all members to be online
                      during the event.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Scoring</h4>
                    <p className="text-muted-foreground text-sm">
                      Points are awarded based on correctness, code length (for golf contests), and submission time.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Submissions</h4>
                    <p className="text-muted-foreground text-sm">
                      Submit your solutions through the contest interface. You can resubmit multiple times with
                      potential penalties.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform API</CardTitle>
                  <CardDescription>Integration endpoints for external tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground text-sm">
                    API documentation coming soon. Contact support for early access to the developer API.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
