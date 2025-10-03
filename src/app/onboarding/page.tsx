'use client';

import React, { useState } from 'react';
import { ChevronLeft, Search, Plus, X, AlertCircle, Info, CheckCircle, Pill, Heart, UtensilsCrossed, Shield, Sparkles, ArrowRight } from 'lucide-react';

// Simulated data
const ALLERGY_OPTIONS = [
    'Penicillin', 'Sulfa Drugs (Sulfonamides)', 'Aspirin/NSAIDs', 'Cephalosporins',
    'Codeine', 'Morphine', 'Latex', 'Iodine', 'Tetracycline', 'Erythromycin'
];

const CONDITION_OPTIONS = [
    'Diabetes (Type 1)', 'Diabetes (Type 2)', 'Hypertension (High Blood Pressure)',
    'Asthma', 'Kidney Disease', 'Liver Disease', 'Glaucoma', 'Heart Disease'
];

const MEDICATION_OPTIONS = [
    'Metformin', 'Atorvastatin', 'Amlodipine', 'Omeprazole', 'Levothyroxine',
    'Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Ciprofloxacin'
];

const DIETARY_OPTIONS = [
    'Alcohol Avoidance', 'Grapefruit', 'Caffeine', 'Dairy Products',
    'High-fat meals', 'High-sodium foods', 'Tyramine-rich foods'
];

const RxScanOnboarding = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [allergies, setAllergies] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [medications, setMedications] = useState([]);
    const [dietary, setDietary] = useState([]);
    const [notes, setNotes] = useState('');
    const [searchTerms, setSearchTerms] = useState({ 1: '', 2: '', 3: '', 4: '' });

    const steps = [
        { number: 1, title: 'Drug Allergies', icon: Shield, color: 'emerald' },
        { number: 2, title: 'Medical Conditions', icon: Heart, color: 'blue' },
        { number: 3, title: 'Current Medications', icon: Pill, color: 'purple' },
        { number: 4, title: 'Dietary Restrictions', icon: UtensilsCrossed, color: 'orange' }
    ];

    const getFilteredOptions = (step) => {
        const search = searchTerms[step].toLowerCase();
        switch (step) {
            case 1: return ALLERGY_OPTIONS.filter(o => o.toLowerCase().includes(search) && !allergies.includes(o));
            case 2: return CONDITION_OPTIONS.filter(o => o.toLowerCase().includes(search) && !conditions.includes(o));
            case 3: return MEDICATION_OPTIONS.filter(o => o.toLowerCase().includes(search) && !medications.includes(o));
            case 4: return DIETARY_OPTIONS.filter(o => o.toLowerCase().includes(search) && !dietary.includes(o));
            default: return [];
        }
    };

    const addItem = (item, step) => {
        switch (step) {
            case 1: setAllergies([...allergies, item]); break;
            case 2: setConditions([...conditions, item]); break;
            case 3: setMedications([...medications, item]); break;
            case 4: setDietary([...dietary, item]); break;
        }
        setSearchTerms({ ...searchTerms, [step]: '' });
    };

    const removeItem = (item, step) => {
        switch (step) {
            case 1: setAllergies(allergies.filter(a => a !== item)); break;
            case 2: setConditions(conditions.filter(c => c !== item)); break;
            case 3: setMedications(medications.filter(m => m !== item)); break;
            case 4: setDietary(dietary.filter(d => d !== item)); break;
        }
    };

    const getCurrentItems = () => {
        switch (currentStep) {
            case 1: return allergies;
            case 2: return conditions;
            case 3: return medications;
            case 4: return dietary;
            default: return [];
        }
    };

    const StepIndicator = () => (
        <div className="relative">
            <div className="flex items-center justify-between mb-8">
                {steps.map((step, idx) => (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center flex-1">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.number
                                    ? `bg-${step.color}-500 text-white shadow-lg scale-110`
                                    : 'bg-gray-200 text-gray-400'
                                }`}>
                                {currentStep > step.number ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : (
                                    <step.icon className="w-6 h-6" />
                                )}
                            </div>
                            <div className={`mt-2 text-xs font-medium text-center transition-colors ${currentStep >= step.number ? `text-${step.color}-600` : 'text-gray-400'
                                }`}>
                                {step.title}
                            </div>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${currentStep > step.number ? `bg-${step.color}-500` : 'bg-gray-200'
                                }`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    const SearchBar = ({ placeholder }) => (
        <div className="relative group">
            <input
                type="text"
                value={searchTerms[currentStep]}
                onChange={(e) => setSearchTerms({ ...searchTerms, [currentStep]: e.target.value })}
                placeholder={placeholder}
                className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />

            {searchTerms[currentStep] && getFilteredOptions(currentStep).length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
                    {getFilteredOptions(currentStep).map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => addItem(option, currentStep)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                        >
                            <Plus className="w-4 h-4 text-emerald-500" />
                            <span className="text-gray-700">{option}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    const SelectedItems = ({ items, colorScheme }) => (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm min-h-[200px]">
            {items.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-2 px-4 py-2 bg-${colorScheme}-50 border border-${colorScheme}-200 rounded-full group hover:shadow-md transition-all`}
                        >
                            <span className={`text-${colorScheme}-700 font-medium text-sm`}>{item}</span>
                            <button
                                onClick={() => removeItem(item, currentStep)}
                                className={`p-1 rounded-full bg-${colorScheme}-100 hover:bg-${colorScheme}-200 transition-colors`}
                            >
                                <X className={`w-3 h-3 text-${colorScheme}-600`} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                    <Sparkles className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">No items added yet</p>
                    <p className="text-xs mt-1">Search above to get started</p>
                </div>
            )}
        </div>
    );

    const renderStepContent = () => {
        const stepConfig = {
            1: {
                icon: Shield,
                title: 'Drug Allergies',
                subtitle: 'Help us keep you safe by sharing your known allergies',
                placeholder: 'Search medications, foods, or substances...',
                items: allergies,
                color: 'emerald',
                infoText: 'Accurate allergy information helps prevent dangerous reactions'
            },
            2: {
                icon: Heart,
                title: 'Medical Conditions',
                subtitle: 'Share your health conditions for safer medication recommendations',
                placeholder: 'Search conditions like diabetes, asthma...',
                items: conditions,
                color: 'blue',
                infoText: 'Your medical history helps identify potential drug interactions'
            },
            3: {
                icon: Pill,
                title: 'Current Medications',
                subtitle: 'List medications you\'re currently taking',
                placeholder: 'Search your current medications...',
                items: medications,
                color: 'purple',
                infoText: 'We\'ll check for interactions with new prescriptions'
            },
            4: {
                icon: UtensilsCrossed,
                title: 'Dietary Restrictions',
                subtitle: 'Identify potential medication-food interactions',
                placeholder: 'Search dietary restrictions...',
                items: dietary,
                color: 'orange',
                infoText: 'Certain foods can affect how medications work'
            }
        };

        const config = stepConfig[currentStep];
        const Icon = config.icon;

        return (
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className={`p-4 bg-${config.color}-100 rounded-2xl`}>
                        <Icon className={`w-8 h-8 text-${config.color}-600`} />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h2>
                        <p className="text-gray-600 text-lg">{config.subtitle}</p>
                    </div>
                </div>

                <SearchBar placeholder={config.placeholder} />

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Your {config.title}</h3>
                        {config.items.length > 0 && (
                            <span className={`px-3 py-1 bg-${config.color}-100 text-${config.color}-700 rounded-full text-sm font-medium`}>
                                {config.items.length} selected
                            </span>
                        )}
                    </div>
                    <SelectedItems items={config.items} colorScheme={config.color} />
                </div>

                <div className={`bg-${config.color}-50 border border-${config.color}-200 rounded-xl p-4 flex items-start gap-3`}>
                    <Info className={`w-5 h-5 text-${config.color}-600 flex-shrink-0 mt-0.5`} />
                    <p className={`text-${config.color}-800 text-sm leading-relaxed`}>{config.infoText}</p>
                </div>

                {currentStep === 4 && (
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-900">Additional Health Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g., Pregnant, recently had surgery, taking supplements..."
                            rows={4}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none"
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentStep === 1}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-gray-900">RxScan</h1>
                        <p className="text-sm text-gray-600">Health Profile Setup</p>
                    </div>
                    <div className="w-10" />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Progress Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                    <StepIndicator />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Step {currentStep} of 4</p>
                            <p className="text-2xl font-bold text-gray-900">{currentStep * 25}% Complete</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Almost there!</p>
                            <p className="text-lg font-semibold text-emerald-600">{4 - currentStep} steps remaining</p>
                        </div>
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    {renderStepContent()}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex gap-4">
                    {currentStep < 4 ? (
                        <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                        >
                            <span>Continue</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button
                            onClick={() => alert('Profile Complete!')}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                            <CheckCircle className="w-5 h-5" />
                            <span>Complete Health Profile</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RxScanOnboarding;