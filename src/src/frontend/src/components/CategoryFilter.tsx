import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  isLoading?: boolean;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading = false,
}: CategoryFilterProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-md" />
        ))}
      </div>
    );
  }

  // Merge predefined categories with dynamic ones, exclude twixtor
  const predefinedCategories = ["english", "japanese"];
  const filteredCategories = categories.filter(cat => cat !== "twixtor");
  const allCategories = [...predefinedCategories, ...filteredCategories];

  return (
    <Tabs value={selectedCategory || "all"} className="w-full">
      <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0 overflow-x-auto w-full justify-start flex-nowrap">
        <TabsTrigger
          value="all"
          onClick={() => onCategoryChange(null)}
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
        >
          All
        </TabsTrigger>
        {allCategories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            onClick={() => onCategoryChange(category)}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
