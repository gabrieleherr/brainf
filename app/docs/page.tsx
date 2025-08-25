import { Navigation } from '@/components/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DocsPage() {
  return (
    <div>
      <Navigation />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Badge className="mb-4 font-mono" variant="secondary">
            Documentation
          </Badge>
          <h1 className="mb-4 text-4xl font-bold">BrainF++ Documentation</h1>
          <p className="text-muted-foreground text-xl">
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
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { cmd: '>', desc: 'Move pointer right', example: '>>' },
                    { cmd: '<', desc: 'Move pointer left', example: '<<' },
                    { cmd: '+', desc: 'Increment cell', example: '++++' },
                    { cmd: '-', desc: 'Decrement cell', example: '----' },
                    { cmd: '.', desc: 'Output character', example: '.' },
                    { cmd: ',', desc: 'Input character', example: ',' },
                    { cmd: '[', desc: 'Start loop', example: '[' },
                    { cmd: ']', desc: 'End loop', example: ']' },
                  ].map(({ cmd, desc, example }) => (
                    <div key={cmd} className="bg-muted flex gap-3 rounded-lg p-3">
                      <span className="text-primary w-6 font-mono text-lg font-bold">{cmd}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{desc}</div>
                        <div className="text-muted-foreground font-mono text-xs">{example}</div>
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
                  <h4 className="text-accent mb-2 font-mono">Set cell to value (e.g., 10)</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">++++++++++</span>
                    <span className="text-muted-foreground ml-4">// Adds 10 to current cell</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-accent mb-2 font-mono">Clear current cell</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">[-]</span>
                    <span className="text-muted-foreground ml-4">// Sets current cell to 0</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-accent mb-2 font-mono">Copy cell value</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">
                      [&gt;-&gt;+&gt;&gt;{'&lt;&lt;'}]&gt;&gt;[{'&lt;&lt;'}+&gt;&gt;&gt;-]
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
                  <h4 className="mb-2 font-semibold">Running Code</h4>
                  <p className="text-muted-foreground text-sm">
                    Click the "Run" button to execute your BrainF++ code. The output will appear in
                    the console panel.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Memory Visualization</h4>
                  <p className="text-muted-foreground text-sm">
                    The Memory tab shows the current state of the memory array, with the data
                    pointer highlighted.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Debug Information</h4>
                  <p className="text-muted-foreground text-sm">
                    View execution statistics including step count, output length, and error
                    messages in the Debug tab.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Example Programs</h4>
                  <p className="text-muted-foreground text-sm">
                    Use the dropdown menu to load pre-written example programs and learn from
                    working code.
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
                  <h4 className="mb-2 font-semibold">Registration</h4>
                  <p className="text-muted-foreground text-sm">
                    Register for contests individually or as a team. Team contests require all
                    members to be online during the event.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Scoring</h4>
                  <p className="text-muted-foreground text-sm">
                    Points are awarded based on correctness, code length (for golf contests), and
                    submission time.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Submissions</h4>
                  <p className="text-muted-foreground text-sm">
                    Submit your solutions through the contest interface. You can resubmit multiple
                    times with potential penalties.
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
                  API documentation coming soon. Contact support for early access to the developer
                  API.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
