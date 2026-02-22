import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import type { Clip } from "../backend.d.ts";

interface ClipCardProps {
  clip: Clip;
  onClick: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Action: "bg-chart-1 text-primary-foreground",
  Comedy: "bg-chart-2 text-card",
  Drama: "bg-chart-3 text-primary-foreground",
  Romance: "bg-accent text-accent-foreground",
  Fantasy: "bg-secondary text-secondary-foreground",
};

export function ClipCard({ clip, onClick }: ClipCardProps) {
  const categoryColor = CATEGORY_COLORS[clip.category] || "bg-muted text-muted-foreground";

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-lg border-border/50 bg-card/80 backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {clip.thumbnailUrl ? (
          <img
            src={clip.thumbnailUrl}
            alt={clip.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <Play className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="rounded-full bg-primary/90 p-4 shadow-glow-lg backdrop-blur-sm">
            <Play className="h-8 w-8 text-primary-foreground fill-current" />
          </div>
        </div>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {clip.title}
          </h3>
          <Badge className={`shrink-0 ${categoryColor}`}>{clip.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{clip.animeName}</p>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}
