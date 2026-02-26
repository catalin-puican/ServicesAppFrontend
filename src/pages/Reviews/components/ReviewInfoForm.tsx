import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Loader2 } from "lucide-react";
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ReviewFormData } from "../ReviewForm";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

type ReviewInfoFormProps = {
    registerField: UseFormRegister<ReviewFormData>;
    errors: FieldErrors<ReviewFormData>;
    handleSubmit: UseFormHandleSubmit<ReviewFormData>;
    onSubmit: (data: ReviewFormData) => Promise<void>;
    setValue: UseFormSetValue<ReviewFormData>;
    watch: UseFormWatch<ReviewFormData>;
    isSubmitting: boolean;
    submitLabel?: string;
    loadingLabel?: string;
}

export const ReviewInfoForm = ({ registerField, errors, handleSubmit, onSubmit, setValue, watch, isSubmitting, submitLabel = "Create review", loadingLabel = "Creating..." }: ReviewInfoFormProps) => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageFiles = watch("imageFiles") || [];

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);
        setValue("imageFiles", [...imageFiles, ...newFiles]);

        if (event.target) {
            event.target.value = "";
        }
    };

    return (
        <div >
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 max-w-md mx-auto p-4"
        >
            <div>
                <h1 className="text-md font-bold">Review Information</h1>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Review Images</label>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleUploadClick}
                        className="flex-1 cursor-pointer"
                    >
                        <Camera className="mr-2 h-4 w-4" />
                        Upload Images
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden cursor-pointer"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <label htmlFor="rating">Rating</label>
                    <span className="text-xs text-muted-foreground font-medium">
                        {watch("rating") || 0}/5
                    </span>
                </div>
                <Input
                    id="rating"
                    type="number"
                    placeholder="Enter rating (1-5)"
                    min={1}
                    max={5}
                    {...registerField("rating", {
                        required: "Rating is required",
                        min: { value: 1, message: "Rating must be at least 1" },
                        max: { value: 5, message: "Rating must be at most 5" },
                        valueAsNumber: true,
                    })}
                />
                {errors.rating && <span className="text-red-500 text-sm">{errors.rating.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <label htmlFor="comment">Comment</label>
                    <span className={`text-xs ${watch("comment")?.length >= 250 ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
                        {watch("comment")?.length || 0}/250
                    </span>
                </div>
                <Textarea
                    id="comment"
                    placeholder="Write your review"
                    className="min-h-[120px]"
                    maxLength={250}
                    {...registerField("comment", {
                        required: "Comment is required",
                        minLength: { value: 10, message: "Comment must be at least 10 characters" },
                        maxLength: { value: 250, message: "Comment must not exceed 250 characters" },
                    })}
                />
                {errors.comment && <span className="text-red-500 text-sm">{errors.comment.message}</span>}
            </div>

            <Button variant="outline" type="button" onClick={() => navigate(-1)} className="border-gray-300 cursor-pointer" disabled={isSubmitting}>
                Cancel
            </Button>
            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {loadingLabel}
                    </>
                ) : (
                    submitLabel
                )}
            </Button>
        </form>
        </div>
    );
};
