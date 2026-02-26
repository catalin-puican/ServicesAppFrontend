import { useUserContext } from "@/contexts/User/useUserContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getUserById, uploadProfilePhoto } from "@/services/Users/UsersService";
import { Loader2 } from "lucide-react";
import type { User } from "@/schemas/Users/UserSchema";
import { toast } from "sonner";

export const ProfilePage = () => {
  const { currentUser, refreshCurrentUser } = useUserContext();
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if(!id) navigate("/");
    
    const getProfileUser = async () => {
      setIsLoading(true);
      try
      {
        const user = await getUserById(id!);
        setUser(user);
      }
      catch (error)
      {
        setError("Failed to fetch user");
      }
      finally
      {
        setIsLoading(false);
      }
    }

    getProfileUser();
  }, [id, setUser]);

  const handleNavigateToEditProfile = () => {
    navigate(`/profile/${currentUser?.id}/edit`);
  };
 
  const handleNavigateToAddPost = () => {
    navigate("/post/add");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await uploadProfilePhoto(file);
      await refreshCurrentUser();
    } catch (error) {
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p className="text-destructive font-medium">{error || "User not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="container mx-auto py-10 px-4 flex justify-center">
      <Card className="w-full h-full overflow-hidden">
        <CardHeader className="px-8 pt-8 pb-4">
          <div className="flex flex-col items-center md:flex-row gap-8 md:items-center text-center md:text-left">
            <div className="group relative shrink-0">
              <div className="relative inline-block">
                <Avatar className="h-40 w-40 border-4 border-background shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/20">
                  <AvatarImage src={user.profileImageUrl || ""} alt={user.firstName} />
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary font-bold">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
               
                {isOwnProfile && (
                  <button 
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className="absolute bottom-2 right-2 p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 hover:scale-110 transition-all duration-200 cursor-pointer"                  aria-label="Change profile picture"
                  >
                    {isUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                  {user.firstName} {user.lastName}
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center md:place-items-start">
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-primary/70">Contact Details</h3>
                  <div className="space-y-2 flex flex-col items-center md:items-start">
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" /> {user.email}
                    </p>
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" /> {user.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-primary/70">Location</h3>
                  <div className="space-y-2 flex flex-col items-center md:items-start">
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> 
                      <span>
                        {user.locality}, {user.state}, {user.country}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground md:pl-6">
                      {user.addressLine1} {user.addressLine2 && `, ${user.addressLine2}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-8">
          <Separator />
          
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">About Me</h3>
              <div className="p-4 rounded-xl bg-accent/30 border border-accent/50">
                <p className="text-muted-foreground leading-relaxed">
                  {user.description || "No description provided yet."}
                </p>
              </div>
            </div>

              {isOwnProfile && (
                <div className="pt-2 flex flex-col md:flex-row gap-4">
                  <Button 
                    onClick={handleNavigateToEditProfile}
                    className="w-full md:w-auto px-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  > 
                    Edit Profile
                  </Button>
                  <Button 
                    onClick={handleNavigateToAddPost} 
                    className="w-full md:w-auto px-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Add Post
                  </Button>
                </div>
              )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
