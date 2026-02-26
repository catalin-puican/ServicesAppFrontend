import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { EditProfileFormData } from "../../EditProfileForm";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

type PersonalInfoFormProps = {
    registerField: UseFormRegister<EditProfileFormData>;
    errors: FieldErrors<EditProfileFormData>;
    onNextStep: () => void;
}

export const PersonalInfoForm = ({ registerField, errors, onNextStep }: PersonalInfoFormProps) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/profile");
    };

    return (
        <form 
            onSubmit={(e) => { e.preventDefault(); onNextStep(); }} 
            className="flex flex-col gap-5 max-w-md mx-auto p-4"
        >
            <div>
                <h1 className="text-md font-bold">Personal Information</h1>
                <p>Fill in your personal details</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName">First Name</label>
                    <Input
                        id="firstName"
                        placeholder="First Name"
                        {...registerField("firstName")}
                    />
                    {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Last Name</label>
                    <Input
                        id="lastName"
                        placeholder="Last Name"
                        {...registerField("lastName")}
                    />
                    {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-2 ">
                <label htmlFor="description">Bio</label>
                <Textarea
                maxLength={250}
                className="h-30"
                    id="description"
                    placeholder="Tell us about yourself (max 250 characters)"
                    {...registerField("description")}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Input
                    id="phoneNumber"
                    placeholder="Phone Number"
                    {...registerField("phoneNumber")}
                />
                {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <Button variant="outline" type="button" onClick={handleBack} className="border-gray-300 cursor-pointer">
                    Back to Profile
                </Button>
                <Button type="submit" className="w-full cursor-pointer">Next Step</Button>
            </div>
        </form>
    );
};