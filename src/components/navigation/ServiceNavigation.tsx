import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LayoutGrid, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/Categories/CategoriesService";
import type { GetCategoryResponse } from "@/schemas/Categories/Responses/GetCategoryResponse";

export const ServiceNavigation = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [searchParams] = useSearchParams();
  const currentCategoryId = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        
        if (currentCategoryId) {
          const current = data.find(c => c.id === currentCategoryId);
          if (current) setSelectedCategory(current.name);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!currentCategoryId) {
      setSelectedCategory("All");
    } else if (categories.length > 0) {
      const current = categories.find(c => c.id === currentCategoryId);
      if (current) setSelectedCategory(current.name);
    }
  }, [currentCategoryId, categories]);

  const handleCategoryClick = (category: GetCategoryResponse) => {
    setSelectedCategory(category.name);
    navigate(`/?category=${category.id}`);
  };

  const filters = [
    { label: "All", icon: <LayoutGrid className="h-4 w-4" />, hasPopover: true },
    { label: "Add Post", icon: <Plus className="h-4 w-4" />, onClick: () => navigate("/post/add") },
  ];

  return (
    <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group transition-all">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            S
          </div>
          <span className="hidden sm:inline-block text-lg font-bold tracking-tight">
            ServicePlatform
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1.5 p-1 bg-muted/50 rounded-full border border-border/50">
          {filters.map((filter) => {
            if (filter.hasPopover) {
              return (
                <Popover key={filter.label}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-8 px-3 text-xs font-medium transition-all hover:bg-background hover:shadow-sm cursor-pointer"
                    >
                      {filter.icon}
                      <span className="ml-1.5">{filter.label === "All" ? selectedCategory : filter.label}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2">
                    <PopoverHeader className="px-2 pb-2 font-semibold">
                      Categories
                    </PopoverHeader>
                    <div className="grid gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-normal cursor-pointer text-primary"
                        onClick={() => {
                          setSelectedCategory("All");
                          navigate("/");
                        }}
                      >
                        All Categories
                      </Button>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <Button
                            key={category.id}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start font-normal cursor-pointer"
                            onClick={() => handleCategoryClick(category)}
                          >
                            {category.name}
                          </Button>
                        ))
                      ) : (
                        <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                          No categories found
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              );
            }

            return (
              <Button
                key={filter.label}
                variant="ghost"
                size="sm"
                className="rounded-full h-8 px-3 text-xs font-medium transition-all hover:bg-background hover:shadow-sm cursor-pointer"
                onClick={filter.onClick}
              >
                {filter.icon}
                <span className="ml-1.5">{filter.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
