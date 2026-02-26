import type { Review } from "@/schemas/Reviews/ReviewSchema";
import { createContext } from "react";

export type ReviewContextType = {
    reviews: Review[];
    isLoading: boolean;
    error: string | null;
    pageCount: number;
    totalCount: number;
    setReviews: (reviews: Review[]) => void;
    refreshReviews: () => Promise<void>;
    deleteReviewById: (id: string) => Promise<void>;
    fetchPaginatedReviews: (query: string, page: number, pageSize: number) => Promise<void>;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);
