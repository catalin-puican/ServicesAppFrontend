import type { Post } from "@/schemas/Posts/PostSchema";
import { createContext } from "react";

export type PostContextType = {
    posts: Post[];
    currentPost: Post | null;
    isLoading: boolean;
    error: string | null;
    pageCount: number;
    totalCount: number;
    setPosts: (posts: Post[]) => void;
    setCurrentPost: (post: Post) => void;
    refreshPosts: () => Promise<void>;
    deletePostById: (id: string) => Promise<void>;
    fetchPaginatedPosts: (query: string, page: number, pageSize: number) => Promise<void>;
}

export const PostContext = createContext<PostContextType | null>(null);
