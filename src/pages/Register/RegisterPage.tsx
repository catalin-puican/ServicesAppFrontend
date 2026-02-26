import { RegisterForm } from "./components/RegisterForm/RegisterForm";

export const RegisterPage = () => (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4">
        <div className="flex flex-col gap-4 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center">Create your account</h1>
            <RegisterForm />
        </div>  
    </div>
);