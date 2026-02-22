import { Heart, Coffee, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DonationPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow mb-4">
          <Heart className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Support Our Work
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Help us maintain and improve the Anime Clip Gallery. Your support keeps this platform
          running and allows us to add new features for the community.
        </p>
      </div>

      {/* Support Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Coffee className="h-8 w-8 text-primary" />
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Basic
              </Badge>
            </div>
            <CardTitle className="text-2xl">Coffee Supporter</CardTitle>
            <CardDescription>Buy us a coffee to keep the servers running</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-primary">$5</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Support server costs
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Contributor badge
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Our eternal gratitude
              </li>
            </ul>
            <Button className="w-full shadow-glow" variant="outline">
              Support Us
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/50 bg-gradient-to-br from-card/60 to-primary/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 scale-105">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-8 w-8 text-primary" />
              <Badge className="bg-primary text-primary-foreground shadow-glow">Popular</Badge>
            </div>
            <CardTitle className="text-2xl">Premium Supporter</CardTitle>
            <CardDescription>Help us grow and add new features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-primary">$15</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> All Basic tier benefits
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Premium badge
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Early access to features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Priority support
              </li>
            </ul>
            <Button className="w-full shadow-glow">Support Us</Button>
          </CardContent>
        </Card>

        <Card className="border-accent/50 bg-card/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Crown className="h-8 w-8 text-accent" />
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                Elite
              </Badge>
            </div>
            <CardTitle className="text-2xl">Elite Patron</CardTitle>
            <CardDescription>Become a core supporter of the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-accent">$50</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> All Premium tier benefits
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Elite patron badge
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Feature voting rights
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Dedicated support channel
              </li>
            </ul>
            <Button className="w-full shadow-glow" variant="outline">
              Support Us
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alternative Support Methods */}
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Other Ways to Support</CardTitle>
          <CardDescription>
            Not ready to contribute financially? Here are other ways you can help
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">📢</span> Share with Others
              </h3>
              <p className="text-sm text-muted-foreground">
                Tell your friends about the platform and help grow our community
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">💡</span> Contribute Ideas
              </h3>
              <p className="text-sm text-muted-foreground">
                Share your suggestions for new features and improvements
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🎨</span> Create Content
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload quality clips and help build our library
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🐛</span> Report Issues
              </h3>
              <p className="text-sm text-muted-foreground">
                Help us improve by reporting bugs and usability issues
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thank You Message */}
      <div className="text-center p-8 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-2 text-foreground">Thank You!</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every contribution, whether financial or through community engagement, helps us keep this
          platform running and continuously improving. We're grateful for your support!
        </p>
      </div>
    </div>
  );
}
