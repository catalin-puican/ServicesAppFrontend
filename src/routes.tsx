import type { Route } from "./types";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { EditProfilePage } from "./pages/Profile/EditProfilePage";
import { AddPostPage } from "./pages/Post/AddPostPage";
import { PostPage } from "./pages/Post/PostPage";
import { TestPage } from "./pages/Test/TestPage";
import { EditPostForm } from "./pages/Post/PostForm/EditPostForm";
import { ReviewForm } from "./pages/Reviews/ReviewForm";

export const routes: Route[] = [
    { path: "/login", requiresUser: false, element: () => <LoginPage /> },
    { path: "/register", requiresUser: false, element: () => <RegisterPage /> },
    { path: "/", requiresUser: true, element: () => <HomePage /> },
    { path: "/profile/:id", requiresUser: true, element: () => <ProfilePage /> },
    { path: "/profile/:id/edit", requiresUser: true, element: () => <EditProfilePage /> },
    { path: "/post/add", requiresUser: true, element: () => <AddPostPage /> },
    { path: "/post/:id", requiresUser: true, element: () => <PostPage /> },
    { path: "/post/:id/edit", requiresUser: true, element: () => <EditPostForm /> },
    { path: "/test", requiresUser: true, element: () => <TestPage />},
    { path: "/post/:id/review", requiresUser: true, element: () => <ReviewForm />}
];