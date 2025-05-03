"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Lock } from "lucide-react";

export default function SignInPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.log(err);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6">
        <div className="relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white"></div>
          
          <div className="bg-black border border-zinc-800 rounded-lg shadow-2xl overflow-hidden p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-white tracking-tight">Welcome back</h2>
              <p className="text-zinc-500 text-sm mt-2">Enter your credentials to continue</p>
            </div>
            
            {error && (
              <div className="bg-zinc-900 border-l-4 border-white px-4 py-3 rounded mb-6 text-sm text-zinc-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-zinc-600" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-zinc-600" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-medium rounded-md transition-colors duration-200 text-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
              <p className="text-zinc-500 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-white hover:text-zinc-300 font-medium transition-colors">
                  Create account
                </Link>
              </p>
            </div>
          </div>
          
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white"></div>
        </div>
      </div>
    </div>
  );
}