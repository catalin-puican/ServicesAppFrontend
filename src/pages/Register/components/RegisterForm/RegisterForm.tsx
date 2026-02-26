import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterFormData } from "./types";
import { AccountDetailsForm } from "./components/AccountDetailsForm";
import { AddressDetailsForm } from "./components/AddressDetailsForm";
import type { RegisterUserRequest } from "@/schemas/Users/DTOs/RegisterDTOSchema";
import { register } from "@/services/Users/UsersService";
import { toast } from "sonner";

export const RegisterForm = () => {
    const [step, setStep] = useState<1 | 2>(1);
    
    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        watch,
        trigger
    } = useForm<RegisterFormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            addressLine1: "",
            addressLine2: "",
            state: "",
            locality: "",
            postalCode: "",
            country: "",
        },
        mode: "onChange"
    })

    const password = watch("password");

    const handleNextStep = async () => {
        const isValid = await trigger([
            "firstName",
            "lastName",
            "email",
            "password",
            "confirmPassword",
            "phoneNumber",
        ]);
        if (isValid) {
            setStep(2);
        }
    };

    const onSubmitAddressDetails = async (data: RegisterFormData) => {
        const registerUserRequest: RegisterUserRequest = {
            ...data,
            addressLine2: data.addressLine2.trim() === "" ? undefined : data.addressLine2,
        }

        try
        {
            const success = await register(registerUserRequest);
            if(success)
            {
                toast.success("User registered successfully");
            }
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to register user";
            toast.error(errorMessage);
        }
    };

    return (
        
        <Card className="p-4 border-gray-300 shadow-md">
            {step === 1 && 
                <AccountDetailsForm 
                    registerField={registerField}
                    errors={errors}
                    password={password}
                    onNextStep={handleNextStep}
                />
            }
            {step === 2 && 
                <AddressDetailsForm 
                    registerField={registerField}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onBack={() => setStep(1)}
                    onSubmit={onSubmitAddressDetails}
                />
            }
            
        </Card>
    );
};