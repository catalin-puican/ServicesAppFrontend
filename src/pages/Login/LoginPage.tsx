import { Card } from "@/components/ui/card";
import { LoginForm } from "./LoginForm/LoginForm";

export const LoginPage = () => (
    <div className="w-full h-screen flex flex-col items-center justify-center py-10 px-4">
        <Card className="p-4 border-gray-300 shadow-md max-w-md w-full">
            <LoginForm />
        </Card>
    </div>
);
