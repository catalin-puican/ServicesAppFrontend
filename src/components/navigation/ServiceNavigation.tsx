  import { Link, useNavigate } from "react-router-dom";
  import { Wrench, Brush, Hammer, LayoutGrid, Plus } from "lucide-react";
  import { Button } from "../ui/button";

  export const ServiceNavigation = () => {
    const navigate = useNavigate();
    const filters = [
      { label: "All", icon: <LayoutGrid className="h-4 w-4" /> },
      { label: "Plumbing", icon: <Wrench className="h-4 w-4" /> },
      { label: "Cleaning", icon: <Brush className="h-4 w-4" /> },
      { label: "Repairs", icon: <Hammer className="h-4 w-4" /> },
      { label: "Add Post", icon: <Plus className="h-4 w-4" /> },
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
              {filters.map((filter) => (
                
                <Button
                  key={filter.label}
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-8 px-3 text-xs font-medium transition-all hover:bg-background hover:shadow-sm"
                  onClick={() => {
                    if (filter.label === "Add Post") {
                      navigate("/post/add");
                    }
                  }}
                >
                  {filter.icon}
                  <span className="ml-1.5">{filter.label}</span>
                </Button>
                
              ))}
            </div>
          </div>
        </div>
    );
  };
