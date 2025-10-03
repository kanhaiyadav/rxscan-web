'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Utensils, Search, Plus, X, Info, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/SearchableSelect';

const DIETARY_RESTRICTION_OPTIONS = [
    // Beverages & Stimulants
    'Alcohol Avoidance',
    'Red Wine',
    'Beer',
    'Spirits/Liquor',
    'Caffeine',
    'Coffee',
    'Tea (Caffeinated)',
    'Green Tea',
    'Black Tea',
    'Energy Drinks',
    'Soft Drinks/Soda',
    'Diet Soda',
    'Tonic Water (Quinine)',
    'Kombucha',

    // Fruits & Juices
    'Grapefruit',
    'Grapefruit Juice',
    'Pomelo',
    'Seville Oranges',
    'Tangelos',
    'Citrus Fruits',
    'Orange Juice',
    'Cranberry Juice',
    'Pomegranate Juice',
    'Star Fruit (Carambola)',
    'Bananas',
    'Avocados',
    'Raisins',
    'Figs',
    'Dates',
    'Prunes',
    'Tomatoes',
    'Tomato Juice',

    // Vegetables
    'Green Leafy Vegetables',
    'Spinach',
    'Kale',
    'Collard Greens',
    'Swiss Chard',
    'Mustard Greens',
    'Turnip Greens',
    'Broccoli',
    'Brussels Sprouts',
    'Cabbage',
    'Asparagus',
    'Lettuce',
    'Parsley',
    'Watercress',
    'Seaweed',
    'Kelp',
    'Potatoes',
    'Sweet Potatoes',
    'Beets',
    'Carrots',
    'Celery',
    'Pickles',
    'Sauerkraut',
    'Kimchi',

    // Protein Sources - Meat & Poultry
    'Red Meat',
    'Beef',
    'Pork',
    'Lamb',
    'Veal',
    'Venison/Game Meats',
    'Organ Meats (Liver, Kidney)',
    'Processed Meats',
    'Bacon',
    'Sausage',
    'Hot Dogs',
    'Deli Meats',
    'Salami',
    'Pepperoni',
    'Smoked Meats',
    'Cured Meats',
    'Chicken',
    'Turkey',
    'Duck',

    // Seafood
    'Shellfish',
    'Shrimp',
    'Crab',
    'Lobster',
    'Oysters',
    'Clams',
    'Mussels',
    'Scallops',
    'Fish',
    'Tuna',
    'Salmon',
    'Mackerel',
    'Sardines',
    'Anchovies',
    'Herring',
    'Smoked Fish',
    'Dried Fish',
    'Fish Sauce',

    // Dairy Products
    'Dairy Products',
    'Milk',
    'Whole Milk',
    'Skim Milk',
    'Cheese',
    'Aged Cheeses',
    'Cheddar Cheese',
    'Swiss Cheese',
    'Parmesan Cheese',
    'Blue Cheese',
    'Brie',
    'Camembert',
    'Gouda',
    'Feta Cheese',
    'Cream Cheese',
    'Cottage Cheese',
    'Yogurt',
    'Greek Yogurt',
    'Sour Cream',
    'Butter',
    'Cream',
    'Heavy Cream',
    'Ice Cream',
    'Whey Protein',
    'Casein',

    // Soy & Legumes
    'Soy Products',
    'Soybeans',
    'Tofu',
    'Tempeh',
    'Edamame',
    'Soy Sauce',
    'Tamari',
    'Miso',
    'Soy Milk',
    'Beans',
    'Black Beans',
    'Kidney Beans',
    'Navy Beans',
    'Pinto Beans',
    'Chickpeas (Garbanzo Beans)',
    'Lentils',
    'Peas',
    'Peanuts',
    'Peanut Butter',

    // Nuts & Seeds
    'Nuts',
    'Tree Nuts',
    'Almonds',
    'Walnuts',
    'Cashews',
    'Pecans',
    'Hazelnuts',
    'Macadamia Nuts',
    'Brazil Nuts',
    'Pine Nuts',
    'Pistachios',
    'Nut Butters',
    'Almond Butter',
    'Seeds',
    'Sesame Seeds',
    'Sunflower Seeds',
    'Pumpkin Seeds',
    'Flax Seeds',
    'Chia Seeds',
    'Tahini',

    // Grains & Gluten
    'Gluten',
    'Wheat',
    'Bread',
    'Whole Wheat Bread',
    'White Bread',
    'Pasta',
    'Barley',
    'Rye',
    'Oats',
    'Cereals',
    'Crackers',
    'Baked Goods',
    'Rice',
    'Brown Rice',
    'White Rice',
    'Corn',
    'Quinoa',

    // Fermented & Aged Foods
    'Fermented Foods',
    'Pickled Foods',
    'Vinegar',
    'Yeast Extract',
    'Marmite',
    'Vegemite',
    'Soy Bean Paste',
    'Natto',

    // Tyramine-Rich Foods
    'Tyramine-rich Foods',
    'Aged/Fermented/Smoked Foods',
    'Overripe Fruits',
    'Dried Fruits',
    'Pickled Herring',
    'Chicken Liver',
    'Fava Beans',
    'Italian Broad Beans',
    'Snow Peas',

    // Sweets & Desserts
    'Chocolate',
    'Dark Chocolate',
    'Milk Chocolate',
    'Cocoa',
    'Sugar',
    'Added Sugars',
    'High-Sugar Foods',
    'Honey',
    'Maple Syrup',
    'Artificial Sweeteners',
    'Aspartame',
    'Sucralose',
    'Saccharin',
    'Stevia',
    'Candy',
    'Pastries',
    'Cookies',
    'Cake',

    // Fats & Oils
    'High-Fat Meals',
    'Fried Foods',
    'Fatty Foods',
    'Saturated Fats',
    'Trans Fats',
    'Vegetable Oils',
    'Coconut Oil',
    'Palm Oil',
    'Olive Oil',
    'Mayonnaise',
    'Salad Dressings',

    // High-Sodium Foods
    'High-Sodium Foods',
    'Salt',
    'Table Salt',
    'Salty Snacks',
    'Chips',
    'Pretzels',
    'Crackers (Salted)',
    'Canned Soups',
    'Instant Noodles',
    'Fast Food',
    'Frozen Meals',
    'Condiments',
    'Soy Sauce (High Sodium)',
    'Ketchup',
    'Mustard',
    'Worcestershire Sauce',
    'BBQ Sauce',
    'Teriyaki Sauce',
    'Bouillon Cubes',
    'Stock/Broth (High Sodium)',

    // High-Potassium Foods
    'High-Potassium Foods',
    'Potassium-Rich Foods',
    'Bananas (High Potassium)',
    'Oranges (High Potassium)',
    'Cantaloupe',
    'Honeydew Melon',
    'Apricots',
    'Potatoes (High Potassium)',
    'Sweet Potatoes (High Potassium)',
    'Spinach (High Potassium)',
    'Tomatoes (High Potassium)',
    'Lima Beans',
    'Salt Substitutes (Potassium-based)',

    // High-Phosphorus Foods
    'High-Phosphorus Foods',
    'Processed Foods (High Phosphorus)',
    'Cola/Dark Sodas',
    'Organ Meats (High Phosphorus)',
    'Whole Grains (High Phosphorus)',
    'Nuts (High Phosphorus)',
    'Seeds (High Phosphorus)',
    'Beans (High Phosphorus)',

    // High-Protein Foods
    'High-Protein Foods',
    'Protein Supplements',
    'Protein Shakes',
    'Protein Bars',

    // High-Fiber Foods
    'High-Fiber Foods',
    'Bran',
    'Fiber Supplements',
    'Psyllium Husk',

    // Vitamin K-Rich Foods
    'Vitamin K-Rich Foods',
    'Green Vegetables (Vitamin K)',
    'Liver (Vitamin K)',
    'Green Tea (Vitamin K)',

    // Supplements & Additives
    'Iron Supplements',
    'Calcium Supplements',
    'Multivitamins',
    'Herbal Supplements',
    'St. John\'s Wort',
    'Ginkgo Biloba',
    'Ginseng',
    'Garlic Supplements',
    'Fish Oil Supplements',
    'Vitamin E Supplements',
    'Vitamin D Supplements',
    'Magnesium Supplements',
    'Zinc Supplements',
    'Antacids',
    'Probiotics',
    'Digestive Enzymes',
    'Activated Charcoal',

    // Other Foods & Additives
    'Licorice',
    'Black Licorice',
    'MSG (Monosodium Glutamate)',
    'Food Dyes',
    'Preservatives',
    'Nitrates/Nitrites',
    'Sulfites',
    'Yeast',
    'Mold-Containing Foods',
    'Smoked Foods',
    'Charred/Grilled Foods',
    'Raw Foods',
    'Undercooked Foods',
    'Raw Eggs',
    'Raw Meat',
    'Raw Fish/Sushi',
    'Unpasteurized Products',
    'Unpasteurized Milk',
    'Unpasteurized Cheese',
    'Unpasteurized Juice',
    'Deli Salads',
    'Buffet Foods',
    'Leftovers (Older than 3 days)',

    // Meal Timing & Patterns
    'Large Meals',
    'Heavy Meals Before Bed',
    'Skipping Meals',
    'Fasting',
    'Eating Late at Night',

    // Specific Diets (that may conflict with medications)
    'Ketogenic Diet',
    'High-Protein Diet',
    'Low-Carb Diet',
    'Vegan Diet (for B12)',
    'Raw Food Diet',
    'Juice Cleanses',
    'Detox Diets',

    // Water & Hydration
    'Excessive Water Intake',
    'Fluid Restriction Required',
    'Mineral Water (High Sodium)',
    'Coconut Water',
    'Sports Drinks',
    'Electrolyte Drinks',

    // Miscellaneous
    'Spicy Foods',
    'Hot Peppers',
    'Acidic Foods',
    'Citric Acid',
    'Peppermint',
    'Spearmint',
    'Mint',
    'Garlic',
    'Onions',
    'Chewing Gum',
    'Hard Candy',
    'Cough Drops (Sugar-containing)',
];


export default function Step4() {
    const router = useRouter();
    const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectRestriction = (restriction: string) => {
        if (!selectedRestrictions.includes(restriction)) {
            setSelectedRestrictions([...selectedRestrictions, restriction]);
        }
        setShowDropdown(false);
    };

    const handleRemoveRestriction = (restriction: string) => {
        setSelectedRestrictions(selectedRestrictions.filter(item => item !== restriction));
    };


    const handleComplete = async () => {
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Save data and redirect
        router.push('/dashboard');
    };

    const handleSkip = () => {
        setSelectedRestrictions([]);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Search Input */}
            <SearchableSelect
                options={DIETARY_RESTRICTION_OPTIONS}
                label='Dietary Restriction'
                icon={<Search size={16} />}
                onValueChange={handleSelectRestriction}
                placeholder="Search or add your own restriction..."
                className='w-full'
            />

            {/* Selected Restrictions */}
            <div className="my-4">
                <h3 className="text-gray-900 font-semibold mb-1">Your Restrictions</h3>
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm min-h-32">
                    {selectedRestrictions.length > 0 ? (
                        <div className="flex flex-wrap gap-2.5">
                            {selectedRestrictions.map((restriction, index) => (
                                <div
                                    key={index}
                                    className="bg-orange-100 border border-orange-200 rounded-full px-4 py-2.5 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                >
                                    <span className="text-orange-800 font-medium">{restriction}</span>
                                    <button
                                        onClick={() => handleRemoveRestriction(restriction)}
                                        className="bg-orange-200 hover:bg-orange-300 rounded-full p-1 transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5 text-orange-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                <Utensils className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium text-center">No restrictions selected yet</p>
                            <p className="text-gray-400 text-sm text-center mt-1">Tap above to search and add restrictions</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-4">
                <h3 className="text-gray-900 font-semibold mb">Additional Health Notes</h3>
                <p className="text-gray-600 text-sm mb-1 leading-relaxed">
                    Include any other relevant health information (pregnancy, breastfeeding, recent surgeries, etc.)
                </p>
                <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g., Pregnant (3rd trimester), Recently had surgery, Taking supplements..."
                    rows={4}
                    className="w-full bg-white rounded-2xl border-2 border-gray-200 px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none shadow-sm resize-none"
                />
            </div>

            {/* Fixed Bottom Button */}
            {/* <div className="fixed bottom-0 left-0 right-0 px-6 py-6 bg-white border-t border-gray-100 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={handleComplete}
                        disabled={isLoading}
                        className={`w-full rounded-2xl py-4 flex items-center justify-center gap-2 text-white font-bold text-lg shadow-lg transition-all ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98]'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                <span>Saving Your Profile...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-6 h-6" />
                                <span>Complete Health Profile</span>
                            </>
                        )}
                    </button>
                </div>
            </div> */}
        </div >
    );
}