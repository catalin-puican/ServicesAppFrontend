import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import type { EditProfileFormData } from "../../EditProfileForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AddressInfoFormProps = {
    registerField: UseFormRegister<EditProfileFormData>;
    errors: FieldErrors<EditProfileFormData>;
    handleSubmit: UseFormHandleSubmit<EditProfileFormData>;
    onBack: () => void;
    onSubmit: (data: EditProfileFormData) => Promise<void>;
}

export const AddressInfoForm = ({ registerField, errors, handleSubmit, onBack, onSubmit }: AddressInfoFormProps) => {
    const navigate = useNavigate();
    const handleBackToProfile = () => {
        navigate("/profile");
    };
    return (
    <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-5 max-w-md mx-auto p-4"
    >
        <div>
            <h1 className="text-md font-bold">Address Details</h1>
            <p>Fill in your address details</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
            <label htmlFor="addressLine1">Address Line 1</label>
            <Input
                id="addressLine1"
                placeholder="Address Line 1"
                {...registerField("addressLine1")}
            />
            {errors.addressLine1 && <span className="text-red-500 text-sm">{errors.addressLine1.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="addressLine2">Address Line 2</label>
            <Input
                id="addressLine2"
                placeholder="Address Line 2 (Optional)"
                {...registerField("addressLine2")}
            />
            {errors.addressLine2 && <span className="text-red-500 text-sm">{errors.addressLine2.message}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="locality">Locality</label>
                <Input
                    id="locality"
                    placeholder="Locality"
                    {...registerField("locality")}
                />
                {errors.locality && <span className="text-red-500 text-sm">{errors.locality.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="state">State</label>
                <Input
                    id="state"
                    placeholder="State"
                    {...registerField("state")}
                />
                {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="postalCode">Postal Code</label>
                <Input
                    id="postalCode"
                    placeholder="Postal Code"
                    {...registerField("postalCode")}
                />
                {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="country">Country</label>
                <Input
                    id="country"
                    placeholder="Country"
                    {...registerField("country")}
                />
                {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <Button variant="outline" type="button" onClick={onBack} className="border-gray-300 cursor-pointer">
                <div className="flex items-center gap-2">
                    <ArrowLeft />
                    <p>Back to Personal Info</p>
                </div>
            </Button>
            <Button type="submit" className="w-full cursor-pointer" onClick={handleBackToProfile}>Update Profile</Button>
        </div>
    </form>
    );
};