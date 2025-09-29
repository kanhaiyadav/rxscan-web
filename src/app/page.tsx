'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiClock, FiShield } from 'react-icons/fi';
import { MdOutlineQrCodeScanner, MdOutlineVerifiedUser } from 'react-icons/md';
import { RiMedicineBottleLine, RiAlarmWarningLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: React.ComponentType<any>; title: string; description: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            <Card className="h-full border-2 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function RxScanLanding() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <motion.section
                style={{ opacity, scale }}
                className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl mb-8 shadow-xl">
                            <MdOutlineQrCodeScanner className="text-white text-4xl" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                        RxScan
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-2xl md:text-3xl text-gray-700 mb-8 font-light"
                    >
                        Your AI-Powered Prescription Assistant
                    </motion.p>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Decode handwritten prescriptions instantly. Verify medications accurately.
                        Get real-time interaction alerts. Never miss a dose again.
                    </motion.p>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                            Get Started Free
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-6 rounded-xl">
                            Watch Demo
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Problem Statement */}
            <AnimatedSection>
                <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                                The Problem with Prescriptions
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Handwritten prescriptions are often illegible, leading to medication errors,
                                confusion, and potential health risks.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={FiAlertTriangle}
                                title="Hard to Read"
                                description="Doctors' handwriting can be nearly impossible to decipher, causing confusion at pharmacies."
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={RiAlarmWarningLine}
                                title="Medication Errors"
                                description="Misinterpreted prescriptions lead to wrong medications or incorrect dosages."
                                delay={0.2}
                            />
                            <FeatureCard
                                icon={FiClock}
                                title="Missed Doses"
                                description="Without proper tracking, patients often forget their medication schedule."
                                delay={0.3}
                            />
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Feature 1: OCR + NLP */}
            <AnimatedSection>
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
                                    <MdOutlineQrCodeScanner className="text-blue-600 mr-2" />
                                    <span className="text-blue-600 font-semibold">Smart Scanning</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                                    Prescription Parsing with AI
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Our advanced OCR technology combined with medical NLP accurately extracts medicine names,
                                    dosage instructions, frequency, and duration from even the most challenging handwriting.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Reads handwritten and digital prescriptions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Understands medical abbreviations like BD, TDS, SOS</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Extracts complete medication details in seconds</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-30" />
                                <img
                                    src="landing-page/1.png"
                                    alt="Prescription scanning"
                                    className="relative w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Feature 2: Medicine Verification */}
            <AnimatedSection>
                <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur-2xl opacity-30" />
                                <img
                                    src="/landing-page/3.png"
                                    alt="Medicine verification"
                                    className="relative w-full"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
                                    <MdOutlineVerifiedUser className="text-purple-600 mr-2" />
                                    <span className="text-purple-600 font-semibold">Verified & Safe</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                                    Real-Time Medicine Verification
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Cross-reference every medication against comprehensive drug databases to ensure accuracy,
                                    availability, and provide generic alternatives when available.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Confirms drug spelling and formulation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Suggests cost-effective generic alternatives</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Alerts on unusual dosage recommendations</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Feature 3: Dosage Assistance */}
            <AnimatedSection>
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
                                    <RiMedicineBottleLine className="text-green-600 mr-2" />
                                    <span className="text-green-600 font-semibold">Smart Guidance</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                                    Dosage & Usage Guidelines
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Get clear, easy-to-understand instructions for each medication including standard
                                    dosage ranges, timing, and whether to take before or after meals.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Standard dosage ranges for safe usage</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Detailed usage instructions and timing</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Warnings for abnormal dosage levels</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl blur-2xl opacity-30" />
                                <img
                                    src="/landing-page/2.png"
                                    alt="Dosage guidelines"
                                    className="relative w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Feature 4: Interaction Alerts */}
            <AnimatedSection>
                <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-3xl blur-2xl opacity-30" />
                                <img
                                    src="/landing-page/4.png"
                                    alt="Interaction alerts"
                                    className="relative w-full"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full mb-6">
                                    <FiShield className="text-red-600 mr-2" />
                                    <span className="text-red-600 font-semibold">Safety First</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                                    Interaction Alerts & Safety
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Stay safe with real-time alerts about potential food-drug and drug-drug interactions.
                                    Know what to avoid and when to consult your doctor.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Food-medicine interaction warnings</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Drug-drug conflict detection</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Lifestyle and dietary recommendations</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Feature 5: Reminders & Tracking */}
            <AnimatedSection>
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-6">
                                    <IoMdNotificationsOutline className="text-indigo-600 mr-2 text-xl" />
                                    <span className="text-indigo-600 font-semibold">Never Miss a Dose</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                                    Smart Reminders & Tracking
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Set intelligent medication reminders based on your prescription schedule.
                                    Track adherence and get notified about missed doses to stay on top of your health.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Customized reminders for each medication</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Adherence tracking and progress insights</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Before/after meal timing notifications</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-3xl blur-2xl opacity-30" />
                                <img
                                    src="/landing-page/3.png"
                                    alt="Medication reminders"
                                    className="relative w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection>
                <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Transform Your Healthcare Experience?
                        </h2>
                        <p className="text-xl mb-10 opacity-90">
                            Join thousands of users who trust RxScan for accurate prescription management.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                Start Free Trial
                            </Button>
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Footer */}
            <footer className="py-12 px-4 bg-gray-900 text-gray-300">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center mb-6">
                        <MdOutlineQrCodeScanner className="text-4xl text-blue-400 mr-3" />
                        <span className="text-2xl font-bold text-white">RxScan</span>
                    </div>
                    <p className="mb-6">Your trusted AI-powered prescription assistant</p>
                    <p className="text-sm text-gray-500">© 2025 RxScan. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}