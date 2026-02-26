import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../types";
import type { RegisterFormInputProps } from "./components/RegisterFormInput";

type AccountDetailsFormFieldsProps = {
    registerField: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    password: string;
}

export const AccountDetailsFormFields = ({registerField, errors, password}: AccountDetailsFormFieldsProps): RegisterFormInputProps[] => [
    {
        type: "text",
        name: "firstName",
        label: "First Name",
        placeholder: "John",
        registerField,
        registerFieldOptions: {
            required: "First name is required",
            minLength: {
                value: 3,
                message: "First name must be at least 3 characters long"
            }
        },
        errors
    },
    {
        type: "text",
        name: "lastName",
        label: "Last Name",
        placeholder: "Doe",
        registerField,
        registerFieldOptions: {
            required: "Last name is required",
            minLength: {
                value: 3,
                message: "Last name must be at least 3 characters long"
            }
        },
        errors
    },
    {
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "johndoe@email.com",
        registerField,
        registerFieldOptions: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        },
        errors
    },
    {
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "********",
        registerField,
        registerFieldOptions: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
            }
        },
        errors
    },
    {
        type: "password",
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "********",
        registerField,
        registerFieldOptions: {
            required: "Please confirm your password",
            validate: (value: string) => value === password || "Passwords do not match"
        },
        errors
    },
    {
        type: "text",
        name: "phoneNumber",
        label: "Phone Number",
        placeholder: "+1234567890",
        registerField,
        registerFieldOptions: {
            required: "Phone number is required",
            minLength: {
                value: 7,
                message: "Phone number must be at least 7 digits"
            },
            pattern: {
                value: /^\+?[1-9]\d{1,14}$/,
                message: "Invalid phone number"
            }
        },
        errors
    }
]

