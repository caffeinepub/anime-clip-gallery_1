import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Film, Image as ImageIcon, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useAddClip } from "../hooks/useQueries";
import { ExternalBlob } from "../backend";

interface UploadFormProps {
  categories: string[];
}

export function UploadForm({ categories }: UploadFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [animeName, setAnimeName] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoDragActive, setVideoDragActive] = useState(false);
  const [thumbnailDragActive, setThumbnailDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    video: number;
    thumbnail: number;
  }>({ video: 0, thumbnail: 0 });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const addClipMutation = useAddClip();

  const handleVideoDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setVideoDragActive(true);
    } else if (e.type === "dragleave") {
      setVideoDragActive(false);
    }
  };

  const handleThumbnailDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setThumbnailDragActive(true);
    } else if (e.type === "dragleave") {
      setThumbnailDragActive(false);
    }
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVideoDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
      } else {
        toast.error("Please upload a video file");
      }
    }
  };

  const handleThumbnailDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setThumbnailDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setThumbnailFile(file);
      } else {
        toast.error("Please upload an image file");
      }
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !animeName || !category || !videoFile || !thumbnailFile) {
      toast.error("Please fill in all fields and upload both video and thumbnail");
      return;
    }

    try {
      // Upload video
      const videoBytes = new Uint8Array(await videoFile.arrayBuffer());
      const videoBlob = ExternalBlob.fromBytes(videoBytes).withUploadProgress(
        (percentage) => {
          setUploadProgress((prev) => ({ ...prev, video: percentage }));
        }
      );
      const videoUrl = videoBlob.getDirectURL();

      // Upload thumbnail
      const thumbnailBytes = new Uint8Array(await thumbnailFile.arrayBuffer());
      const thumbnailBlob = ExternalBlob.fromBytes(thumbnailBytes).withUploadProgress(
        (percentage) => {
          setUploadProgress((prev) => ({ ...prev, thumbnail: percentage }));
        }
      );
      const thumbnailUrl = thumbnailBlob.getDirectURL();

      // Add clip to backend
      await addClipMutation.mutateAsync({
        title,
        animeName,
        category,
        videoUrl,
        thumbnailUrl,
      });

      toast.success("Clip uploaded successfully!");
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload clip. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setAnimeName("");
    setCategory("");
    setVideoFile(null);
    setThumbnailFile(null);
    setUploadProgress({ video: 0, thumbnail: 0 });
  };

  const isUploading = addClipMutation.isPending;
  const showProgress = uploadProgress.video > 0 || uploadProgress.thumbnail > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-bold shadow-glow-xl transition-all duration-300 hover:scale-105">
          <Upload className="mr-2 h-4 w-4" />
          Upload Clip
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-primary/30 shadow-glow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Upload Anime Clip
          </DialogTitle>
          <DialogDescription className="text-base">
            Add a new anime clip to the gallery. Fill in the details and upload your files.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Clip Title</Label>
                <Input
                  id="title"
                  placeholder="Enter clip title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-card/80 border-primary/30 focus:border-primary focus:ring-primary/50"
                  disabled={isUploading}
                />
            </div>

            <div className="space-y-2">
              <Label htmlFor="animeName">Anime Name</Label>
                <Input
                  id="animeName"
                  placeholder="Enter anime name..."
                  value={animeName}
                  onChange={(e) => setAnimeName(e.target.value)}
                  className="bg-card/80 border-accent/30 focus:border-accent focus:ring-accent/50"
                  disabled={isUploading}
                />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={isUploading}>
                <SelectTrigger className="bg-card/80 border-secondary/30 focus:border-secondary focus:ring-secondary/50">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Video File</Label>
                <div
                  className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-all duration-300 ${
                    videoDragActive
                      ? "border-primary bg-primary/20 shadow-glow-pink"
                      : "border-border/30 bg-card/40 hover:border-primary/50"
                  }`}
                  onDragEnter={handleVideoDrag}
                  onDragLeave={handleVideoDrag}
                  onDragOver={handleVideoDrag}
                  onDrop={handleVideoDrop}
                >
                  {videoFile ? (
                    <div className="space-y-2">
                      <Film className="mx-auto h-8 w-8 text-primary" />
                      <p className="text-sm font-medium text-card-foreground line-clamp-1">
                        {videoFile.name}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setVideoFile(null)}
                        className="mx-auto"
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Film className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag video here or click to browse
                      </p>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => videoInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        Browse
                      </Button>
                    </div>
                  )}
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <div
                  className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-all duration-300 ${
                    thumbnailDragActive
                      ? "border-accent bg-accent/20 shadow-glow-purple"
                      : "border-border/30 bg-card/40 hover:border-accent/50"
                  }`}
                  onDragEnter={handleThumbnailDrag}
                  onDragLeave={handleThumbnailDrag}
                  onDragOver={handleThumbnailDrag}
                  onDrop={handleThumbnailDrop}
                >
                  {thumbnailFile ? (
                    <div className="space-y-2">
                      <ImageIcon className="mx-auto h-8 w-8 text-primary" />
                      <p className="text-sm font-medium text-card-foreground line-clamp-1">
                        {thumbnailFile.name}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setThumbnailFile(null)}
                        className="mx-auto"
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag image here or click to browse
                      </p>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => thumbnailInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        Browse
                      </Button>
                    </div>
                  )}
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </div>
            </div>

            {showProgress && (
              <div className="space-y-3 rounded-xl bg-card/60 p-5 border border-primary/20 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Video upload</span>
                    <span className="text-primary font-bold">{uploadProgress.video}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted border border-primary/30">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 shadow-glow-pink"
                      style={{ width: `${uploadProgress.video}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Thumbnail upload</span>
                    <span className="text-accent font-bold">{uploadProgress.thumbnail}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted border border-accent/30">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-secondary transition-all duration-300 shadow-glow-purple"
                      style={{ width: `${uploadProgress.thumbnail}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isUploading}
              className="border-border/50 hover:bg-muted/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading || !title || !animeName || !category || !videoFile || !thumbnailFile}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-bold shadow-glow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Clip
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
