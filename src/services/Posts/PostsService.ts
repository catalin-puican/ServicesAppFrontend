import axiosInstance from "@/config/axiosConfig";
import { postSchema, type Post } from "@/schemas/Posts/PostSchema";
import { getPostsResponseSchema, type GetPostsResponse } from "@/schemas/Posts/Responses/GetPostsResponse";
import { queryPostsResponseSchema, type QueryPostsResponse } from "@/schemas/Posts/Responses/QueryPostResponse";
import { type CreatePostRequest } from "@/schemas/Posts/Requests/CreatePostsRequest";
import { type UpdatePostRequest } from "@/schemas/Posts/Requests/UpdatePostsRequest";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import type { QueryPostforHomepageResponse } from "@/schemas/Posts/Responses/QueryPostForHomepageResponse";

const BASE_URL = "/Posts";

export const getAllPosts = async (): Promise<GetPostsResponse[]> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/all`);
        return response.data.map((post: any) => postSchema.parse(post));
    }
    catch (error)
    {
        if (error instanceof ZodError)
    {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to fetch posts");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch posts");
    }
};

export const getPostById = async (id : string): Promise<GetPostsResponse> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/post/${id}`);
        return getPostsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to fetch post");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch post");
    }
};

export const deletePost = async (id: string): Promise<boolean> => {
    try
    {
        const response = await axiosInstance.delete(`${BASE_URL}/post/${id}`);
        return response.status === 202;
    }
    catch (error)
    {
        if (error instanceof AxiosError && error.response)
        {
            throw new Error(error.response.data);
        }
        throw new Error("Failed to delete post");
    }
};

export const createPost = async (post: CreatePostRequest): Promise<Post> => {
    try
    {
        const response = await axiosInstance.post(`${BASE_URL}/create`, post);
        return getPostsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to create post");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to create post");
    }
};

export const updatePost = async (post: UpdatePostRequest): Promise<Post> => {
    try
    {
        const response = await axiosInstance.put(`${BASE_URL}/update`, post);
        return postSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to update post");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to update post");
    }
};

export const editPost = async (post: UpdatePostRequest): Promise<GetPostsResponse> => {
    try
    {
        const response = await axiosInstance.put(`${BASE_URL}/update`, post);
        return getPostsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to update post");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to update post");
    }
};

export const queryPosts = async (query: string, page: number, pageSize: number , minPrice: number, maxPrice: number, categoryId?: string): Promise<QueryPostsResponse> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/query?query=${query}&page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageSize=${pageSize}${categoryId ? `&categoryId=${categoryId}` : ''}`);
        return queryPostsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to fetch posts");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch posts");
    }
};

export const queryPostsForHomepage = async (query: string, page: number, pageSize: number, categoryId?: string): Promise<QueryPostforHomepageResponse> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/query?query=${query}&page=${page}&pageSize=${pageSize}${categoryId ? `&categoryId=${categoryId}` : ''}`);
        return queryPostsResponseSchema.parse(response.data);
    }
    catch (error)
    {
        if (error instanceof ZodError)
        {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to fetch posts");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch posts");
    }
};


export const uploadPostImage = async (file: File, postId?: string): Promise<{ url: string }> => {
    try
    {
        const formData = new FormData();
        formData.append("image", file);
        if (postId) {
            formData.append("postId", postId);
        }

        const response = await axiosInstance.put(`/PostImages/upload`, 
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
        throw new Error("Failed to upload post image");
    }
};

