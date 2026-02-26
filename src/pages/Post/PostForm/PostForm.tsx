import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { createPost, uploadPostImage } from "@/services/Posts/PostsService";
import { toast } from "sonner";
import { useUserContext } from "@/contexts/User/useUserContext";
import { usePostContext } from "@/contexts/Post/usePostContext";
import { type Post } from "@/schemas/Posts/PostSchema";
import { PostBasicInfoForm } from "./components/PostBasicInfoForm";
import { useNavigate } from "react-router-dom";

export type PostFormData = Post & {
    imageFiles?: File[];
    categoryId?: string;
    priceValue?: number; 
};

export const PostForm = () => {
    const { currentUser } = useUserContext();
    const { refreshPosts } = usePostContext();
    const navigate = useNavigate();
    
    const {
        register: registerField,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<PostFormData>({
        defaultValues: {
            id: "",
            title: "",
            categoryId: "",
            postImageUrls: [],
            description: "",
            prices: [],
            reviews: [],
            category: { id: "", name: "" },
            user: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                addressLine1: "",
                locality: "",
                state: "",
                postalCode: "",
                country: ""
            },
            priceValue: 0,
            imageFiles: []
        },
        mode: "onChange"
    });

    const onSubmit = async (data: PostFormData) => {
        if (!currentUser) {
            toast.error("You must be logged in to create a post");
            return;
        }

        try {
            let finalImageUrls = data.postImageUrls ?? [];

            if (data.imageFiles && data.imageFiles.length > 0) {
                const uploadPromises = data.imageFiles.map(file => uploadPostImage(file));
                const responses = await Promise.all(uploadPromises);
                finalImageUrls = [...finalImageUrls, ...responses.map(r => r.url)];
            }



            const success = await createPost({
                title: data.title,
                description: data.description,
                categoryId: data.categoryId!,
                imageUrls: finalImageUrls,
                userId: currentUser.id,
            });

            if (success) {
                toast.success("Post created successfully", {
                    position: "top-center",
                    duration: 1500,
                });
                await refreshPosts();
                navigate("/");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create post";
            toast.error(errorMessage, { position: "top-center", duration: 1500 });
        }
    };

    return (
        <Card className="p-4 border-gray-300 shadow-md">
            <PostBasicInfoForm 
                registerField={registerField}
                errors={errors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                setValue={setValue}
                watch={watch}
                isSubmitting={isSubmitting}
            />
        </Card>
    );
};
