'use client'
import { signUpSchema } from '@/schemas/signUpSchema';
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock } from 'lucide-react';

function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });
  
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post('/api/sign-up', data);
      console.log(response);
      router.push("/dashboard");
    } catch (error) {
      console.error('Error during Sign Up, Try Again', error);
      setError("Error during sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6">
        <div className="relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white"></div>
          
          <div className="bg-black border border-zinc-800 rounded-lg shadow-2xl overflow-hidden p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-white tracking-tight">Create Account</h2>
              <p className="text-zinc-500 text-sm mt-2">Sign up to start your future adventure</p>
            </div>
            
            {error && (
              <div className="bg-zinc-900 border-l-4 border-white px-4 py-3 rounded mb-6 text-sm text-zinc-300">
                {error}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Username
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={16} className="text-zinc-600" />
                        </div>
                        <Input
                          {...field}
                          className="block w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 text-sm"
                          placeholder="johndoe"
                        />
                      </div>
                      <FormMessage className="text-white text-xs mt-1 opacity-80" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Email
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={16} className="text-zinc-600" />
                        </div>
                        <Input 
                          {...field} 
                          name="email"
                          className="block w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 text-sm"
                          placeholder="name@example.com"
                        />
                      </div>
                      <FormMessage className="text-white text-xs mt-1 opacity-80" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={16} className="text-zinc-600" />
                        </div>
                        <Input 
                          type="password" 
                          {...field} 
                          name="password"
                          className="block w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 text-sm"
                          placeholder="••••••••"
                        />
                      </div>
                      <FormMessage className="text-white text-xs mt-1 opacity-80" />
                    </FormItem>
                  )}
                />

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
                      Creating account...
                    </div>
                  ) : "Sign Up"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
              <p className="text-zinc-500 text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-white hover:text-zinc-300 font-medium transition-colors">
                  Sign in
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

export default SignUp