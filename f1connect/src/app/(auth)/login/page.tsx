import Image from "next/image";
import RegisterForm from "@/components/registerForm/registerForm";
import LoginForm from "@/components/loginForm/loginForm";

export default function RegisterPage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <LoginForm />
    </div>
  );
}