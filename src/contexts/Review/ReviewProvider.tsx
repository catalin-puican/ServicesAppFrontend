import { useEffect, useState, type FC } from "react";
import { ReviewContext, type ReviewContextType } from "./ReviewContext";
import { deleteReview, queryReviews } from "@/services/Reviews/ReviewsService";
import { type Review } from "@/schemas/Reviews/ReviewSchema";

type ReviewProviderProps = {
    children: React.ReactNode;
}

export const ReviewProvider: FC<ReviewProviderProps> = ({ children }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = async () => {
        try
        {
            setIsLoading(true);
            setError(null);
            const data = await queryReviews("", "", 1, 10);
            setReviews(data.reviews as any);
            setPageCount(data.pageCount);
            setTotalCount(data.totalCount);
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch reviews";
            setError(errorMessage);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const fetchPaginatedReviews = async (query: string, page: number, pageSize: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await queryReviews(query, "", page, pageSize);
            setReviews(data.reviews as any);
            setPageCount(data.pageCount);
            setTotalCount(data.totalCount);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch reviews";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteReviewById = async (id: string) => {
        try
        {
            setIsLoading(true);
            setError(null);
            await deleteReview(id);
            setReviews(prev => prev.filter(review => review.id !== id));
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete review";
            setError(errorMessage);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const refreshReviews = async () => {
        await fetchReviews();
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const value: ReviewContextType = {
        reviews,
        isLoading,
        error,
        pageCount,
        totalCount,
        setReviews: setReviews as any,
        refreshReviews,
        deleteReviewById,
        fetchPaginatedReviews,
    };

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    );
};
