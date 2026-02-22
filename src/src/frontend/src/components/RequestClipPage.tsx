import { useState } from "react";
import { Send, Loader2, CheckCircle, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  useSubmitClipRequest,
  useGetAllClipRequests,
} from "../hooks/useQueries";
import type { ClipRequest } from "../backend.d.ts";

export function RequestClipPage() {
  const [title, setTitle] = useState("");
  const [animeName, setAnimeName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  const submitMutation = useSubmitClipRequest();
  const { data: requests = [], isLoading: isLoadingRequests } =
    useGetAllClipRequests();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !animeName.trim() || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        title: title.trim(),
        animeName: animeName.trim(),
        description: description.trim(),
        requesterContact: contact.trim(),
      });

      toast.success("Request submitted successfully!");
      setTitle("");
      setAnimeName("");
      setDescription("");
      setContact("");
    } catch (error) {
      toast.error("Failed to submit request");
      console.error(error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-glow-white">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            For Supporters Only
          </span>
        </div>
        <h1 className="font-display text-5xl font-black text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
          Request a Clip
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Can't find the anime clip you're looking for? Submit a request and
          we'll add it to our collection.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Request Form */}
        <Card className="border-primary/20 shadow-glow-white-lg bg-card/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-display">
              Submit Your Request
            </CardTitle>
            <CardDescription>
              Fill out the form below to request a new anime clip
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">
                  Clip Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Epic Battle Scene"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-primary/20 focus:border-primary focus:ring-primary shadow-glow-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="animeName" className="text-foreground">
                  Anime Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="animeName"
                  placeholder="e.g., Demon Slayer"
                  value={animeName}
                  onChange={(e) => setAnimeName(e.target.value)}
                  className="border-primary/20 focus:border-primary focus:ring-primary shadow-glow-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the scene, episode number, or any specific details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] border-primary/20 focus:border-primary focus:ring-primary shadow-glow-white resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-foreground">
                  Contact Info (Optional)
                </Label>
                <Input
                  id="contact"
                  type="email"
                  placeholder="your.email@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="border-primary/20 focus:border-primary focus:ring-primary shadow-glow-white"
                />
                <p className="text-xs text-muted-foreground">
                  We'll notify you when your request is fulfilled
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitMutation.isPending}
                className="w-full shadow-glow-white-lg hover:shadow-glow-white-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Request List */}
        <Card className="border-primary/20 shadow-glow-white-lg bg-card/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-display">
              Recent Requests
            </CardTitle>
            <CardDescription>
              Track the status of submitted clip requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              {isLoadingRequests ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Loading requests...
                  </p>
                </div>
              ) : requests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-6 shadow-glow-white">
                    <Send className="h-12 w-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">No requests yet</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Be the first to submit a clip request. Your favorite
                      anime moments could be featured here!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request: ClipRequest, index: number) => (
                    <div key={request.id.toString()}>
                      <div
                        className="space-y-3 p-4 rounded-lg border border-primary/10 bg-card/50 hover:border-primary/20 hover:bg-card/70 transition-all duration-300 shadow-glow-white"
                        style={{
                          animation: `fade-in 0.4s ease-out ${index * 0.05}s both`,
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 flex-1">
                            <h4 className="font-semibold text-foreground leading-tight">
                              {request.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {request.animeName}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(request.status)} shrink-0`}
                          >
                            {request.status === "completed" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {request.status === "in-progress" && (
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            )}
                            {request.status === "pending" && (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {request.status}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {request.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(request.requestDate)}
                          </span>
                        </div>
                      </div>
                      {index < requests.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
