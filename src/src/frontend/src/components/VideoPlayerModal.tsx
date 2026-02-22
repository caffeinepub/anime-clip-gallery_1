import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Clip } from "../backend.d.ts";

interface VideoPlayerModalProps {
  clip: Clip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Action: "bg-chart-1 text-primary-foreground",
  Comedy: "bg-chart-2 text-card",
  Drama: "bg-chart-3 text-primary-foreground",
  Romance: "bg-accent text-accent-foreground",
  Fantasy: "bg-secondary text-secondary-foreground",
};

export function VideoPlayerModal({ clip, open, onOpenChange }: VideoPlayerModalProps) {
  if (!clip) return null;

  const categoryColor = CATEGORY_COLORS[clip.category] || "bg-muted text-muted-foreground";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <DialogTitle className="text-2xl font-display text-card-foreground">
                {clip.title}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                {clip.animeName}
              </DialogDescription>
            </div>
            <Badge className={`shrink-0 ${categoryColor}`}>{clip.category}</Badge>
          </div>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
          {clip.videoUrl ? (
            <video
              src={clip.videoUrl}
              controls
              autoPlay
              className="h-full w-full"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              Video not available
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
