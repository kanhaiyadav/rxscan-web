'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Bell,
    Camera,
    FileText,
    Clock,
    User,
    AlertTriangle,
    Pill,
    ChevronRight,
    CheckCircle,
    XCircle,
    RefreshCw,
    Check,
    SkipForward
} from 'lucide-react';

export default function MedicalDashboard() {
    const [stats, setStats] = useState({
        totalPrescriptions: 8,
        activeCount: 3,
        warnings: 2,
        meds: 12
    });

    const activePrescriptions = [
        {
            id: '1',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
            doctorName: 'Dr. Sarah Johnson',
            date: '2025-10-01',
            medicationCount: 3
        },
        {
            id: '2',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
            doctorName: 'City Medical Clinic',
            date: '2025-09-28',
            medicationCount: 2
        }
    ];

    const reminders = [
        {
            id: 2,
            medicine: 'Paracetamol',
            dosage: '650mg',
            time: '02:00 PM',
            status: 'pending',
            frequency: 'After Lunch',
            color: 'bg-blue-500',
            doctor: 'Dr. Sarah Johnson'
        },
        {
            id: 3,
            medicine: 'Metformin',
            dosage: '500mg',
            time: '08:00 PM',
            status: 'pending',
            frequency: 'After Dinner',
            color: 'bg-purple-500',
            doctor: 'Dr. Michael Chen'
        }
    ];

    const quickActions = [
        {
            id: 1,
            title: 'Scan Prescription',
            subtitle: 'Upload a new prescription',
            icon: Camera,
            color: 'bg-teal-500',
            route: '/scan'
        },
        {
            id: 2,
            title: 'View Prescriptions',
            subtitle: 'See all your prescriptions',
            icon: FileText,
            color: 'bg-blue-500',
            route: '/prescriptions'
        },
        {
            id: 3,
            title: 'Medicine Reminders',
            subtitle: 'Manage your reminders',
            icon: Clock,
            color: 'bg-purple-500',
            route: '/reminders'
        },
        {
            id: 4,
            title: 'Health Profile',
            subtitle: 'Update your information',
            icon: User,
            color: 'bg-green-500',
            route: '/profile'
        }
    ];

    const recentAlerts = [
        {
            id: 1,
            type: 'warning',
            title: 'Drug Interaction Alert',
            message: 'Avoid alcohol while taking this medication',
            time: '2 hours ago'
        },
        {
            id: 2,
            type: 'info',
            title: 'Prescription Scanned',
            message: 'New prescription successfully added',
            time: '1 day ago'
        }
    ];

    const getStatusConfig = (status) => {
        switch (status) {
            case 'taken':
                return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Taken' };
            case 'pending':
                return { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Pending' };
            case 'missed':
                return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Missed' };
            default:
                return { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-50', label: 'Unknown' };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-teal-400 to-teal-500 shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                            <p className="text-teal-50 mt-1">Let's keep you healthy today</p>
                        </div>
                        <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 shadow-md">
                            <Bell className="h-5 w-5 text-teal-600" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Health Stats */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Health Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-teal-100 p-4 rounded-full mb-3">
                                        <FileText className="h-8 w-8 text-teal-600" />
                                    </div>
                                    <div className="text-4xl font-bold text-slate-900">{stats.totalPrescriptions}</div>
                                    <div className="text-slate-500 text-sm mt-1">Prescriptions</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-blue-100 p-4 rounded-full mb-3">
                                        <Pill className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div className="text-4xl font-bold text-slate-900">{stats.meds}</div>
                                    <div className="text-slate-500 text-sm mt-1">Active Meds</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-orange-100 p-4 rounded-full mb-3">
                                        <AlertTriangle className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <div className="text-4xl font-bold text-slate-900">{stats.warnings}</div>
                                    <div className="text-slate-500 text-sm mt-1">Warnings</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Prescriptions and Reminders */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Active Prescriptions */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-slate-800">Active Prescriptions</h2>
                                <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                                    More <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {activePrescriptions.map((prescription) => (
                                    <Card key={prescription.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                                        <CardContent>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={prescription.image}
                                                    alt="Prescription"
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-slate-900">{prescription.doctorName}</h3>
                                                    <div className="flex gap-4 mt-1 text-sm text-slate-500">
                                                        <span>{prescription.date}</span>
                                                        <span>{prescription.medicationCount} Medications</span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-slate-400" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Upcoming Reminders */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-slate-800">Upcoming Reminders</h2>
                                <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                                    More <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {reminders.map((reminder) => {
                                    const statusConfig = getStatusConfig(reminder.status);
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <Card key={reminder.id} className="hover:shadow-lg transition-shadow">
                                            <CardContent>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-4 flex-1">
                                                        <div className={`${reminder.color} w-2 h-16 rounded-full`} />
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-slate-900">
                                                                {reminder.medicine} {reminder.dosage}
                                                            </h3>
                                                            <p className="text-sm text-slate-500 mt-1">
                                                                {reminder.frequency} • {reminder.doctor}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-slate-900">{reminder.time}</div>
                                                        <div className="flex items-center justify-end gap-1 mt-1">
                                                            <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                                                            <span className={`text-sm ${statusConfig.color}`}>
                                                                {statusConfig.label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {reminder.status === 'pending' && (
                                                    <div className="flex gap-3">
                                                        <Button variant="outline" className="flex-1" size="lg">
                                                            <SkipForward className="mr-2 h-4 w-4" />
                                                            Skip
                                                        </Button>
                                                        <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="lg">
                                                            <Check className="mr-2 h-4 w-4" />
                                                            Mark as Taken
                                                        </Button>
                                                    </div>
                                                )}

                                                {reminder.status === 'missed' && (
                                                    <div className="flex gap-3">
                                                        <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50" size="lg">
                                                            <RefreshCw className="mr-2 h-4 w-4" />
                                                            Reschedule
                                                        </Button>
                                                        <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="lg">
                                                            <Check className="mr-2 h-4 w-4" />
                                                            Take Now
                                                        </Button>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Quick Actions */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {quickActions.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <Card key={action.id} className="hover:shadow-lg transition-all cursor-pointer hover:scale-105">
                                            <CardContent>
                                                <div className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                                                    <Icon className="h-7 w-7 text-white" />
                                                </div>
                                                <h3 className="font-semibold text-slate-900 text-lg">{action.title}</h3>
                                                <p className="text-sm text-slate-500 mt-1">{action.subtitle}</p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Recent Alerts */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Recent Alerts</h2>
                            <div className="space-y-3">
                                {recentAlerts.map((alert) => (
                                    <Card key={alert.id} className={`border-l-4 ${alert.type === 'warning' ? 'border-l-orange-500' : 'border-l-blue-500'}`}>
                                        <CardContent>
                                            <div className="flex items-start gap-3">
                                                {alert.type === 'warning' ? (
                                                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                                                ) : (
                                                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-slate-900 text-sm">{alert.title}</h4>
                                                    <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                                                    <p className="text-xs text-slate-400 mt-2">{alert.time}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}