import { useForm } from "react-hook-form";
import type { LoginUserRequest } from "@/schemas/Users/DTOs/LoginDTOSchema";
import { login } from "@/services/Users/UsersService";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/contexts/User/useUserContext";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "./types";

export const LoginForm = () => {
    const { refreshCurrentUser } = useUserContext();
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/register");
    };

    const {
        register: registerField,
        handleSubmit,
        formState: {},
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
            isPersistent: false,
        },
        mode: "onChange"
    })

    const onSubmit = async (data: LoginFormData) => {
        const loginUserRequest: LoginUserRequest = {
            email: data.email,
            password: data.password,
            isPersistent: data.isPersistent,
        }

        try
        {
            const success = await login(loginUserRequest);

            if(success)
            {
                await refreshCurrentUser();
               toast.success("User logged in successfully", {
                 position: "top-center",
                 duration: 1500,
               });
            }
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to log in user";
            toast.error(errorMessage,{position: "top-center", duration: 1500});
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
                <h1 className="text-2xl font-bold text-center mb-8">Login to your account</h1>
            
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
            <Input className=" mb-4"
                type="email"
                placeholder="Email" 
                {...registerField("email")}
            />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>                                           
            <Input className=" mb-4"
                type="password"
                placeholder="Password"
                {...registerField("password")}
            />
            </div>
            <div className="flex flex-col gap-2">
            <Button
                type="submit"
                className="w-full mt-4"
            >
                Login   
            </Button>
            
            </div>
                <label className="flex flex-col items-center p-2">Don't have an account? <Button type="button" variant="ghost" onClick={handleNavigation} className="text-blue-700 hover:text-blue-900">Register here</Button></label>
            
        </form>
    );
};