import { useUserContext } from "@/contexts/User/useUserContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

export const Navigation = () => {
  const { currentUser, logoutUser } = useUserContext();

  const navigate = useNavigate();


  return (
    <div className=" top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Button 
                  variant="ghost" className="text-lg transition-colors hover:text-primary" onClick={() => navigate("/")}
                >
                  Home
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>
                  <Input  className="w-64 h-10 hover:bg-accent focus:bg-accent" placeholder="Search..." />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>
        <NavigationMenu data-align="end">
          <NavigationMenuList className="gap-2">
            {!currentUser ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <Button 
                      variant="ghost" className="text-lg transition-colors hover:text-primary" onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <Button 
                      variant="ghost" className="text-lg transition-colors hover:text-primary" onClick={() => navigate("/register")}
                    >
                      Register
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent focus:bg-accent data-[state=open]:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/10 transition-all hover:ring-primary/30">
                      <AvatarImage src={currentUser?.profileImageUrl || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {currentUser?.firstName[0]}
                        {currentUser?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-2 p-3">
                    <li>
                      <NavigationMenuLink>
                        <Link
                          to={`/profile/${currentUser?.id}`}
                          className="group flex items-start gap-3 select-none rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-accent hover:shadow-sm focus:bg-accent focus:shadow-sm"
                        >
                          <User className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                          <div className="space-y-1">
                            <div className="text-sm font-medium leading-none group-hover:text-accent-foreground transition-colors">
                              Profile
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              View and edit your profile
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="border-t pt-2">
                      <button
                        onClick={() => logoutUser()}
                        className="group w-full flex items-start gap-3 select-none rounded-lg p-3 leading-none outline-none transition-all hover:bg-destructive/10 focus:bg-destructive/10"
                      >
                        <LogOut className="h-5 w-5 mt-0.5 text-destructive transition-colors" />
                        <div className="text-left">
                          <div className="text-sm font-medium leading-none text-destructive">
                            Logout
                          </div>
                          <p className="text-xs leading-snug text-muted-foreground mt-1">
                            Sign out of your account
                          </p>
                        </div>
                      </button>
                    </li>
                  </ul>
                  
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};