import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { getPostById, editPost, uploadPostImage } from "@/services/Posts/PostsService";
import { toast } from "sonner";
import { usePostContext } from "@/contexts/Post/usePostContext";
import { PostBasicInfoForm } from "./components/PostBasicInfoForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { type PostFormData } from "./PostForm";

export const EditPostForm = () => {
    const { id } = useParams();
    const { refreshPosts } = usePostContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const {
        register: registerField,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<PostFormData>({ mode: "onChange" });

    useEffect(() => {
        if (!id) {
            navigate("/");
            return;
        }

        const fetchPost = async () => {
            try {
                const post = await getPostById(id);
                reset({
                   ...post
                });
            } catch {
                toast.error("Failed to load post");
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate, reset]);

    const onSubmit = async (data: PostFormData) => {
        if (!id) return;

        try {
            let finalImageUrls = data.postImageUrls ?? [];

            if (data.imageFiles && data.imageFiles.length > 0) {
                const uploadPromises = data.imageFiles.map(file => uploadPostImage(file));
                const responses = await Promise.all(uploadPromises);
                finalImageUrls = [...finalImageUrls, ...responses.map(r => r.url)];
            }

            await editPost({
                id,
                title: data.title,
                description: data.description,
                imageUrls: finalImageUrls,
            });

            toast.success("Post updated successfully", { position: "top-center", duration: 1500 });
            await refreshPosts();
            navigate(`/post/${id}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update post";
            toast.error(errorMessage, { position: "top-center", duration: 1500 });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

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
                submitLabel="Save changes"
                loadingLabel="Saving..."
            />
        </Card>
    );
};
