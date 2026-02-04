import { Navigation } from '@/components/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContestPage() {
  return (
    <div>
      <Navigation />

      <main className="container mx-auto max-w-5xl space-y-16 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 bg-clip-text font-mono text-6xl font-bold text-transparent">
            BrainF++ contest
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
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
                <CardTitle className="font-mono text-2xl">TBD Challenge</CardTitle>
                <Badge className="bg-gray-500 font-mono text-black">COMING SOON</Badge>
              </div>
              <CardDescription className="text-lg">
                Contest details and dates to be announced
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 text-center md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">TBD</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">TBD</div>
                  <div className="text-sm text-muted-foreground">Date</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">TBD</div>
                  <div className="text-sm text-muted-foreground">Prize Pool</div>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="bg-cyan-500 font-mono text-black hover:bg-cyan-600" disabled>
                  Join Contest
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent font-mono" disabled>
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
                  <CardTitle className="font-mono">TBD</CardTitle>
                  <Badge variant="outline" className="font-mono">
                    UPCOMING
                  </Badge>
                </div>
                <CardDescription>Contest details to be announced</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  More contests coming soon. Stay tuned for updates!
                </p>
                <Button variant="outline" className="w-full bg-transparent font-mono" disabled>
                  Set Reminder
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono">TBD</CardTitle>
                  <Badge variant="outline" className="font-mono">
                    UPCOMING
                  </Badge>
                </div>
                <CardDescription>Contest details to be announced</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  More contests coming soon. Stay tuned for updates!
                </p>
                <Button variant="outline" className="w-full bg-transparent font-mono" disabled>
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
            <Card className="bg-muted/20">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center text-muted-foreground">
                  No past contests yet. Winners will be displayed here after the first contest!
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contest Rules */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-4xl font-bold">Contest Rules</h2>
          <Card>
            <CardContent className="space-y-4 p-8">
              <div className="space-y-3 text-muted-foreground">
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
