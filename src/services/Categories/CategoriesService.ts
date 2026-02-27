import axiosInstance from "@/config/axiosConfig";
import { categorySchema, type Category } from "@/schemas/Categories/CategorySchema";
import { getCategoryResponseSchema, type GetCategoryResponse } from "@/schemas/Categories/Responses/GetCategoryResponse";
import { AxiosError } from "axios";
import { ZodError } from "zod";

const BASE_URL = "/Categories";

export const getAllCategories = async (): Promise<GetCategoryResponse[]> => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/all`);
        return response.data.map((category: any) => getCategoryResponseSchema.parse(category));
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch categories");
    }
};

export const getCategoryById = async (id: string): Promise<Category> => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/category/${id}`);
        return categorySchema.parse(response.data);
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(error);
        }
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error("Failed to fetch category");
    }
};
