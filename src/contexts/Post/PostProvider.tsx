import { useEffect, useState, type FC } from "react";
import { PostContext, type PostContextType } from "./PostContext";
import { deletePost, queryPostsForHomepage } from "@/services/Posts/PostsService";
import type { Post } from "@/schemas/Posts/PostSchema";

type PostProviderProps = {
    children: React.ReactNode;
}

export const PostProvider: FC<PostProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);

    const fetchPosts = async () => {
        try
        {
            setIsLoading(true);
            setError(null);
            const data = await queryPostsForHomepage("", 1, 10);
            setPosts(data.posts);
            setPageCount(data.pageCount);
            setTotalCount(data.totalCount);
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch posts";
            setError(errorMessage);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const fetchPaginatedPosts = async (query: string, page: number, pageSize: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await queryPostsForHomepage(query, page, pageSize);
            setPosts(data.posts);
            setPageCount(data.pageCount);
            setTotalCount(data.totalCount);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch posts";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const deletePostById = async (id: string) => {
        try
        {
            setIsLoading(true);
            setError(null);
            await deletePost(id);
            setPosts(prev => prev.filter(post => post.id !== id));
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete post";
            setError(errorMessage);
        }
        finally
        {
            setIsLoading(false);
        }
    };

    const refreshPosts = async () => {
        await fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const value: PostContextType = {
        posts,
        pageCount,
        totalCount,
        currentPost,
        isLoading,
        error,
        setPosts: setPosts as any,
        setCurrentPost,
        refreshPosts,
        deletePostById,
        fetchPaginatedPosts,
    };
    
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};

