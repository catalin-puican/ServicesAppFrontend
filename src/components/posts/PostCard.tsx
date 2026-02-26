import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import type { Post } from "@/schemas/Posts/PostSchema";

type PostCardProps = {
    post: Post;
};


export const PostCard = ({ post }: PostCardProps) => {
    return (
        <Card className="">
            <div className="flex flex-row gap-4 p-4">
                <Link to={`/post/${post.id}`} className="cursor-pointer">

                    <img src={post.postImageUrls?.[0]} alt={post.title} className="w-48 h-32 object-cover rounded" />
                </Link>
                <div className="flex justify-between w-full">
                    <p className="font-semibold text-lg">{post.title}</p>
                    <div className="flex flex-col justify-between items-center">
                        <p className="font-bold">{post.category?.name}</p>
                        <p className="font-bold">{post.prices?.sort((a, b) => a.value - b.value).map(price => price.value).join(" - ")}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};