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
          <h1 className="mb-4 text-4xl font-bold">BrainF++ documentation</h1>
          <p className="text-xl text-muted-foreground">
            Complete guide to programming in BrainF++ and using the contest platform.
          </p>
        </div>

        <Tabs defaultValue="language" className="w-full">
          <TabsList className="grid w-full grid-cols-4 font-mono">
            <TabsTrigger className="cursor-pointer" value="language">
              Language
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="editor">
              Editor
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="contests">
              Contests
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="api">
              API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="language" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick reference</CardTitle>
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
                    { cmd: ';', desc: 'Return value from function', example: ';' },
                    { cmd: '{', desc: 'Start function declaration', example: '{mn' },
                    { cmd: '}', desc: 'End function declaration', example: '}' },
                    { cmd: '(', desc: 'Start function call', example: '(ab' },
                    { cmd: ')', desc: 'End function call', example: ')' },
                  ].map(({ cmd, desc, example }) => (
                    <div key={cmd} className="flex gap-3 rounded-lg bg-muted p-3">
                      <span className="w-6 font-mono text-lg font-bold text-primary">{cmd}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{desc}</div>
                        <div className="font-mono text-xs text-muted-foreground">{example}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Functions</CardTitle>
                <CardDescription>BrainF++ function system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Function declaration</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Functions are declared with curly braces. The syntax is <code className="font-mono text-cyan-400">{'{ab code here}'}</code> where the two-letter function name immediately follows the opening brace, followed by the function code, then the closing brace.
                  </p>
                  <div className="code-block rounded-lg p-3 font-mono text-sm bg-black/90">
                    <span className="text-cyan-400">{'{ab'}</span>
                    <span className="text-green-400">+++.</span>
                    <span className="text-cyan-400">{'}'}</span>
                    <span className="ml-4 text-muted-foreground">// Function named "ab"</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Main function</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Execution always begins in the main function <code className="font-mono text-cyan-400">{'{mn code here}'}</code>. Code outside of any function is ignored and does not execute.
                  </p>
                  <div className="code-block rounded-lg p-3 font-mono text-sm bg-black/90">
                    <span className="text-cyan-400">{'{mn'}</span>
                    <span className="text-green-400">+++.</span>
                    <span className="text-cyan-400">{'}'}</span>
                    <span className="ml-4 text-muted-foreground">// Main function - this runs</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Return values</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Use the semicolon <code className="font-mono text-cyan-400">;</code> command to return a value from a function. The current cell value is returned and replaces the cell value at the call site.
                  </p>
                  <div className="code-block rounded-lg p-3 font-mono text-sm bg-black/90">
                    <span className="text-cyan-400">{'{ab'}</span>
                    <span className="text-green-400">++++++;</span>
                    <span className="text-cyan-400">{'}'}</span>
                    <span className="ml-4 text-muted-foreground">// Returns 6</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Function calls</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    To call a function, use parentheses with the two-letter function name: <code className="font-mono text-cyan-400">(ab)</code>. The current cell value is passed as input, and the return value replaces the current cell.
                  </p>
                  <div className="code-block rounded-lg p-3 font-mono text-sm bg-black/90">
                    <span className="text-cyan-400">{'{ab'}</span>
                    <span className="text-green-400">+++;</span>
                    <span className="text-cyan-400">{'}'}</span>
                    <br />
                    <span className="text-cyan-400">{'{mn'}</span>
                    <span className="text-green-400">++</span>
                    <span className="text-cyan-400">(ab)</span>
                    <span className="text-green-400">.</span>
                    <span className="text-cyan-400">{'}'}</span>
                    <span className="ml-4 text-muted-foreground">// Calls function "ab"</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Global cells</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Global cells are cells which are accessible to the left of the starting cell. They are static across all function calls.
                  </p>
                  <div className="code-block rounded-lg p-3 font-mono text-sm bg-black/90">
                    <span className="text-cyan-400">{'{ab'}</span>
                    <span className="text-green-400">&lt;-</span>
                    <span className="text-cyan-400">[</span>
                    <span className="text-green-400">&gt;+;</span>
                    <span className="text-cyan-400">]}</span>
                    <span className="ml-4 text-muted-foreground">// Returns 1 if the global cell is &gt;0, 0 otherwise</span>
                  </div>
                  <div className="code-block rounded-lg p-3 font-mono text-sm bg-black/90 mt-2">
                    <span className="text-cyan-400">{'{ab'}</span>
                    <span className="text-green-400">&lt;-</span>
                    <span className="text-cyan-400">[</span>
                    <span className="text-green-400">&gt;+;</span>
                    <span className="text-cyan-400">]}</span>
                    <span className="ml-4 text-muted-foreground">// Decrements global cell, returns 1 if it is positive</span>
                  </div>
                  <div className="code-block rounded-lg p-3 font-mono text-sm bg-black/90 mt-2">
                    <span className="text-cyan-400">{'{mn'}</span>
                    <span className="text-green-400">&lt;.&gt;+</span>
                    <span className="text-cyan-400">[</span>
                    <span className="text-green-400">&gt;</span>
                    <span className="text-cyan-400">(ab)</span>
                    <span className="text-cyan-400">]}</span>
                    <span className="ml-4 text-muted-foreground">// Moves right the inputted number of times</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common patterns</CardTitle>
                <CardDescription>Useful code snippets and techniques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Go to next empty cell</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">[&gt;]</span>
                    <span className="ml-4 text-muted-foreground">// Goes to the next empty cell</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Clear current cell</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">[-]</span>
                    <span className="ml-4 text-muted-foreground">// Sets current cell to 0</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Transfer cell to next cell</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">[-&gt;+&lt;]</span>
                    <span className="ml-4 text-muted-foreground">// Transfers a cell to the next cell (or adds it to the next cell)</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Duplicate cell to next cell</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">[-&gt;+&gt;+&lt;&lt;] &gt;&gt;[&lt;&lt;+&gt;&gt;-]</span>
                    <span className="ml-4 text-muted-foreground">// Duplicates a cell to the next cell</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Conditional function call</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">[(AB);](ab)</span>
                    <span className="ml-4 text-muted-foreground">// Does function AB if the current cell is nonzero but function ab if current cell is zero</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-cyan-400">Conditional return</h4>
                  <div className="code-block rounded-lg p-3 font-mono text-sm">
                    <span className="text-primary">[;]</span>
                    <span className="ml-4 text-muted-foreground">// Returns the value of a function if it is not 0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Editor features</CardTitle>
                <CardDescription>How to use the online BrainF++ editor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Running code</h4>
                  <p className="text-sm text-muted-foreground">
                    Click the "Run" button to execute your BrainF++ code. The output will appear in
                    the console panel.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Memory visualization</h4>
                  <p className="text-sm text-muted-foreground">
                    The Memory tab shows the current state of the memory array, with the data
                    pointer highlighted.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Debug information</h4>
                  <p className="text-sm text-muted-foreground">
                    View execution statistics including step count, output length, and error
                    messages in the Debug tab.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Example programs</h4>
                  <p className="text-sm text-muted-foreground">
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
                <CardTitle>Contest rules</CardTitle>
                <CardDescription>How contests work on the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Registration</h4>
                  <p className="text-sm text-muted-foreground">
                    Register for contests individually or as a team. Team contests require all
                    members to be online during the event.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Scoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Points are awarded based on correctness, code length (for golf contests), and
                    submission time.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Submissions</h4>
                  <p className="text-sm text-muted-foreground">
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
                <div className="text-sm text-muted-foreground">
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
