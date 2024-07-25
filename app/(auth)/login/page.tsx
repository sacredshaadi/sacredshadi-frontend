import { Heart } from "lucide-react";
import AuthWraper from "./auth-parent";

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Heart className="mr-2 h-8 w-8" />
          Sacred Shaadi
        </div>
      </div>
      <AuthWraper />
    </div>
  );
}
