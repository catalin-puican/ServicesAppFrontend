import axiosInstance from "@/config/axiosConfig";
import { getReviewsResponseSchema, type GetReviewsResponse } from "@/schemas/Reviews/Responses/GetReviewsResponse";
import { queryReviewsResponseSchema, type QueryReviewsResponse } from "@/schemas/Reviews/Responses/QueryReviewsResponse";
import { type CreateReviewsRequest } from "@/schemas/Reviews/Requests/CreateReviewsRequest";
import { type UpdateReviewsRequest } from "@/schemas/Reviews/Requests/UpdateReviewsRequest";
import { AxiosError } from "axios";
import { ZodError } from "zod";

const BASE_URL = "/Reviews";

export const getAllReviews = async (): Promise<GetReviewsResponse[]> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/all`);
        return response.data.map((review: any) => getReviewsResponseSchema.parse(review));
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if (Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if (firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to fetch reviews");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch reviews");
    }
};

export const getReviewById = async (id: string): Promise<GetReviewsResponse> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/review/${id}`);
        return getReviewsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if (Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if (firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to fetch review");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch review");
    }
};

export const deleteReview = async (id: string): Promise<boolean> => {
    try
    {
        const response = await axiosInstance.delete(`${BASE_URL}/delete/${id}`);
        return response.status === 202;
    }
    catch (error)
    {
        if (error instanceof AxiosError && error.response)
        {
            throw new Error(error.response.data);
        }
        throw new Error("Failed to delete review");
    }
};

export const createReview = async (review: CreateReviewsRequest): Promise<GetReviewsResponse> => {
    try
    {
        const response = await axiosInstance.post(`${BASE_URL}/create`, review);
        return getReviewsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if (Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if (firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to create review");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to create review");
    }
};

export const editReview = async (review: UpdateReviewsRequest): Promise<GetReviewsResponse> => {
    try
    {
        const response = await axiosInstance.put(`${BASE_URL}/update`, review);
        return getReviewsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if (Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if (firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to update review");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to update review");
    }
};

export const queryReviews = async (query: string, postId: string, page: number, pageSize: number): Promise<QueryReviewsResponse> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/query?query=${query}&postId=${postId}&page=${page}&pageSize=${pageSize}`);
        return queryReviewsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if (Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if (firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to fetch reviews");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch reviews");
    }
};

export const uploadReviewImage = async (file: File, reviewId?: string): Promise<{ url: string }> => {
    try
    {
        const formData = new FormData();
        formData.append("image", file);
        if (reviewId) {
            formData.append("reviewId", reviewId);
        }

        const response = await axiosInstance.post(`/ReviewImages/upload`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    }
    catch (error)
    {
        if (error instanceof AxiosError && error.response)
        {
            throw new Error(error.response.data);
        }
        throw new Error("Failed to upload review image");
    }
};
