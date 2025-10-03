'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Search, Plus, X, AlertCircle, Info, ArrowRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SearchableSelect } from '@/components/ui/SearchableSelect';

const CONDITION_OPTIONS = [
    // Endocrine/Metabolic
    'Diabetes (Type 1)',
    'Diabetes (Type 2)',
    'Gestational Diabetes',
    'Prediabetes',
    'Hyperthyroidism',
    'Hypothyroidism',
    'Hashimoto\'s Thyroiditis',
    'Graves\' Disease',
    'Thyroid Nodules',
    'Thyroid Cancer',
    'Cushing\'s Syndrome',
    'Addison\'s Disease',
    'Metabolic Syndrome',
    'Obesity',
    'Hyperlipidemia (High Cholesterol)',
    'Hypertriglyceridemia',
    'Gout',
    'Hyperuricemia',
    'Polycystic Ovary Syndrome (PCOS)',
    'Pituitary Disorders',
    'Adrenal Insufficiency',
    'Growth Hormone Deficiency',
    'Acromegaly',
    'Hyperparathyroidism',
    'Hypoparathyroidism',
    'Vitamin D Deficiency',
    'Iron Deficiency',
    'Pernicious Anemia',

    // Cardiovascular
    'Hypertension (High Blood Pressure)',
    'Hypotension (Low Blood Pressure)',
    'Coronary Artery Disease',
    'Heart Disease',
    'Congestive Heart Failure',
    'Myocardial Infarction (Heart Attack History)',
    'Angina',
    'Arrhythmia',
    'Atrial Fibrillation',
    'Atrial Flutter',
    'Ventricular Tachycardia',
    'Bradycardia',
    'Heart Valve Disease',
    'Mitral Valve Prolapse',
    'Aortic Stenosis',
    'Cardiomyopathy',
    'Pericarditis',
    'Endocarditis',
    'Peripheral Artery Disease',
    'Deep Vein Thrombosis (DVT)',
    'Pulmonary Embolism',
    'Varicose Veins',
    'Raynaud\'s Disease',
    'Atherosclerosis',
    'Aneurysm',
    'Stroke History',
    'Transient Ischemic Attack (TIA)',
    'Carotid Artery Disease',

    // Respiratory
    'Asthma',
    'Chronic Obstructive Pulmonary Disease (COPD)',
    'Emphysema',
    'Chronic Bronchitis',
    'Bronchiectasis',
    'Pneumonia (Recurrent)',
    'Tuberculosis',
    'Pulmonary Fibrosis',
    'Interstitial Lung Disease',
    'Sarcoidosis',
    'Sleep Apnea',
    'Obstructive Sleep Apnea',
    'Pulmonary Hypertension',
    'Cystic Fibrosis',
    'Lung Cancer',
    'Pleural Effusion',
    'Pneumothorax',
    'Chronic Cough',
    'Allergic Rhinitis',
    'Sinusitis (Chronic)',

    // Gastrointestinal
    'Gastroesophageal Reflux Disease (GERD)',
    'Peptic Ulcer Disease',
    'Gastritis',
    'Helicobacter Pylori Infection',
    'Inflammatory Bowel Disease (IBD)',
    'Crohn\'s Disease',
    'Ulcerative Colitis',
    'Irritable Bowel Syndrome (IBS)',
    'Celiac Disease',
    'Diverticulosis',
    'Diverticulitis',
    'Hemorrhoids',
    'Anal Fissure',
    'Colorectal Cancer',
    'Esophageal Cancer',
    'Stomach Cancer',
    'Pancreatic Cancer',
    'Liver Cancer',
    'Hepatitis A',
    'Hepatitis B',
    'Hepatitis C',
    'Cirrhosis',
    'Fatty Liver Disease',
    'Non-Alcoholic Fatty Liver Disease (NAFLD)',
    'Alcoholic Liver Disease',
    'Pancreatitis (Acute)',
    'Pancreatitis (Chronic)',
    'Gallstones',
    'Cholecystitis',
    'Cholangitis',
    'Lactose Intolerance',
    'Malabsorption Syndrome',
    'Gastroparesis',
    'Hiatal Hernia',
    'Barrett\'s Esophagus',
    'Appendicitis (History)',

    // Renal/Urological
    'Chronic Kidney Disease',
    'Acute Kidney Injury',
    'End-Stage Renal Disease',
    'Kidney Stones',
    'Polycystic Kidney Disease',
    'Glomerulonephritis',
    'Nephrotic Syndrome',
    'Diabetic Nephropathy',
    'Urinary Tract Infection (Recurrent)',
    'Interstitial Cystitis',
    'Overactive Bladder',
    'Urinary Incontinence',
    'Benign Prostatic Hyperplasia (BPH)',
    'Prostate Cancer',
    'Bladder Cancer',
    'Kidney Cancer',
    'Pyelonephritis',
    'Hydronephrosis',

    // Neurological
    'Epilepsy/Seizure Disorder',
    'Migraine',
    'Tension Headache',
    'Cluster Headache',
    'Multiple Sclerosis',
    'Parkinson\'s Disease',
    'Alzheimer\'s Disease',
    'Dementia',
    'Vascular Dementia',
    'Huntington\'s Disease',
    'Amyotrophic Lateral Sclerosis (ALS)',
    'Peripheral Neuropathy',
    'Diabetic Neuropathy',
    'Carpal Tunnel Syndrome',
    'Sciatica',
    'Bell\'s Palsy',
    'Trigeminal Neuralgia',
    'Guillain-Barré Syndrome',
    'Myasthenia Gravis',
    'Restless Leg Syndrome',
    'Essential Tremor',
    'Cerebral Palsy',
    'Brain Tumor',
    'Meningitis (History)',
    'Encephalitis (History)',
    'Neuropathy',
    'Spinal Cord Injury',
    'Chiari Malformation',

    // Musculoskeletal
    'Osteoarthritis',
    'Rheumatoid Arthritis',
    'Psoriatic Arthritis',
    'Ankylosing Spondylitis',
    'Osteoporosis',
    'Osteopenia',
    'Fibromyalgia',
    'Chronic Fatigue Syndrome',
    'Lupus (Systemic Lupus Erythematosus)',
    'Scleroderma',
    'Sjögren\'s Syndrome',
    'Polymyalgia Rheumatica',
    'Temporal Arteritis',
    'Bursitis',
    'Tendonitis',
    'Rotator Cuff Tear',
    'Herniated Disc',
    'Spinal Stenosis',
    'Scoliosis',
    'Kyphosis',
    'Degenerative Disc Disease',
    'Bone Cancer',
    'Muscular Dystrophy',
    'Osteomyelitis',
    'Plantar Fasciitis',
    'Paget\'s Disease of Bone',
    'Chronic Back Pain',
    'Chronic Neck Pain',

    // Psychiatric/Mental Health
    'Depression',
    'Major Depressive Disorder',
    'Persistent Depressive Disorder (Dysthymia)',
    'Anxiety',
    'Generalized Anxiety Disorder',
    'Panic Disorder',
    'Social Anxiety Disorder',
    'Obsessive-Compulsive Disorder (OCD)',
    'Post-Traumatic Stress Disorder (PTSD)',
    'Bipolar Disorder',
    'Bipolar I Disorder',
    'Bipolar II Disorder',
    'Schizophrenia',
    'Schizoaffective Disorder',
    'Attention Deficit Hyperactivity Disorder (ADHD)',
    'Autism Spectrum Disorder',
    'Eating Disorders',
    'Anorexia Nervosa',
    'Bulimia Nervosa',
    'Binge Eating Disorder',
    'Substance Use Disorder',
    'Alcohol Use Disorder',
    'Borderline Personality Disorder',
    'Antisocial Personality Disorder',
    'Insomnia',
    'Narcolepsy',
    'Seasonal Affective Disorder',

    // Hematological
    'Anemia',
    'Iron Deficiency Anemia',
    'Sickle Cell Disease',
    'Thalassemia',
    'Hemophilia',
    'Von Willebrand Disease',
    'Thrombocytopenia',
    'Thrombocytosis',
    'Polycythemia Vera',
    'Leukemia',
    'Lymphoma',
    'Hodgkin Lymphoma',
    'Non-Hodgkin Lymphoma',
    'Multiple Myeloma',
    'Myelodysplastic Syndrome',
    'Aplastic Anemia',
    'Blood Clotting Disorders',
    'Factor V Leiden',
    'Protein C Deficiency',
    'Protein S Deficiency',
    'Antiphospholipid Syndrome',

    // Immunological/Infectious
    'HIV/AIDS',
    'Autoimmune Disease',
    'Mononucleosis',
    'Cytomegalovirus (CMV)',
    'Epstein-Barr Virus',
    'Lyme Disease',
    'Sepsis (History)',
    'Immunodeficiency',
    'Common Variable Immunodeficiency',

    // Dermatological
    'Eczema',
    'Atopic Dermatitis',
    'Psoriasis',
    'Rosacea',
    'Acne',
    'Seborrheic Dermatitis',
    'Contact Dermatitis',
    'Urticaria (Hives)',
    'Vitiligo',
    'Melanoma',
    'Basal Cell Carcinoma',
    'Squamous Cell Carcinoma',
    'Skin Cancer',
    'Shingles (Herpes Zoster)',
    'Herpes Simplex',
    'Cellulitis (Recurrent)',
    'Hidradenitis Suppurativa',
    'Alopecia',

    // Ophthalmological
    'Glaucoma',
    'Cataracts',
    'Macular Degeneration',
    'Diabetic Retinopathy',
    'Retinal Detachment',
    'Dry Eye Syndrome',
    'Uveitis',
    'Optic Neuritis',
    'Amblyopia',
    'Strabismus',
    'Keratoconus',

    // ENT (Ear, Nose, Throat)
    'Meniere\'s Disease',
    'Tinnitus',
    'Hearing Loss',
    'Vertigo',
    'Chronic Otitis Media',
    'Deviated Septum',
    'Nasal Polyps',
    'Laryngitis (Chronic)',
    'Vocal Cord Dysfunction',
    'Throat Cancer',

    // Reproductive/Gynecological
    'Endometriosis',
    'Uterine Fibroids',
    'Ovarian Cysts',
    'Cervical Cancer',
    'Ovarian Cancer',
    'Uterine Cancer',
    'Breast Cancer',
    'Menopause',
    'Premature Menopause',
    'Menstrual Disorders',
    'Amenorrhea',
    'Dysmenorrhea',
    'Premenstrual Syndrome (PMS)',
    'Premenstrual Dysphoric Disorder (PMDD)',
    'Pelvic Inflammatory Disease',
    'Infertility',
    'Erectile Dysfunction',
    'Testicular Cancer',
    'Pregnancy',
    'Breastfeeding',
    'Gestational Hypertension',
    'Preeclampsia',
    'Eclampsia',
    'Hyperemesis Gravidarum',

    // Oncological
    'Cancer (General)',
    'Cancer in Remission',
    'Cancer (Active Treatment)',
    'Chemotherapy (Current)',
    'Radiation Therapy (Current)',
    'Bone Marrow Transplant (History)',

    // Allergic/Immunological
    'Allergic Reactions',
    'Anaphylaxis (History)',
    'Food Allergies',
    'Drug Allergies',
    'Environmental Allergies',
    'Hay Fever',
    'Asthma (Allergic)',

    // Other Chronic Conditions
    'Chronic Pain Syndrome',
    'Complex Regional Pain Syndrome',
    'Chronic Fatigue',
    'Chronic Migraines',
    'Smoking (Current)',
    'Former Smoker',
    'Alcohol Dependency',
    'Malnutrition',
    'Organ Transplant Recipient',
    'Pacemaker',
    'Implantable Cardioverter Defibrillator (ICD)',
    'Prosthetic Heart Valve',
    'Dialysis (Current)',
    'Feeding Tube',
    'Tracheostomy',
    'Colostomy/Ileostomy',
    'Blood Transfusion (Recent)',
    'Surgery (Recent)',
    'Hospitalization (Recent)',
];


export default function Step2() {
    const router = useRouter();
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    const handleSelectCondition = (condition: string) => {
        if (!selectedConditions.includes(condition)) {
            setSelectedConditions([...selectedConditions, condition]);
        }
    };

    const handleRemoveCondition = (condition: string) => {
        setSelectedConditions(selectedConditions.filter(item => item !== condition));
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Search Input */}
            <SearchableSelect
                options={CONDITION_OPTIONS}
                label='Medical Condition'
                icon={<Search className="w-5 h-5" />}
                onValueChange={handleSelectCondition}
                className="w-full"
            />

            {/* Selected Conditions */}
            <div className="my-4">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">Your Medical Conditions</h3>
                    {selectedConditions.length > 0 && (
                        <span className="bg-primary/15 shadow-sm rounded-full px-3 py-1 text-primary text-sm font-medium">
                            {selectedConditions.length} selected
                        </span>
                    )}
                </div>

                {selectedConditions.length > 0 ? (
                    <div className="bg-white rounded-2xl p-4 border-[2px] border-black/70">
                        <div className="flex flex-wrap gap-2">
                            {selectedConditions.map((condition, index) => (
                                <div
                                    key={index}
                                    className="bg-primary/10 border border-primary rounded-full px-3 py-2 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                >
                                    <span className="text-primary font-medium text-sm">{condition}</span>
                                    <button
                                        onClick={() => handleRemoveCondition(condition)}
                                        className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-primary" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-6 border-[2px] border-black/70 text-center">
                        <Heart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-base">No medical conditions added yet</p>
                        <p className="text-gray-400 text-sm mt-1">Search above to add your current health conditions</p>
                    </div>
                )}
            </div>
        </div >
    );
}