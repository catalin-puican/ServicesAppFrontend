import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { createReview, uploadReviewImage } from "@/services/Reviews/ReviewsService";
import { toast } from "sonner";
import { useUserContext } from "@/contexts/User/useUserContext";
import { useReviewContext } from "@/contexts/Review/useReveiwContext";
import { ReviewInfoForm } from "./components/ReviewInfoForm";
import { useNavigate, useParams } from "react-router-dom";

export type ReviewFormData = {
    id?: string;
    postId: string;
    rating: number;
    comment: string;
    userId?: string;
    imageFiles?: File[];
    imageUrls?: string[];
};

export const ReviewForm = () => {
    const { currentUser } = useUserContext();
    const { id: postId } = useParams();
    const { refreshReviews } = useReviewContext();
    const navigate = useNavigate();

    const {
        register: registerField,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<ReviewFormData>({
        defaultValues: {
            id: "",
            postId: postId || "",
            rating: 1,
            comment: "",
            userId: currentUser?.id || "",
            imageFiles: [],
            imageUrls: [],
        },
        mode: "onChange"
    });

    const onSubmit = async (data: ReviewFormData) => {
        if (!currentUser) {
            toast.error("You must be logged in to create a review");
            return;
        }

        if (!postId) {
            toast.error("Post not found");
            return;
        }

        try {
            if (data.imageFiles && data.imageFiles.length > 0) {
                const createdReview = await createReview({
                    userId: currentUser.id,
                    postId,
                    comment: data.comment,
                    rating: data.rating,
                });

                const uploadPromises = data.imageFiles.map(file => uploadReviewImage(file, createdReview.id));
                await Promise.all(uploadPromises);

                toast.success("Review created successfully", {
                    position: "top-center",
                    duration: 1500,
                });
                await refreshReviews();
                navigate(`/post/${postId}`);
                return;
            }

            await createReview({
                userId: currentUser.id,
                postId,
                comment: data.comment,
                rating: data.rating,
            });

            toast.success("Review created successfully", {
                position: "top-center",
                duration: 1500,
            });
            await refreshReviews();
            navigate(`/post/${postId}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create review";
            toast.error(errorMessage, { position: "top-center", duration: 1500 });
        }
    };

    return (
        <Card className="p-4 border-gray-300 shadow-md" onSubmit={handleSubmit(onSubmit)}>
            <ReviewInfoForm
                registerField={registerField}
                errors={errors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                setValue={setValue} 
                watch={watch}
                isSubmitting={isSubmitting}
            />
            <button onClick={() => console.log(watch())}>Log</button>
        </Card>
    );
};
