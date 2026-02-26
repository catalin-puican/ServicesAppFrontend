import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../types";
import type { RegisterFormInputProps } from "./components/RegisterFormInput";

type AddressDetailsFormFieldProps = {
    registerField: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
}

export const AddressDetailsFormFields = ({registerField, errors}: AddressDetailsFormFieldProps): RegisterFormInputProps[] => [
    {
        type: "text",
        name: "addressLine1",
        label: "Address Line 1",
        placeholder: "123 Main St",
        registerField,
        registerFieldOptions: {
            required: "Address Line 1 is required",
            minLength: {
                value: 3,
                message: "Address Line 1 must be at least 3 characters long"
            }
        },
        errors
    },
    {
        type: "text",
        name: "addressLine2",
        label: "Address Line 2",
        placeholder: "Apt 123",
        registerField,
        registerFieldOptions: {
            minLength: {
                value: 3,
                message: "Address Line 2 must be at least 3 characters long"
            }
        },
        errors
    },
    {
        type: "text",
        name: "locality",
        label: "Locality",
        placeholder: "New York",
        registerField,
        registerFieldOptions: {
            required: "Locality is required",
            minLength: {
                value: 3,
                message: "Locality must be at least 3 characters long"
            }
        },
        errors
    },
    {
        type: "text",
        name: "state",
        label: "State",
        placeholder: "New York",
        registerField,
        registerFieldOptions: {
            required: "State is required",
            minLength: {
                value: 2,
                message: "State must be at least 2 characters long"
            },
            pattern: {
                value: /^[A-Za-z\d@$!%*?&]{2,}$/,
                message: "State must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
            }
        },
        errors
    },
    {
        type: "text",
        name: "postalCode",
        label: "Postal Code",
        placeholder: "12345",
        registerField,
        registerFieldOptions: {
            required: "Postal Code is required",
            minLength: {
                value: 3,
                message: "Postal Code must be at least 3 characters long"
            },
        },
        errors
    },
    {
        type: "text",
        name: "country",
        label: "Country",
        placeholder: "Country",
        registerField,
        registerFieldOptions: {
            required: "Country is required",
            minLength: {
                value: 3,
                message: "Country must be at least 3 characters long"
            }
        },
        errors
    }
];