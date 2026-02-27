import { useUserContext } from "@/contexts/User/useUserContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash2, X } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { type GetPostsResponse } from "@/schemas/Posts/Responses/GetPostsResponse";
import { getPostById, deletePost } from "@/services/Posts/PostsService";
import { queryReviews } from "@/services/Reviews/ReviewsService";
import { type GetReviewsResponse as ReviewResponse } from "@/schemas/Reviews/Responses/GetReviewsResponse";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import type { GetReviewImagesResponse } from "@/schemas/ReviewImages/Responses/GetReviewImagesResponse";

export const PostPage = () => {
  const { currentUser } = useUserContext();
  const { id } = useParams();

  const [post, setPost] = useState<GetPostsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1);
  const [reviewsTotalCount, setReviewsTotalCount] = useState(0);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxUrl(null), []);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePaginationForward = () => {
        searchParams.set("page", (currentPage + 1).toString());
        setSearchParams(searchParams);
    };

    const handlePaginationBackward = () => {
        if (currentPage > 1) {
            searchParams.set("page", (currentPage - 1).toString());
            setSearchParams(searchParams);
        }
    };

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      setIsReviewsLoading(true);
      try {
        const response = await queryReviews("", id, currentPage, 5);
        setReviews(response.reviews);
        setReviewsTotalPages(response.pageCount);
        setReviewsTotalCount(response.totalCount);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [id, currentPage]);

  const handleEditPost = () => {
      navigate(`/post/${post?.id}/edit`);
  };

const handleLeaveReview = () => {

  navigate(`/post/${post?.id}/review`);
}

  const handleDeletePost = async () => {
    if (!post || !window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const success = await deletePost(post?.id);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-10 px-4 flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">{error || "Post not found"}</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/")} className="cursor-pointer">Go Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOwner = currentUser?.id === post.user?.id;

  return (
    <div className="container mx-auto py-10 px-4 flex justify-center">
      <Card className="w-full max-w-4xl overflow-hidden">
        <CardHeader className="px-8 pt-8 pb-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                  {post.title}
                </h1>
              </div>
              
              {isOwner && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleEditPost}
                    variant="outline"
                    size="sm"
                    className="gap-2 cursor-pointer"
                  >
                    
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={handleDeletePost}
                    variant="destructive"
                    size="sm"
                    className="gap-2 cursor-pointer"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {post.user && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                  <AvatarImage src={post.user.profileImageUrl || ""} alt={post.user.firstName} />
                  <AvatarFallback className="text-sm bg-primary/10 text-primary font-semibold">
                    {post.user.firstName?.[0]}{post.user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {post.user.firstName} {post.user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">Post Author</p>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-8">
          <Carousel opts={{ loop: true }} className="w-full max-w-2xl mx-auto">
            <CarouselContent>
              {post.postImageUrls && post.postImageUrls.length > 0 ? (
                post.postImageUrls.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-accent/30 shadow-inner flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt={`${post.title} - Image ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-accent/30 shadow-inner">
                    <img
                      src="https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg"
                      alt="Post placeholder"
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {post.postImageUrls && post.postImageUrls.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Description</h3>
            <div className="p-4 rounded-xl bg-accent/30 border border-accent/50">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {post.description || "No description provided."}
              </p>
            </div>
          </div>

          {post.category && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Category</h3>
              <div className="inline-block px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                {post.category.name}
              </div>
            </div>
          )}

          

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Reviews {reviewsTotalCount > 0 && `(${reviewsTotalCount})`}
              </h3>
              <Button onClick={handleLeaveReview} size="sm" className="cursor-pointer">
                Leave a review
              </Button>
            </div>

            {isReviewsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
              </div>
            ) : reviews.length > 0 ? (
              <div className="flex flex-col space-y-4">
                <div className="space-y-3">
                  {reviews.map((review: ReviewResponse) => (
                    <div
                      key={review.id}
                      className="flex flex-col items-start w-full p-4 rounded-lg bg-accent/20 border border-accent/40 border-l-4 border-l-primary/60 gap-2 shadow-sm"
                    >
                      {/* Rating stars */}
                      {review.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-base ${i < review.rating! ? "text-yellow-400" : "text-muted-foreground/30"}`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{review.rating}/5</span>
                        </div>
                      )}

                      {/* Comment */}
                      <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>

                      {/* Images */}
                      {review.reviewImages && review.reviewImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {review.reviewImages.map((image: GetReviewImagesResponse, idx: number) => (
                            <img
                              key={idx}
                              src={image.url}
                              alt={`Review image ${idx + 1}`}
                              onClick={() => setLightboxUrl(image.url)}
                              className="h-24 w-24 object-cover rounded-lg border border-accent/50 cursor-zoom-in hover:opacity-90 hover:scale-105 transition-transform duration-200 shadow-sm"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {reviewsTotalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-2 pt-4 border-t border-accent/20">
                    <Button 
                      onClick={handlePaginationBackward} 
                      variant="ghost"
                      size="sm"
                      disabled={currentPage === 1}
                      className="cursor-pointer"
                    >
                      Previous
                    </Button>
                    <span className="text-xs font-medium text-muted-foreground bg-accent/20 px-3 py-1 rounded-full">
                      {currentPage} / {reviewsTotalPages}
                    </span>
                    <Button 
                      onClick={handlePaginationForward} 
                      variant="ghost"
                      size="sm"
                      disabled={currentPage >= reviewsTotalPages}
                      className="cursor-pointer"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center rounded-xl bg-accent/10 border border-dashed border-accent/30">
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </CardContent>
        
      </Card>

      {/* Lightbox overlay */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors cursor-pointer"
            aria-label="Close image"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightboxUrl}
            alt="Full size review image"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
