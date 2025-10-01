'use client';

import React, { useState } from 'react';
import { Mail, Lock, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        console.log('Sign in:', { email, password });
    };

    const handleGoogleSignIn = () => {
        console.log('Sign in with Google');
    };

    const handlePhoneSignIn = () => {
        console.log('Sign in with Phone');
    };

    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <h2 className="text-4xl text-gray-900 mb-2 font-heading">Welcome Back!</h2>
                    <p className="text-gray-600">Enter your credentials to access your account</p>
                </div>

                <div className="space-y-4">
                    <Input
                        id="email"
                        type="email"
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        icon={<Mail size={18} />}
                    />

                    <Input
                        id="password"
                        type="password"
                        label='Password'
                        icon={<Lock size={18} />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <button className="text-sm text-primary hover:text-primary/80">
                            Forgot password?
                        </button>
                    </div>

                    <Button onClick={handleSubmit} className="w-full">
                        Sign In
                    </Button>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleSignIn}
                            className="w-full"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handlePhoneSignIn}
                            className="w-full"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Phone
                        </Button>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={() => router.push('/signup')}
                        className="text-primary hover:underline hover:underline-offset-2 font-medium"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default SignInPage;