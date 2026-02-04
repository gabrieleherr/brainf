import LiveCodeEditor from '@/components/live-code-editor';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div>
      <Navigation />

      <main className="container mx-auto max-w-5xl space-y-16 px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="mb-4 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 bg-clip-text font-mono text-8xl font-bold tracking-tight text-transparent md:text-9xl">
              BrainF++
            </h1>
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="h-1 w-12 rounded bg-muted"></div>
              <div className="h-3 w-3 rounded-full bg-muted"></div>
              <div className="h-1 w-12 rounded bg-muted"></div>
            </div>
          </div>

          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            The <span className="font-mono">ridiculously</span> minimalist programming language
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
            BrainF++ is like programming with your hands tied behind your back... and blindfolded...
            while riding a unicycle. With only 8 commands, it's somehow Turing complete and can
            theoretically run anything your fancy modern languages can. It's the programming
            equivalent of making a gourmet meal with just a spoon.
          </p>

          <div className="mb-12 flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="border-0 bg-cyan-500 font-mono text-black shadow-lg hover:bg-cyan-600"
            >
              <a href="#editor">Try online editor</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent font-mono">
              <a href="#commands">Learn the commands</a>
            </Button>
          </div>
        </div>

        <div id="commands" className="mx-auto max-w-4xl scroll-mt-8">
          <h3 className="mb-8 text-center text-4xl font-bold">
            Original BrainF: only eight commands
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { cmd: '>', desc: 'Move pointer right (baby steps)' },
              { cmd: '<', desc: 'Move pointer left (oops, went too far)' },
              { cmd: '+', desc: 'Increment cell value (counting up!)' },
              { cmd: '-', desc: 'Decrement cell value (counting down!)' },
              { cmd: '.', desc: 'Output cell value as ASCII (ta-da!)' },
              { cmd: ',', desc: 'Input ASCII to cell (feed me!)' },
              { cmd: '[', desc: 'Jump forward if cell is zero (maybe skip?)' },
              { cmd: ']', desc: "Jump back if cell is non-zero (let's loop!)" },
            ].map(({ cmd, desc }) => (
              <Card key={cmd} className="bg-muted/50 transition-colors hover:bg-muted/70">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-muted px-4 py-3 font-mono text-2xl font-bold">
                    {cmd}
                  </div>
                  <div className="text-sm font-medium">{desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl scroll-mt-8">
          <h3 className="mb-8 text-center text-4xl font-bold">The ++ part: functions!</h3>
          <Card>
            <CardHeader>
              <CardTitle>Function system</CardTitle>
              <CardDescription>
                BrainF++ supports the advanced, modern and forward-looking concept of functions for
                code organization and reuse.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-mono text-accent">Function declaration</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  Functions are declared with curly braces. The syntax is{' '}
                  <code className="font-mono text-primary">{'{mn code here}'}</code> where the
                  two-letter function name immediately follows the opening brace.
                </p>
                <div className="code-block rounded-lg bg-black/90 p-3 font-mono text-sm text-green-400">
                  <span className="text-primary">{'{ab}'}</span>
                  <span className="text-green-400">+++.</span>
                  <span className="text-primary">{'}'}</span>
                  <span className="ml-4 text-muted-foreground">// Function named "ab"</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-mono text-accent">Main function</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  Execution always begins in the main function{' '}
                  <code className="font-mono text-primary">{'{mn}'}</code>. Code outside of any
                  function is ignored and does not execute.
                </p>
                <div className="code-block rounded-lg bg-black/90 p-3 font-mono text-sm text-green-400">
                  <span className="text-primary">{'{mn}'}</span>
                  <span className="text-green-400">+++.</span>
                  <span className="text-primary">{'}'}</span>
                  <span className="ml-4 text-muted-foreground">// Main function - this runs</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-mono text-accent">Function calls</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  To call a function, use parentheses with the two-letter function name:{' '}
                  <code className="font-mono text-primary">(ab)</code>. The current cell value is
                  passed as input, and the return value replaces the current cell.
                </p>
                <div className="code-block rounded-lg bg-black/90 p-3 font-mono text-sm text-green-400">
                  <span className="text-primary">{'{ab}'}</span>
                  <span className="text-green-400">+++;</span>
                  <span className="text-primary">{'}'}</span>
                  <br />
                  <span className="text-primary">{'{mn}'}</span>
                  <span className="text-green-400">++</span>
                  <span className="text-primary">(ab)</span>
                  <span className="text-green-400">.</span>
                  <span className="text-primary">{'}'}</span>
                  <span className="ml-4 text-muted-foreground">// Calls function "ab"</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-mono text-accent">Return values</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  Use the semicolon <code className="font-mono text-primary">;</code> command to
                  return a value from a function. The current cell value is returned and replaces
                  the cell value at the call site.
                </p>
                <div className="code-block rounded-lg bg-black/90 p-3 font-mono text-sm text-green-400">
                  <span className="text-primary">{'{ab}'}</span>
                  <span className="text-green-400">++++++;</span>
                  <span className="text-primary">{'}'}</span>
                  <span className="ml-4 text-muted-foreground">// Returns 6</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto max-w-2xl">
          <h3 className="mb-8 text-center text-4xl font-bold">How to write "Hello World!"</h3>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-lg">Your first masterpiece</CardTitle>
              <CardDescription>
                This program outputs "Hello World!" and will make you question your life choices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto rounded-lg bg-black/90 p-6 font-mono text-sm">
                <div className="leading-relaxed whitespace-nowrap text-green-400">
                  ++++++++++[&gt;+++++++&gt;++++++++++&gt;+++&gt;+&lt;&lt;&lt;&lt;-]
                  <br />
                  &gt;++.&gt;+.+++++++..+++.&gt;++.
                  <br />
                  &lt;&lt;+++++++++++++++.&gt;.&gt;+.+++.------.--------.&gt;+.&gt;+.
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-cyan-400">
                    What's happening here? (Spoiler: it's complicated)
                  </strong>
                </p>
                <div className="space-y-2 pl-4">
                  <p>
                    <span className="font-mono text-green-400">++++++++++</span> - Count to 10
                    (we're off to a great start!)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">
                      [&gt;+++++++&gt;++++++++++&gt;+++&gt;+&lt;&lt;&lt;&lt;-]
                    </span>{' '}
                    - The magic loop that sets up our ASCII values (don't ask how long this took to
                    figure out)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">&gt;++.</span> - Move right, add 2,
                    output 'H' (we did it!)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">&gt;+.</span> - Move right, add 1,
                    output 'e' (getting the hang of this)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">+++++++.</span> - Add 7, output 'l'
                    (math is hard)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">.</span> - Output another 'l'
                    (copy-paste doesn't exist here)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">+++.</span> - Add 3, output 'o'
                    (almost there!)
                  </p>
                  <p>...and the rest is just more ASCII arithmetic wizardry ✨</p>
                </div>
                <p>
                  <strong className="text-cyan-400">The secret sauce:</strong> We're basically doing
                  manual ASCII math because apparently using a string literal is for weaklings. Each
                  character requires calculating its exact ASCII value through addition and
                  subtraction. It's like solving a puzzle where the reward is... well, "Hello
                  World!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="editor" className="mx-auto max-w-4xl scroll-mt-8">
          <h3 className="mb-8 text-center text-4xl font-bold">Live BrainF++ playground</h3>
          <Card>
            <CardHeader className="sr-only">
              <CardTitle>Playground</CardTitle>
              <CardDescription>
                Write and run BrainF++ code. Warning: may cause existential crisis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LiveCodeEditor />
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-6 text-4xl font-bold">Join the madness: BrainF++ contest</h3>
          <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8">
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Think you've mastered the art of programming with 8 commands? Put your skills to the
              test in our monthly BrainF++ coding contests! Compete against fellow masochists...
              err, enthusiasts... to solve algorithmic challenges using nothing but the magnificent
              eight. Warning: side effects may include questioning your career choices and an
              inexplicable urge to write everything in BrainF++.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="border-0 bg-cyan-500 font-mono text-black shadow-lg hover:bg-cyan-600"
              >
                <a href="/contest">Join next contest</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent font-mono">
                <a href="/docs">Read the rules</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-6 text-4xl font-bold">The origin story</h3>
          <div className="rounded-xl border bg-muted/20 p-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Back in <span className="font-semibold text-cyan-400">1993</span>,{' '}
              <span className="font-semibold text-cyan-400">Urban Müller</span> looked at
              programming languages and thought "You know what? These have way too many features."
              So he created BrainF++, a language so minimal it makes assembly look verbose. It's
              proof that you can make programmers cry with just 8 characters. Despite being designed
              as a challenge to create the smallest possible compiler, it accidentally became a rite
              of passage for masochistic programmers everywhere. 🧠💀
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
