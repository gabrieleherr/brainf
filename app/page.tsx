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
            The <span className="font-mono">Ridiculously</span> Minimalist Programming Language
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
            BrainF++ is like programming with your hands tied behind your back... and blindfolded...
            while riding a unicycle. With only 8 commands, it's somehow Turing complete and can
            theoretically run anything your fancy modern languages can. It's the programming
            equivalent of making a gourmet meal with just a spoon.
          </p>

          <div className="mb-12 flex justify-center gap-4">
            <Button
              size="lg"
              className="border-0 bg-cyan-500 font-mono text-black shadow-lg hover:bg-cyan-600"
            >
              Try Online Editor
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent font-mono">
              Learn the Commands
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-4xl font-bold">The Magnificent Eight</h3>
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

        <div className="mx-auto max-w-2xl">
          <h3 className="mb-8 text-center text-4xl font-bold">The Legendary "Hello World!"</h3>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-lg">Your First Masterpiece</CardTitle>
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

        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-4xl font-bold">
            Your Turn to Suffer... I Mean, Code!
          </h3>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-lg">Live BrainF++ Playground</CardTitle>
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
          <h3 className="mb-6 text-4xl font-bold">Join the Madness: BrainF++ Contest</h3>
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
                <a href="/contest">Join Next Contest</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent font-mono">
                <a href="/docs">Read the Rules</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-6 text-4xl font-bold">The Origin Story</h3>
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
