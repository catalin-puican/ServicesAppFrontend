import { Navigation } from "@/components/navigation/Navigation";
import { PostCard } from "@/components/posts/PostCard";
import { useUserContext } from "@/contexts/User/useUserContext";
import { Spinner } from "@/components/ui/spinner";
import { ServiceNavigation } from "@/components/navigation/ServiceNavigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

import { usePostContext } from "@/contexts/Post/usePostContext";

export const HomePage = () => {
    const { currentUser } = useUserContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const { posts, isLoading, error, fetchPaginatedPosts } = usePostContext();

    const currentPage = Number(searchParams.get("page")) || 1;
    const categoryId = searchParams.get("category") || undefined;

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
        const fetchPosts = async () => {
            await fetchPaginatedPosts("", currentPage, 10, categoryId);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        fetchPosts();
    }, [currentPage, categoryId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 py-6">
                
                <Navigation />
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {currentUser!.firstName} {currentUser!.lastName}! 
                    </h1>
                </div>
                <ServiceNavigation />
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-red-200">
                        <h2 className="text-xl font-semibold text-red-900 mb-2">Error loading posts</h2>
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts available</h2>
                        <p className="text-gray-600">Check back later for new service listings</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Services</h2>
                        <div className="flex flex-col gap-4">
                            {posts.map((post) => (
                                <PostCard post={post} key={post.id} />
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <Button 
                        onClick={handlePaginationBackward} 
                        variant="outline"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm">
                        Page {currentPage}
                    </span>
                    <Button 
                        onClick={handlePaginationForward} 
                        variant="default"
                        disabled={posts.length < 10}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
