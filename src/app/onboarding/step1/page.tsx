'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Search, Plus, X, AlertCircle, Info, ArrowRight, CheckCircle } from 'lucide-react';
import { MdOutlineMedicalServices } from "react-icons/md";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/SearchableSelect';

// Comprehensive list of common medication and substance allergies
const ALLERGY_OPTIONS = [
    // Antibiotics - Penicillins
    'Penicillin',
    'Amoxicillin',
    'Ampicillin',
    'Augmentin',

    // Antibiotics - Cephalosporins
    'Cephalosporins',
    'Cephalexin',
    'Ceftriaxone',
    'Cefuroxime',

    // Antibiotics - Sulfonamides
    'Sulfa Drugs (Sulfonamides)',
    'Sulfamethoxazole',
    'Trimethoprim-Sulfamethoxazole (Bactrim)',

    // Antibiotics - Macrolides
    'Erythromycin',
    'Azithromycin (Z-Pack)',
    'Clarithromycin',

    // Antibiotics - Fluoroquinolones
    'Quinolones',
    'Ciprofloxacin',
    'Levofloxacin',
    'Moxifloxacin',

    // Antibiotics - Tetracyclines
    'Tetracycline',
    'Doxycycline',
    'Minocycline',

    // Antibiotics - Other
    'Vancomycin',
    'Clindamycin',
    'Metronidazole (Flagyl)',
    'Nitrofurantoin',

    // Pain Medications - NSAIDs
    'Aspirin',
    'Ibuprofen (Advil, Motrin)',
    'Naproxen (Aleve)',
    'Diclofenac',
    'Celecoxib (Celebrex)',
    'Indomethacin',
    'Ketorolac',

    // Pain Medications - Opioids
    'Codeine',
    'Morphine',
    'Hydrocodone',
    'Oxycodone',
    'Tramadol',
    'Fentanyl',
    'Hydromorphone',
    'Meperidine (Demerol)',

    // Pain Medications - Other
    'Acetaminophen (Tylenol)',

    // Anesthetics
    'Local Anesthetics',
    'Lidocaine',
    'Novocaine (Procaine)',
    'Benzocaine',
    'Bupivacaine',

    // Cardiovascular Medications - ACE Inhibitors
    'ACE Inhibitors',
    'Lisinopril',
    'Enalapril',
    'Ramipril',

    // Cardiovascular Medications - Beta-blockers
    'Beta-blockers',
    'Metoprolol',
    'Atenolol',
    'Propranolol',
    'Carvedilol',

    // Cardiovascular Medications - Other
    'Statins',
    'Atorvastatin (Lipitor)',
    'Simvastatin',
    'Warfarin (Coumadin)',
    'Heparin',
    'Digoxin',

    // Diabetes Medications
    'Metformin',
    'Insulin',
    'Glipizide',
    'Glyburide',

    // Anticonvulsants
    'Phenytoin (Dilantin)',
    'Carbamazepine',
    'Lamotrigine',
    'Gabapentin',

    // Psychiatric Medications
    'SSRIs',
    'Sertraline (Zoloft)',
    'Fluoxetine (Prozac)',
    'Lithium',
    'Valproic Acid',

    // Steroids
    'Prednisone',
    'Hydrocortisone',
    'Dexamethasone',
    'Methylprednisolone',

    // Chemotherapy/Immunosuppressants
    'Methotrexate',
    'Cyclosporine',
    'Tacrolimus',

    // Contrast Media & Diagnostic Agents
    'Contrast Dyes',
    'Iodine',
    'Gadolinium',

    // Vaccines & Biologics
    'Egg (in vaccines)',
    'Gelatin (in vaccines)',
    'Neomycin',

    // Other Medications
    'Allopurinol',
    'Proton Pump Inhibitors',
    'Omeprazole',
    'Antihistamines',
    'Diphenhydramine (Benadryl)',

    // Medical Supplies
    'Latex',
    'Adhesive Tape',
    'Chlorhexidine',
    'Povidone-Iodine (Betadine)',

    // Other Common Allergens
    'Bee Stings/Venom',
    'Formaldehyde',
    'Preservatives',
    'Dyes (Tartrazine/Yellow Dye)',
];

export default function Step1() {
    const router = useRouter();
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

    const handleSelectAllergy = (allergy: string) => {
        if (!selectedAllergies.includes(allergy)) {
            setSelectedAllergies([...selectedAllergies, allergy]);
        }
    };

    const handleRemoveAllergy = (allergy: string) => {
        setSelectedAllergies(selectedAllergies.filter(item => item !== allergy));
    };

    return (
        <>
            {/* Search Input */}
            <div className="relative mb-4 z-50">
                <SearchableSelect
                    options={ALLERGY_OPTIONS}
                    label='Medication name'
                    onValueChange={handleSelectAllergy}
                    icon={<Search className="w-5 h-5" />}
                    className="w-full"
                />
            </div>

            {/* Selected Allergies */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">Your Allergies</h3>
                    {selectedAllergies.length > 0 && (
                        <span className="bg-emerald-100 rounded-full px-3 py-1 text-emerald-700 text-sm font-medium">
                            {selectedAllergies.length} selected
                        </span>
                    )}
                </div>

                {selectedAllergies.length > 0 ? (
                    <div className="bg-white rounded-2xl p-4 border-[2px] border-black/70">
                        <div className="flex flex-wrap gap-2">
                            {selectedAllergies.map((allergy, index) => (
                                <div
                                    key={index}
                                    className="bg-red-50 border border-red-200 rounded-full px-4 py-3 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                >
                                    <AlertCircle className="w-4 h-4 text-red-600" />
                                    <span className="text-red-700 font-medium text-sm">{allergy}</span>
                                    <button
                                        onClick={() => handleRemoveAllergy(allergy)}
                                        className="hover:bg-red-200 rounded-full p-1 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-6 border-[2px] border-black/70 text-center">
                        <ShieldCheck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-base">No allergies added yet</p>
                        <p className="text-gray-400 text-sm mt-1">Search above to add your known allergies</p>
                    </div>
                )}
            </div>

        </>
    );
}