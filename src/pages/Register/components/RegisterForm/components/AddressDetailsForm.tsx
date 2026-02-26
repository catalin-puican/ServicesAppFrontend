import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../types";
import { AddressDetailsFormFields } from "./addressDetailsFields";
import { RegisterFormInput } from "./components/RegisterFormInput";
import { ArrowLeft } from "lucide-react";

type AddressDetailsFormProps = {
    registerField: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    handleSubmit: UseFormHandleSubmit<RegisterFormData>;
    onBack: () => void;
    onSubmit: (data: RegisterFormData) => Promise<void>;
}

export const AddressDetailsForm = ({ registerField, errors, handleSubmit, onBack, onSubmit }: AddressDetailsFormProps) => (
    <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-5 max-w-md mx-auto p-4"
    >
        <div>
            <h1 className="text-md font-bold">Address Details</h1>
            <p>Fill in your address details</p>
        </div>

        <Separator />
        
        {AddressDetailsFormFields({registerField, errors}).map((field) => (
            <RegisterFormInput key={field.name} {...field} />
        ))}

        <div className="flex flex-col gap-2">
            <Button variant="outline" type="button" onClick={onBack} className="border-gray-300">
                <div className="flex items-center gap-2">
                    <ArrowLeft />
                    <p>Back to Account Details</p>
                </div>
            </Button>
            <Button type="submit" className="w-full">Register</Button>
        </div>
    </form>
);