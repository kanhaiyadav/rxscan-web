'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pill, Plus, X, Clock, Tablet, Trash2, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const MEDICATION_OPTIONS = [
    'Metformin', 'Atorvastatin', 'Amlodipine', 'Omeprazole', 'Levothyroxine',
    'Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Ciprofloxacin',
    'Losartan', 'Hydrochlorothiazide', 'Simvastatin', 'Clopidogrel', 'Insulin',
    'Salbutamol', 'Prednisolone', 'Warfarin', 'Digoxin', 'Furosemide'
];

const DOSAGE_OPTIONS = [
    '5mg', '10mg', '25mg', '50mg', '100mg', '250mg', '500mg', '1000mg',
    '1mg', '2mg', '5ml', '10ml', '1 tablet', '2 tablets'
];

const FREQUENCY_OPTIONS = [
    'Once a day', 'Twice a day', 'Three times a day', 'Four times a day',
    'Every 12 hours', 'Every 8 hours', 'Every 6 hours', 'As needed',
    'Before meals', 'After meals', 'At bedtime', 'Weekly', 'Monthly'
];

interface Medication {
    name: string;
    dosage: string;
    frequency: string;
}

export default function Step3() {
    const router = useRouter();
    const [medications, setMedications] = useState<Medication[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMed, setCurrentMed] = useState({ name: '', dosage: '', frequency: '' });
    const [searchText, setSearchText] = useState('');
    const [activeField, setActiveField] = useState<'name' | null>(null);

    const filteredMedications = MEDICATION_OPTIONS.filter(med =>
        med.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAddMedication = () => {
        if (currentMed.name.trim()) {
            setMedications([...medications, {
                name: currentMed.name.trim(),
                dosage: currentMed.dosage || 'Not specified',
                frequency: currentMed.frequency || 'Not specified'
            }]);
            setCurrentMed({ name: '', dosage: '', frequency: '' });
            setSearchText('');
            setShowModal(false);
        }
    };

    const handleRemoveMedication = (index: number) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    const handleSelectOption = (field: 'name', value: string) => {
        if (field === 'name') {
            setCurrentMed({ ...currentMed, name: value });
            setSearchText(value);
        }
        setActiveField(null);
    };

    const handleNext = () => {
        router.push('/onboarding/step4');
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Add Medication Button */}
            <button
                onClick={() => setShowModal(true)}
                className="w-full bg-white border-2 border-dashed border-emerald-300 hover:border-emerald-400 rounded-2xl py-8 flex flex-col items-center justify-center transition-all shadow-sm hover:shadow-md group"
            >
                <div className="w-16 h-16 bg-emerald-50 group-hover:bg-emerald-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                    <Plus className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-emerald-600 font-semibold text-lg">Add New Medication</h3>
                <p className="text-emerald-500 text-sm mt-1">Tap to add prescription details</p>
            </button>

            {/* Current Medications List */}
            <div className="my-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Current Medications</h3>
                {medications.length > 0 ? (
                    <div className="space-y-4">
                        {medications.map((med, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-3 duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 mr-3">
                                        <div className="flex items-center mb-3">
                                            <div className="w-3 h-3 bg-purple-400 rounded-full mr-2" />
                                            <h4 className="text-gray-900 font-bold text-lg">{med.name}</h4>
                                        </div>
                                        <div className="ml-5 space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <Tablet className="w-4 h-4 mr-2" />
                                                <span className="text-sm">
                                                    <span className="font-medium">Dosage:</span> {med.dosage}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="w-4 h-4 mr-2" />
                                                <span className="text-sm">
                                                    <span className="font-medium">Frequency:</span> {med.frequency}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveMedication(index)}
                                        className="w-9 h-9 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic text-center py-8 bg-white rounded-2xl border border-gray-200">
                        No medications added yet
                    </p>
                )}
            </div>

            {/* Add Medication Dialog */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="w-full max-w-lg max-h-[85vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-heading font-medium">Add Medication</DialogTitle>
                    </DialogHeader>

                    <div className="overflow-y-auto max-h-[calc(85vh-120px)] space-y-4 p-1 py-2">
                    {/* Medication Name */}
                    <div className="relative">
                        <Input
                            type="text"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setCurrentMed({ ...currentMed, name: e.target.value });
                            }}
                            label='Medication Name'
                            focusHandler={() => setActiveField('name')}
                            blurHandler={() => setTimeout(() => setActiveField(null), 200)}
                            className="w-full"
                        />
                    </div>

                    <Select
                        value={currentMed.dosage}
                        onValueChange={(value) => setCurrentMed({ ...currentMed, dosage: value })}
                    >
                        <SelectTrigger className="w-full" label='Dosage'>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {DOSAGE_OPTIONS.map((dosage, index) => (
                                <SelectItem key={index} value={dosage}>
                                    {dosage}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Frequency */}
                    <Select
                        value={currentMed.frequency}
                        onValueChange={(value) => setCurrentMed({ ...currentMed, frequency: value })}
                    >
                        <SelectTrigger className="w-full" label='Frequency'>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {FREQUENCY_OPTIONS.map((freq, index) => (
                                <SelectItem key={index} value={freq}>
                                    {freq}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={handleAddMedication}
                        disabled={!currentMed.name.trim()}
                        className="w-full"
                        size={'lg'}
                    >
                        Add Medication
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
        </div >
    );
}