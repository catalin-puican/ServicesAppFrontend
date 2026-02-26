import axiosInstance from "@/config/axiosConfig";
import { loginUserRequestSchema, type LoginUserRequest } from "@/schemas/Users/DTOs/LoginDTOSchema";
import { registerUserRequestSchema, type RegisterUserRequest } from "@/schemas/Users/DTOs/RegisterDTOSchema";
import { usersUpdateRequestSchema, type UsersUpdateRequest } from "@/schemas/Users/DTOs/UsersUpdateRequestSchema";
import { userSchema, type User } from "@/schemas/Users/UserSchema";
import { AxiosError } from "axios";
import { ZodError } from "zod";

const BASE_URL = "/Users";

export const login = async (request: LoginUserRequest): Promise<boolean> => {
    try 
    {
        const response = await axiosInstance.post(`${BASE_URL}/Login`, 
            loginUserRequestSchema.parse(request));
        return response.status === 200;
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
                throw new Error("Failed to login");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to login");
    }
};

export const register = async (request: RegisterUserRequest): Promise<boolean> => {
    try 
    {
        const response = await axiosInstance.post(`${BASE_URL}/Register`, 
            registerUserRequestSchema.parse(request));
        return response.status === 200;
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
                throw new Error("Failed to register");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to register");
    }
};

export const getCurrentUser = async (): Promise<User> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/me`);
        return userSchema.parse(response.data);
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
                throw new Error("Failed to get current user");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to get current user");
    }
};

export const getUserById = async (id: string): Promise<User> => {
    try
    {
        const response = await axiosInstance.get(`${BASE_URL}/user/${id}`);
        return userSchema.parse(response.data);
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
                throw new Error("Failed to get current user");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to get current user");
    }
};

export const logout = async (): Promise<boolean> => {
    try
    {
        await axiosInstance.post(`${BASE_URL}/logout`);
        return true;
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
                throw new Error("Failed to logout");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to logout");
    }
};

export const updateUser = async (request: UsersUpdateRequest): Promise<boolean> => {
    try
    {
        const response = await axiosInstance.put(`${BASE_URL}/update`, 
            usersUpdateRequestSchema.parse(request));
        return response.status === 202; 
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
                throw new Error("Failed to update user");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to update user");
    }
};

export const uploadProfilePhoto = async (file: File): Promise<boolean> => {
    try
    {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axiosInstance.put(`${BASE_URL}/upload-profile-image`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.status === 202; 
    }
    catch (error)
    {
        if (error instanceof AxiosError && error.response)
        {
            if(Array.isArray(error.response.data))
            {
                const firstError = error.response.data[0];
                if(firstError && firstError.description)
                {
                    throw new Error(firstError.description);
                }
                throw new Error("Failed to upload photo");
            }
            throw new Error(error.response.data);
        }
        throw new Error("Failed to upload photo");
    }
};