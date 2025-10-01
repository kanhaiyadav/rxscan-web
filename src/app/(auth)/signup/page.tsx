'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Lock, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const [step, setStep] = useState<'email' | 'otp' | 'details'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleEmailSubmit = () => {
        console.log('Email submitted:', email);
        setStep('otp');
    };

    const handleOtpSubmit = () => {
        console.log('OTP submitted:', otp);
        setStep('details');
    };

    const handleDetailsSubmit = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Sign up complete:', { email, name, password });
    };

    const handleGoogleSignUp = () => {
        console.log('Sign up with Google');
    };

    const handlePhoneSignUp = () => {
        console.log('Sign up with Phone');
    };

    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <h2 className="text-4xl font-heading text-gray-900 mb-2">Join Us Today!</h2>
                    <p className="text-gray-600">
                        {step === 'email' && 'Enter your email to get started'}
                        {step === 'otp' && 'Enter the verification code sent to your email'}
                        {step === 'details' && 'Complete your profile'}
                    </p>
                </div>

                {step === 'email' && (
                    <>
                        <div className="space-y-4">
                            <Input
                                id="signup-email"
                                type="email"
                                label='Email'
                                icon={<Mail size={18} />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                            />

                            <Button onClick={handleEmailSubmit} className="w-full">
                                Continue with Email
                            </Button>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleGoogleSignUp}
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
                                    onClick={handlePhoneSignUp}
                                    className="w-full"
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Phone
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {step === 'otp' && (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <Label className="text-gray-700">Verification Code</Label>
                            <div className="flex justify-center">
                                <InputOTP
                                    maxLength={6}
                                    value={otp}
                                    onChange={(value) => setOtp(value)}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={1} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Didn't receive the code?{' '}
                                <button type="button" className="text-primary hover:underline hover:underline-offset-2 font-medium">
                                    Resend
                                </button>
                            </p>
                        </div>

                        <Button onClick={handleOtpSubmit} className="w-full">
                            Verify Email
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep('email')}
                            className="w-full"
                        >
                            Back
                        </Button>
                    </div>
                )}

                {step === 'details' && (
                    <div className="space-y-4">
                        <Input
                            id="name"
                            type="text"
                            label='Full Name'
                            icon={<User size={18} />}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10"
                        />

                        <Input
                            id="new-password"
                            type="password"
                            label='Password'
                            icon={<Lock size={18} />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                        />

                        <Input
                            id="confirm-password"
                            type="password"
                            label='Confirm Password'
                            icon={<Lock size={18} />}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10"
                        />

                        <Button onClick={handleDetailsSubmit} className="w-full">
                            Create Account
                        </Button>
                    </div>
                )}

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => router.push('/signin')}
                        className="text-primary hover:underline hover:underline-offset-2 font-medium"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;