import { Navigation } from '@/components/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContestPage() {
  return (
    <div>
      <Navigation />

      <main className="container space-y-16 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 bg-clip-text font-mono text-6xl font-bold text-transparent">
            BrainF++ Contest
          </h1>
          <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
            Welcome to the ultimate test of minimalist programming prowess! Can you solve complex
            problems with just 8 commands?
          </p>
        </div>

        {/* Current Contest */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-4xl font-bold">Current Contest</h2>
          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-2xl">December 2024 Challenge</CardTitle>
                <Badge className="bg-green-500 font-mono text-black">LIVE</Badge>
              </div>
              <CardDescription className="text-lg">
                "The Fibonacci Fiasco" - Generate the first 10 Fibonacci numbers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 text-center md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">47</div>
                  <div className="text-muted-foreground text-sm">Participants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">3d 14h</div>
                  <div className="text-muted-foreground text-sm">Time Left</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">$500</div>
                  <div className="text-muted-foreground text-sm">Prize Pool</div>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="bg-cyan-500 font-mono text-black hover:bg-cyan-600">
                  Join Contest
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent font-mono">
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Contests */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-4xl font-bold">Upcoming Contests</h2>
          <div className="grid gap-6 md:grid-cols-2">
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
                <p className="text-muted-foreground mb-4 text-sm">
                  Think sorting is hard in normal languages? Try it with just 8 commands!
                </p>
                <Button variant="outline" className="w-full bg-transparent font-mono">
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
                <p className="text-muted-foreground mb-4 text-sm">
                  Mathematical algorithms meet minimalist programming. What could go wrong?
                </p>
                <Button variant="outline" className="w-full bg-transparent font-mono">
                  Set Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Past Winners */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-4xl font-bold">Hall of Fame</h2>
          <div className="space-y-4">
            {[
              {
                month: 'November 2024',
                challenge: 'Hello World Variations',
                winner: 'CodeNinja42',
                time: '23 minutes',
              },
              {
                month: 'October 2024',
                challenge: 'ASCII Art Generator',
                winner: 'BrainMaster',
                time: '1h 47m',
              },
              {
                month: 'September 2024',
                challenge: 'Calculator Challenge',
                winner: 'MinimalCoder',
                time: '2h 15m',
              },
            ].map((contest, i) => (
              <Card key={i} className="bg-muted/20">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <div className="font-mono font-bold">{contest.month}</div>
                    <div className="text-muted-foreground text-sm">{contest.challenge}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-cyan-400">{contest.winner}</div>
                    <div className="text-muted-foreground text-sm">{contest.time}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contest Rules */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-4xl font-bold">Contest Rules</h2>
          <Card>
            <CardContent className="space-y-4 p-8">
              <div className="text-muted-foreground space-y-3">
                <p>
                  • <strong className="text-foreground">Pure BrainF++ only</strong> - No cheating
                  with other languages!
                </p>
                <p>
                  • <strong className="text-foreground">Original solutions</strong> - Copy-pasting
                  from Stack Overflow won't work here
                </p>
                <p>
                  • <strong className="text-foreground">Time-based scoring</strong> - Fastest
                  correct solution wins
                </p>
                <p>
                  • <strong className="text-foreground">Code golf bonus</strong> - Shorter programs
                  get bonus points
                </p>
                <p>
                  • <strong className="text-foreground">No infinite loops</strong> - We have
                  execution limits for a reason
                </p>
                <p>
                  • <strong className="text-foreground">Have fun!</strong> - Remember, we're all
                  here to suffer together
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
