import { Sparkles, Play, Info, Upload, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadForm } from "./UploadForm";
import { useGetAllCategories } from "../hooks/useQueries";

export function TwixtorPage() {
  const { data: categories = [] } = useGetAllCategories();

  return (
    <div className="space-y-12">
      {/* Neon gradient background overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-6 relative">
        <div className="inline-flex items-center justify-center p-6 rounded-full bg-gradient-to-br from-primary via-accent to-secondary shadow-glow-xl animate-glow-pulse">
          <Sparkles className="h-16 w-16 text-foreground drop-shadow-[0_0_8px_oklch(var(--primary))]" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight">
          Twixtor Effects
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
          Cinematic slow-motion perfection. Transform anime clips into <span className="text-primary font-semibold">frame-perfect masterpieces</span>.
        </p>
      </div>

      {/* Upload Section - Prominent feature */}
      <Card className="border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-lg shadow-glow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <CardHeader className="relative">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow-pink">
              <Upload className="h-7 w-7 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-display font-bold">Upload Your Twixtor Clip</CardTitle>
              <CardDescription className="text-base mt-1">
                Share your slow-motion anime edits with the community
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5">
              <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">High Frame Rate</h4>
                <p className="text-xs text-muted-foreground">60fps+ source footage recommended</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
              <Sparkles className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Twixtor Category</h4>
                <p className="text-xs text-muted-foreground">Select "twixtor" when uploading</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-secondary/20 bg-secondary/5">
              <Play className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Action Scenes</h4>
                <p className="text-xs text-muted-foreground">Best for fight sequences & motion</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <UploadForm categories={categories} />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Upload clips with <span className="text-primary font-medium">smooth interpolation</span> and <span className="text-accent font-medium">high quality</span> for the best results
          </p>
        </CardContent>
      </Card>

      {/* What is Twixtor Info */}
      <Alert className="border-secondary/50 bg-gradient-to-br from-secondary/10 via-card to-accent/10 backdrop-blur-sm shadow-glow-blue">
        <Info className="h-6 w-6 text-secondary" />
        <AlertTitle className="text-xl font-display font-bold">What is Twixtor?</AlertTitle>
        <AlertDescription className="text-muted-foreground mt-3 text-base leading-relaxed">
          Twixtor is a <span className="text-secondary font-semibold">revolutionary video effect plugin</span> that creates incredibly smooth slow-motion
          sequences by intelligently generating new frames between existing ones. In anime edits,
          it transforms action scenes into <span className="text-accent font-semibold">cinematic masterpieces</span>, adding dramatic emphasis to key
          moments with fluid, professional-grade slow-motion effects.
        </AlertDescription>
      </Alert>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/10 backdrop-blur-lg shadow-glow-pink hover:shadow-glow-xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-primary/20 shadow-glow-pink group-hover:scale-110 transition-transform duration-300">
                <Play className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl font-display">Smooth Playback</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-muted-foreground leading-relaxed">
              Experience ultra-smooth slow-motion effects that maintain clarity and detail even at
              reduced speeds
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/30 bg-gradient-to-br from-card to-accent/10 backdrop-blur-lg shadow-glow-purple hover:shadow-glow-xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-accent/20 shadow-glow-purple group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-7 w-7 text-accent" />
              </div>
              <CardTitle className="text-2xl font-display">Cinematic Quality</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-muted-foreground leading-relaxed">
              Professional-grade frame interpolation creates cinema-quality slow-motion effects for
              dramatic impact
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/30 bg-gradient-to-br from-card to-secondary/10 backdrop-blur-lg shadow-glow-blue hover:shadow-glow-xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-secondary/20 shadow-glow-blue group-hover:scale-110 transition-transform duration-300">
                <Info className="h-7 w-7 text-secondary" />
              </div>
              <CardTitle className="text-2xl font-display">Perfect for Action</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-muted-foreground leading-relaxed">
              Ideal for highlighting intense fight scenes, emotional moments, and dramatic sequences
              in anime
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How to Find Twixtor Clips */}
      <Card className="border-border/30 bg-card/60 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-display flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            Finding Twixtor Clips
          </CardTitle>
          <CardDescription className="text-base">Learn how to browse and upload Twixtor-enhanced clips</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-5 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent hover:from-primary/15 transition-colors duration-300">
              <Badge className="mt-0.5 shadow-glow-pink text-lg px-3 py-1">1</Badge>
              <div>
                <h3 className="font-bold text-lg mb-2">Browse Twixtor Clips</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Return to the home page and filter clips by the "twixtor" category to see all
                  Twixtor-enhanced videos in the gallery
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl border border-accent/30 bg-gradient-to-r from-accent/10 to-transparent hover:from-accent/15 transition-colors duration-300">
              <Badge className="mt-0.5 shadow-glow-purple text-lg px-3 py-1">2</Badge>
              <div>
                <h3 className="font-bold text-lg mb-2">Upload Twixtor Clips</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When uploading a new clip, select or type "twixtor" as the category to add it to
                  this special collection
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl border border-secondary/30 bg-gradient-to-r from-secondary/10 to-transparent hover:from-secondary/15 transition-colors duration-300">
              <Badge className="mt-0.5 shadow-glow-blue text-lg px-3 py-1">3</Badge>
              <div>
                <h3 className="font-bold text-lg mb-2">Search & Discover</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Use the search bar to find specific anime titles with Twixtor effects applied
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-border/30 bg-gradient-to-br from-card/80 via-primary/5 to-accent/5 backdrop-blur-lg shadow-glow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
        <CardHeader className="relative">
          <CardTitle className="text-3xl font-display">Best Practices for Twixtor Clips</CardTitle>
          <CardDescription className="text-base">
            Tips for creating and uploading high-quality Twixtor effects
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
              <span className="text-primary text-2xl mt-0.5 font-bold">✓</span>
              <div>
                <span className="font-bold text-lg block mb-1">High Frame Rate Source</span>
                <p className="text-muted-foreground leading-relaxed">
                  Use high frame rate source footage (60fps or higher) for the smoothest results
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors duration-300">
              <span className="text-accent text-2xl mt-0.5 font-bold">✓</span>
              <div>
                <span className="font-bold text-lg block mb-1">Action-Packed Scenes</span>
                <p className="text-muted-foreground leading-relaxed">
                  Fight scenes, character movements, and dynamic camera work benefit most from
                  Twixtor
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-lg border border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors duration-300">
              <span className="text-secondary text-2xl mt-0.5 font-bold">✓</span>
              <div>
                <span className="font-bold text-lg block mb-1">Proper Tagging</span>
                <p className="text-muted-foreground leading-relaxed">
                  Always tag clips with both "twixtor" and the anime name for easy discovery
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
              <span className="text-primary text-2xl mt-0.5 font-bold">✓</span>
              <div>
                <span className="font-bold text-lg block mb-1">Quality Check</span>
                <p className="text-muted-foreground leading-relaxed">
                  Preview your clip before uploading to ensure smooth playback without artifacts
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center p-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 backdrop-blur-lg shadow-glow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 animate-pulse" />
        <div className="relative">
          <h2 className="text-3xl font-display font-black mb-3 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Ready to Explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Head back to the home page and filter by "twixtor" to see all the stunning slow-motion
            anime clips
          </p>
          <Badge className="shadow-glow-xl text-lg px-6 py-3 font-display">Twixtor Category Available</Badge>
        </div>
      </div>
    </div>
  );
}
