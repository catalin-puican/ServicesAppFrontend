import { Input } from "@/components/ui/input";
import type { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../../types";

export type RegisterFormInputProps = {
    type: string;
    name: keyof RegisterFormData;
    label: string;
    placeholder: string;
    registerField: UseFormRegister<RegisterFormData>;
    registerFieldOptions: RegisterOptions<RegisterFormData, keyof RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
}

export const RegisterFormInput = ({type, name, label, placeholder, registerField, registerFieldOptions, errors}: RegisterFormInputProps) => (
    <div className="flex flex-col gap-3">   
        <div>
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                {...registerField(name, registerFieldOptions)}
            />
        </div>
        {errors[name] && (
            <p className="text-red-500 text-sm">
                {errors[name]?.message}
            </p>
        )}
    </div>
);