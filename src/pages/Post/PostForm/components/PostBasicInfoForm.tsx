import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Loader2 } from "lucide-react";
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { PostFormData } from "../PostForm";
import { useNavigate } from "react-router-dom";
import { useRef  } from "react";

type PostBasicInfoFormProps = {
    registerField: UseFormRegister<PostFormData>;
    errors: FieldErrors<PostFormData>;
    handleSubmit: UseFormHandleSubmit<PostFormData>;
    onSubmit: (data: PostFormData) => Promise<void>;
    setValue: UseFormSetValue<PostFormData>;
    watch: UseFormWatch<PostFormData>;
    isSubmitting: boolean;
    submitLabel?: string;
    loadingLabel?: string;
}

export const PostBasicInfoForm = ({ registerField, errors, handleSubmit, onSubmit, setValue, watch, isSubmitting, submitLabel = "Create post", loadingLabel = "Creating..." }: PostBasicInfoFormProps) => {
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
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-5 max-w-md mx-auto p-4"
        >
            <div>
                <h1 className="text-md font-bold">Post Information</h1>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Post Image</label>
                <div className="flex flex-col gap-4">
                    

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
                {errors.postImageUrls?.[0] && (
                    <span className="text-red-500 text-sm">{errors.postImageUrls[0]?.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <Input
                    id="title"
                    placeholder="Enter post title"
                    {...registerField("title", { 
                        required: "Title is required",
                        minLength: { value: 5, message: "Title must be at least 5 characters" }
                    })}
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="categoryId">Category ID</label>
                <Input
                    id="categoryId"
                    placeholder="Enter category ID"
                    {...registerField("categoryId", { required: "Category is required" })}
                />
                {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                    id="description"
                    placeholder="Describe what you're offering"
                    className="min-h-[120px]"
                    {...registerField("description", { 
                        required: "Description is required",
                        minLength: { value: 10, message: "Description must be at least 10 characters" }
                    })}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>
            <div> 
                <label htmlFor="price">Price</label>
                <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    {...registerField("priceValue", { required: "Price is required" })}
                />
                {errors.priceValue && <span className="text-red-500 text-sm">{errors.priceValue.message}</span>}
            </div>

                <Button variant="outline" type="button" onClick={() => navigate("/")} className="border-gray-300 cursor-pointer" disabled={isSubmitting}>
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
    );
};
