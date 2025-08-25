import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LiveCodeEditor from "@/components/live-code-editor"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-mono text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text">
              BrainF++
            </h1>
            <nav className="flex gap-6">
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-mono">
                Home
              </Link>
              <a href="/contest" className="text-muted-foreground hover:text-cyan-400 font-mono">
                Contest
              </a>
              <a href="/docs" className="text-muted-foreground hover:text-cyan-400 font-mono">
                Docs
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container py-16 space-y-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold font-mono text-transparent bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 bg-clip-text mb-4 tracking-tight">
              BrainF++
            </h1>
            <div className="flex justify-center items-center gap-2 mb-6">
              <div className="w-12 h-1 bg-muted rounded"></div>
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <div className="w-12 h-1 bg-muted rounded"></div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The <span className="font-mono">Ridiculously</span> Minimalist Programming Language
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            BrainF++ is like programming with your hands tied behind your back... and blindfolded... while riding a
            unicycle. With only 8 commands, it's somehow Turing complete and can theoretically run anything your fancy
            modern languages can. It's the programming equivalent of making a gourmet meal with just a spoon.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Button size="lg" className="font-mono bg-cyan-500 hover:bg-cyan-600 text-black border-0 shadow-lg">
              Try Online Editor
            </Button>
            <Button size="lg" variant="outline" className="font-mono bg-transparent">
              Learn the Commands
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-8">The Magnificent Eight</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { cmd: ">", desc: "Move pointer right (baby steps)" },
              { cmd: "<", desc: "Move pointer left (oops, went too far)" },
              { cmd: "+", desc: "Increment cell value (counting up!)" },
              { cmd: "-", desc: "Decrement cell value (counting down!)" },
              { cmd: ".", desc: "Output cell value as ASCII (ta-da!)" },
              { cmd: ",", desc: "Input ASCII to cell (feed me!)" },
              { cmd: "[", desc: "Jump forward if cell is zero (maybe skip?)" },
              { cmd: "]", desc: "Jump back if cell is non-zero (let's loop!)" },
            ].map(({ cmd, desc }) => (
              <Card key={cmd} className="bg-muted/50 hover:bg-muted/70 transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="text-2xl font-mono font-bold bg-muted px-4 py-3 rounded-lg">{cmd}</div>
                  <div className="text-sm font-medium">{desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-8">The Legendary "Hello World!"</h3>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-lg">Your First Masterpiece</CardTitle>
              <CardDescription>
                This program outputs "Hello World!" and will make you question your life choices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/90 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-green-400 whitespace-nowrap leading-relaxed">
                  ++++++++++[&gt;+++++++&gt;++++++++++&gt;+++&gt;+&lt;&lt;&lt;&lt;-]
                  <br />
                  &gt;++.&gt;+.+++++++..+++.&gt;++.
                  <br />
                  &lt;&lt;+++++++++++++++.&gt;.&gt;+.+++.------.--------.&gt;+.&gt;+.
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  <strong className="text-cyan-400">What's happening here? (Spoiler: it's complicated)</strong>
                </p>
                <div className="pl-4 space-y-2">
                  <p>
                    <span className="font-mono text-green-400">++++++++++</span> - Count to 10 (we're off to a great
                    start!)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">
                      [&gt;+++++++&gt;++++++++++&gt;+++&gt;+&lt;&lt;&lt;&lt;-]
                    </span>{" "}
                    - The magic loop that sets up our ASCII values (don't ask how long this took to figure out)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">&gt;++.</span> - Move right, add 2, output 'H' (we did
                    it!)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">&gt;+.</span> - Move right, add 1, output 'e' (getting
                    the hang of this)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">+++++++.</span> - Add 7, output 'l' (math is hard)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">.</span> - Output another 'l' (copy-paste doesn't exist
                    here)
                  </p>
                  <p>
                    <span className="font-mono text-green-400">+++.</span> - Add 3, output 'o' (almost there!)
                  </p>
                  <p>...and the rest is just more ASCII arithmetic wizardry ✨</p>
                </div>
                <p>
                  <strong className="text-cyan-400">The secret sauce:</strong> We're basically doing manual ASCII math
                  because apparently using a string literal is for weaklings. Each character requires calculating its
                  exact ASCII value through addition and subtraction. It's like solving a puzzle where the reward is...
                  well, "Hello World!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-8">Your Turn to Suffer... I Mean, Code!</h3>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-lg">Live BrainF++ Playground</CardTitle>
              <CardDescription>Write and run BrainF++ code. Warning: may cause existential crisis</CardDescription>
            </CardHeader>
            <CardContent>
              <LiveCodeEditor />
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Join the Madness: BrainF++ Contest</h3>
          <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 rounded-xl border border-cyan-500/20">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Think you've mastered the art of programming with 8 commands? Put your skills to the test in our monthly
              BrainF++ coding contests! Compete against fellow masochists... err, enthusiasts... to solve algorithmic
              challenges using nothing but the magnificent eight. Warning: side effects may include questioning your
              career choices and an inexplicable urge to write everything in BrainF++.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="font-mono bg-cyan-500 hover:bg-cyan-600 text-black border-0 shadow-lg">
                <a href="/contest">Join Next Contest</a>
              </Button>
              <Button size="lg" variant="outline" className="font-mono bg-transparent">
                <a href="/docs">Read the Rules</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">The Origin Story</h3>
          <div className="bg-muted/20 p-8 rounded-xl border">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Back in <span className="text-cyan-400 font-semibold">1993</span>,{" "}
              <span className="text-cyan-400 font-semibold">Urban Müller</span> looked at programming languages and
              thought "You know what? These have way too many features." So he created BrainF++, a language so minimal
              it makes assembly look verbose. It's proof that you can make programmers cry with just 8 characters.
              Despite being designed as a challenge to create the smallest possible compiler, it accidentally became a
              rite of passage for masochistic programmers everywhere. 🧠💀
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
