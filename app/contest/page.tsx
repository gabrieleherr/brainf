import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ContestPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              <a href="/" className="text-cyan-400 hover:text-cyan-300 font-mono">
                Home
              </a>
              <a href="/contest" className="text-foreground hover:text-cyan-400 font-mono">
                Contest
              </a>
              <a href="/docs" className="text-muted-foreground hover:text-cyan-400 font-mono">
                Docs
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-16 space-y-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold font-mono text-transparent bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 bg-clip-text mb-6">
            BrainF++ Contest
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Welcome to the ultimate test of minimalist programming prowess! Can you solve complex problems with just 8
            commands?
          </p>
        </div>

        {/* Current Contest */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Current Contest</h2>
          <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-mono">December 2024 Challenge</CardTitle>
                <Badge className="bg-green-500 text-black font-mono">LIVE</Badge>
              </div>
              <CardDescription className="text-lg">
                "The Fibonacci Fiasco" - Generate the first 10 Fibonacci numbers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">47</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">3d 14h</div>
                  <div className="text-sm text-muted-foreground">Time Left</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">$500</div>
                  <div className="text-sm text-muted-foreground">Prize Pool</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" className="font-mono bg-cyan-500 hover:bg-cyan-600 text-black">
                  Join Contest
                </Button>
                <Button size="lg" variant="outline" className="font-mono bg-transparent">
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Contests */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Upcoming Contests</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono">January 2025</CardTitle>
                  <Badge variant="outline" className="font-mono">
                    UPCOMING
                  </Badge>
                </div>
                <CardDescription>"The Sorting Nightmare" - Implement bubble sort</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Think sorting is hard in normal languages? Try it with just 8 commands!
                </p>
                <Button variant="outline" className="font-mono w-full bg-transparent">
                  Set Reminder
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono">February 2025</CardTitle>
                  <Badge variant="outline" className="font-mono">
                    UPCOMING
                  </Badge>
                </div>
                <CardDescription>"Prime Time Panic" - Find all primes under 100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mathematical algorithms meet minimalist programming. What could go wrong?
                </p>
                <Button variant="outline" className="font-mono w-full bg-transparent">
                  Set Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Past Winners */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Hall of Fame</h2>
          <div className="space-y-4">
            {[
              {
                month: "November 2024",
                challenge: "Hello World Variations",
                winner: "CodeNinja42",
                time: "23 minutes",
              },
              { month: "October 2024", challenge: "ASCII Art Generator", winner: "BrainMaster", time: "1h 47m" },
              { month: "September 2024", challenge: "Calculator Challenge", winner: "MinimalCoder", time: "2h 15m" },
            ].map((contest, i) => (
              <Card key={i} className="bg-muted/20">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-bold">{contest.month}</div>
                    <div className="text-sm text-muted-foreground">{contest.challenge}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-cyan-400 font-bold">{contest.winner}</div>
                    <div className="text-sm text-muted-foreground">{contest.time}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contest Rules */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Contest Rules</h2>
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="space-y-3 text-muted-foreground">
                <p>
                  • <strong className="text-foreground">Pure BrainF++ only</strong> - No cheating with other languages!
                </p>
                <p>
                  • <strong className="text-foreground">Original solutions</strong> - Copy-pasting from Stack Overflow
                  won't work here
                </p>
                <p>
                  • <strong className="text-foreground">Time-based scoring</strong> - Fastest correct solution wins
                </p>
                <p>
                  • <strong className="text-foreground">Code golf bonus</strong> - Shorter programs get bonus points
                </p>
                <p>
                  • <strong className="text-foreground">No infinite loops</strong> - We have execution limits for a
                  reason
                </p>
                <p>
                  • <strong className="text-foreground">Have fun!</strong> - Remember, we're all here to suffer together
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
