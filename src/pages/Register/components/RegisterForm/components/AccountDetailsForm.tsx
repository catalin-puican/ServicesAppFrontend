import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../types";
import { RegisterFormInput } from "./components/RegisterFormInput";
import { AccountDetailsFormFields } from "./accountDetailsFields";
import { useNavigate } from "react-router-dom";


type AccountDetailsFormProps = {
    registerField: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    password: any;
    onNextStep: () => void;
}

export const AccountDetailsForm = ({ registerField, errors, password, onNextStep }: AccountDetailsFormProps) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/login");
    };
    return (
    <form 
        onSubmit={(e) => { e.preventDefault(); onNextStep(); }} 
        className="flex flex-col gap-5 max-w-md mx-auto p-4"
    >
        <div>
            <h1 className="text-md font-bold">Account Details</h1>
            <p>Fill in your account details</p>
        </div>

        <Separator />
        
        {AccountDetailsFormFields({registerField, errors, password}).map((field) => (
            <RegisterFormInput key={field.name} {...field} />
        ))}

        <Button type="submit" className="w-full">Next Step</Button>
        <label className="flex flex-col items-center mt-2">Already have an account? <Button variant="ghost" onClick={handleNavigation} className="text-blue-700 hover:text-blue-900">Login here</Button></label>
    </form>
    );
};