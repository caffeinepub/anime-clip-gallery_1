import { useState, useEffect } from "react";
import { Film, Heart, Sparkles } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { HomePage } from "./components/HomePage";
import { DonationPage } from "./components/DonationPage";
import { TwixtorPage } from "./components/TwixtorPage";
import { UploadForm } from "./components/UploadForm";
import {
  useGetAllClips,
  useGetClipsByCategory,
  useSearchClips,
  useGetAllCategories,
} from "./hooks/useQueries";

type PageType = "home" | "donation" | "twixtor";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: allClips = [], isLoading: isLoadingAll } = useGetAllClips();
  const { data: categoryClips = [], isLoading: isLoadingCategory } = useGetClipsByCategory(
    selectedCategory
  );
  const { data: searchResults = [], isLoading: isSearching } = useSearchClips(debouncedSearch);
  const { data: categories = [], isLoading: isLoadingCategories } = useGetAllCategories();

  // Determine which clips to display
  const displayedClips = debouncedSearch
    ? searchResults
    : selectedCategory
    ? categoryClips
    : allClips;

  const isLoading = debouncedSearch
    ? isSearching
    : selectedCategory
    ? isLoadingCategory
    : isLoadingAll;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background relative">
        {/* Neon gradient overlays - editor aesthetic */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "3s" }} />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-black/80 backdrop-blur-xl shadow-lg shadow-primary/5">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-primary via-accent to-secondary p-2.5 shadow-glow-xl animate-glow-pulse">
                  <Film className="h-6 w-6 text-black" />
                </div>
                <h1 className="font-display text-2xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight">
                  Anime Clip Gallery
                </h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                <Button
                  variant={currentPage === "home" ? "default" : "ghost"}
                  onClick={() => setCurrentPage("home")}
                  className={currentPage === "home" ? "shadow-glow-pink bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" : "hover:bg-primary/10"}
                >
                  <Film className="h-4 w-4 mr-2" />
                  Home
                </Button>
                <Button
                  variant={currentPage === "twixtor" ? "default" : "ghost"}
                  onClick={() => setCurrentPage("twixtor")}
                  className={currentPage === "twixtor" ? "shadow-glow-purple bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90" : "hover:bg-accent/10"}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Twixtor
                </Button>
                <Button
                  variant={currentPage === "donation" ? "default" : "ghost"}
                  onClick={() => setCurrentPage("donation")}
                  className={currentPage === "donation" ? "shadow-glow-blue bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90" : "hover:bg-secondary/10"}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donation
                </Button>
              </nav>

              <UploadForm categories={categories} />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2 pb-3 overflow-x-auto">
              <Button
                variant={currentPage === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage("home")}
                className={currentPage === "home" ? "shadow-glow-pink" : ""}
              >
                <Film className="h-4 w-4 mr-1" />
                Home
              </Button>
              <Button
                variant={currentPage === "twixtor" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage("twixtor")}
                className={currentPage === "twixtor" ? "shadow-glow-purple" : ""}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Twixtor
              </Button>
              <Button
                variant={currentPage === "donation" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage("donation")}
                className={currentPage === "donation" ? "shadow-glow-blue" : ""}
              >
                <Heart className="h-4 w-4 mr-1" />
                Donation
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-8">
          {currentPage === "home" && (
            <div className="space-y-8">
              {/* Search and filter section */}
              <div className="space-y-4 rounded-2xl border border-primary/20 bg-card/60 p-6 backdrop-blur-lg shadow-glow-lg">
                <SearchBar value={searchText} onChange={setSearchText} />
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  isLoading={isLoadingCategories}
                />
              </div>

              {/* Results count */}
              {!isLoading && displayedClips.length > 0 && (
                <div className="flex items-center justify-between px-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-bold">{displayedClips.length}</span> {displayedClips.length === 1 ? "clip" : "clips"} found
                    {debouncedSearch && ` for "${debouncedSearch}"`}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                </div>
              )}

              {/* Clips grid */}
              <HomePage clips={displayedClips} isLoading={isLoading} />
            </div>
          )}

          {currentPage === "donation" && <DonationPage />}
          {currentPage === "twixtor" && <TwixtorPage />}
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-primary/20 bg-card/30 backdrop-blur-lg py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026. Built with{" "}
              <span className="text-primary animate-pulse">♥</span> using{" "}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text hover:underline transition-all"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
