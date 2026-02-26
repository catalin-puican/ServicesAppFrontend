import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PersonalInfoForm } from "./components/components/PersonalInfoForm";
import { AddressInfoForm } from "./components/components/AddressInfoForm";
import { updateUser } from "@/services/Users/UsersService";
import { toast } from "sonner";
import { useUserContext } from "@/contexts/User/useUserContext";

export interface EditProfileFormData {
    firstName: string;
    lastName: string;
    description: string | null;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string | null;
    locality: string;
    state: string;
    postalCode: string;
    country: string;
}

export const EditProfileForm = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const { currentUser, refreshCurrentUser } = useUserContext();
    
    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        trigger
    } = useForm<EditProfileFormData>({
        defaultValues: {
            ...currentUser!,
        },
        mode: "onChange"
    });

    const handleNextStep = async () => {
        const isValid = await trigger([
            "firstName",
            "lastName",
            "description",
            "phoneNumber",
        ]);
        if (isValid) {
            setStep(2);
        }
    };

    const onSubmitAddressDetails = async (data: EditProfileFormData) => {
        if (!currentUser) return;

        try {
            const success = await updateUser({
                id: currentUser.id,
                ...data,
                description: data.description?.trim() === "" ? undefined : data.description,
                addressLine2: data.addressLine2?.trim() === "" ? undefined : data.addressLine2,
            });

            if (success) {
                await refreshCurrentUser();
                toast.success("Profile updated successfully", {
                    position: "top-center",
                    duration: 1500,
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
            toast.error(errorMessage, { position: "top-center", duration: 1500 });
        }
    };

    return (
        <Card className="p-4 border-gray-300 shadow-md">
            {step === 1 && 
                <PersonalInfoForm 
                    registerField={registerField}
                    errors={errors}
                    onNextStep={handleNextStep}
                />
            }
            {step === 2 && 
                <AddressInfoForm 
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