import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaPlus, FaTrash, FaRobot, FaAppleAlt, FaClock, FaBrain, FaCalendar } from 'react-icons/fa';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import type { AthleteData } from './AthleteDashboard';

interface NutritionProps {
  athleteData: AthleteData;
}

interface MealEntry {
  id?: string;
  userId: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
  timestamp: Date;
  mealType: string;
}

interface DailyMealPlan {
  breakfast: {
    time: string;
    suggestions: string[];
    macros: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
  };
  lunch: {
    time: string;
    suggestions: string[];
    macros: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
  };
  dinner: {
    time: string;
    suggestions: string[];
    macros: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
  };
}

interface WeeklyMealPlan {
  [day: string]: DailyMealPlan;
}

const weeklyMealPlan: WeeklyMealPlan = {
  Monday: {
    breakfast: {
      time: '7:00 AM',
      suggestions: ['Oatmeal with fruit', 'Greek yogurt with granola'],
      macros: { calories: 400, protein: 20, carbs: 50, fats: 10 }
    },
    lunch: {
      time: '12:00 PM',
      suggestions: ['Grilled chicken salad', 'Quinoa bowl'],
      macros: { calories: 500, protein: 30, carbs: 40, fats: 15 }
    },
    dinner: {
      time: '7:00 PM',
      suggestions: ['Baked salmon with veggies', 'Brown rice with tofu'],
      macros: { calories: 600, protein: 35, carbs: 45, fats: 20 }
    }
  },
  Tuesday: {
    breakfast: {
      time: '7:00 AM',
      suggestions: ['Scrambled eggs with toast', 'Smoothie with protein powder'],
      macros: { calories: 450, protein: 25, carbs: 40, fats: 15 }
    },
    lunch: {
      time: '12:00 PM',
      suggestions: ['Turkey wrap with avocado', 'Mixed greens salad'],
      macros: { calories: 550, protein: 35, carbs: 45, fats: 20 }
    },
    dinner: {
      time: '7:00 PM',
      suggestions: ['Grilled chicken with sweet potato', 'Steamed broccoli'],
      macros: { calories: 650, protein: 40, carbs: 50, fats: 25 }
    }
  },
  Wednesday: {
    breakfast: {
      time: '7:00 AM',
      suggestions: ['Pancakes with honey', 'Fresh fruit bowl'],
      macros: { calories: 500, protein: 15, carbs: 70, fats: 10 }
    },
    lunch: {
      time: '12:00 PM',
      suggestions: ['Pasta with marinara sauce', 'Garlic bread'],
      macros: { calories: 600, protein: 20, carbs: 80, fats: 15 }
    },
    dinner: {
      time: '7:00 PM',
      suggestions: ['Beef stir-fry with rice', 'Steamed vegetables'],
      macros: { calories: 700, protein: 40, carbs: 60, fats: 25 }
    }
  },
  Thursday: {
    breakfast: {
      time: '7:00 AM',
      suggestions: ['Avocado toast', 'Orange juice'],
      macros: { calories: 450, protein: 10, carbs: 60, fats: 20 }
    },
    lunch: {
      time: '12:00 PM',
      suggestions: ['Chicken Caesar wrap', 'Side salad'],
      macros: { calories: 550, protein: 30, carbs: 40, fats: 25 }
    },
    dinner: {
      time: '7:00 PM',
      suggestions: ['Grilled fish with quinoa', 'Roasted asparagus'],
      macros: { calories: 600, protein: 35, carbs: 50, fats: 20 }
    }
  },
  Friday: {
    breakfast: {
      time: '7:00 AM',
      suggestions: ['Smoothie bowl with granola', 'Green tea'],
      macros: { calories: 400, protein: 15, carbs: 50, fats: 10 }
    },
    lunch: {
      time: '12:00 PM',
      suggestions: ['Vegetable stir-fry with tofu', 'Brown rice'],
      macros: { calories: 500, protein: 20, carbs: 60, fats: 15 }
    },
    dinner: {
      time: '7:00 PM',
      suggestions: ['Pizza with whole wheat crust', 'Side salad'],
      macros: { calories: 700, protein: 25, carbs: 80, fats: 30 }
    }
  },
  Saturday: {
    breakfast: {
      time: '7:00 AM',
      suggestions: ['French toast with syrup', 'Fresh berries'],
      macros: { calories: 500, protein: 15, carbs: 70, fats: 15 }
    },
    lunch: {
      time: '12:00 PM',
      suggestions: ['Burger with sweet potato fries', 'Coleslaw'],
      macros: { calories: 800, protein: 35, carbs: 90, fats: 35 }
    },
    dinner: {
      time: '7:00 PM',
      suggestions: ['Grilled steak with mashed potatoes', 'Steamed green beans'],
      macros: { calories: 900, protein: 50, carbs: 60, fats: 40 }
    }
  },
  Sunday: {
    breakfast: {
      time: '7:00 AM',
      suggestions: ['Pancakes with maple syrup', 'Bacon'],
      macros: { calories: 600, protein: 20, carbs: 80, fats: 25 }
    },
    lunch: {
      time: '12:00 PM',
      suggestions: ['Roast chicken with vegetables', 'Mashed potatoes'],
      macros: { calories: 700, protein: 40, carbs: 50, fats: 30 }
    },
    dinner: {
      time: '7:00 PM',
      suggestions: ['Vegetable lasagna', 'Garlic bread'],
      macros: { calories: 600, protein: 25, carbs: 70, fats: 20 }
    }
  }
};

const Nutrition = ({ athleteData }: NutritionProps) => {
  const [showMealForm, setShowMealForm] = useState(true);
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [newMeal, setNewMeal] = useState<Omit<MealEntry, 'id' | 'userId' | 'timestamp'>>({
    foodName: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    date: new Date().toISOString().split('T')[0],
    mealType: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPlanAndInsights, setShowPlanAndInsights] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: name === 'foodName' || name === 'mealType' || name === 'date' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('No user logged in');

      const mealData: MealEntry = {
        ...newMeal,
        userId,
        timestamp: new Date()
      };

      await addDoc(collection(db, 'meals'), mealData);

      // Fetch the updated meals list
      const mealsQuery = query(
        collection(db, 'meals'),
        where('userId', '==', userId),
        where('date', '==', newMeal.date)
      );

      const querySnapshot = await getDocs(mealsQuery);
      const mealDataFetched = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate()
        } as MealEntry;
      });

      setMeals(mealDataFetched.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

      // Reset the form
      setNewMeal({
        foodName: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        date: new Date().toISOString().split('T')[0],
        mealType: ''
      });

      // Show the entered data and AI plan/insights
      setShowPlanAndInsights(true);
    } catch (error) {
      console.error('Error adding meal:', error);
      setError('Failed to add meal');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (mealId: string) => {
    try {
      await deleteDoc(doc(db, 'meals', mealId));

      // Fetch the updated meals list
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const mealsQuery = query(
        collection(db, 'meals'),
        where('userId', '==', userId),
        where('date', '==', newMeal.date)
      );

      const querySnapshot = await getDocs(mealsQuery);
      const mealData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate()
        } as MealEntry;
      });

      setMeals(mealData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    } catch (error) {
      console.error('Error deleting meal:', error);
      setError('Failed to delete meal');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nutrition Tracker</h1>
          <p className="text-gray-400">
            Track and optimize your nutrition for peak performance
          </p>
        </div>
      </div>

      {/* Meal Entry Form */}
      <AnimatePresence>
        {showMealForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaUtensils className="text-primary text-2xl" />
              <h2 className="text-xl font-semibold">Add New Meal</h2>
            </div>

            {error && (
              <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Food Name
                  </label>
                  <input
                    type="text"
                    name="foodName"
                    value={newMeal.foodName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 rounded-lg p-3 focus:ring-2 focus:ring-primary"
                    placeholder="Enter food name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Meal Type
                  </label>
                  <select
                    name="mealType"
                    value={newMeal.mealType}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/5 rounded-lg p-3 focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Meal Type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={newMeal.calories}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full bg-white/5 rounded-lg p-3 focus:ring-2 focus:ring-primary"
                    placeholder="kcal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    name="protein"
                    value={newMeal.protein}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full bg-white/5 rounded-lg p-3 focus:ring-2 focus:ring-primary"
                    placeholder="g"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    name="carbs"
                    value={newMeal.carbs}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full bg-white/5 rounded-lg p-3 focus:ring-2 focus:ring-primary"
                    placeholder="g"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    name="fats"
                    value={newMeal.fats}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full bg-white/5 rounded-lg p-3 focus:ring-2 focus:ring-primary"
                    placeholder="g"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newMeal.date}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 rounded-lg p-3 focus:ring-2 focus:ring-primary"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`w-full bg-primary hover:bg-secondary text-white p-3 rounded-lg 
                  transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Adding...' : 'Add Meal'}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meal History */}
      {meals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaUtensils className="text-primary text-2xl" />
              <h2 className="text-xl font-semibold">Today's Meals</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMealForm(true)}
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlus className="inline-block mr-2" />
              Add New Meal
            </motion.button>
          </div>

          <div className="space-y-4">
            {meals.map((meal) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{meal.foodName}</h3>
                    <p className="text-sm text-gray-400">
                      {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)} • {meal.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold">{meal.calories} kcal</p>
                      <p className="text-sm text-gray-400">
                        P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => meal.id && handleDelete(meal.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Weekly Nutrition Plan */}
      {showPlanAndInsights && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/10 p-8 rounded-xl"
  >
    <div className="flex items-center gap-3 mb-8">
      <FaCalendar className="text-primary text-3xl" />
      <h2 className="text-2xl font-bold">Weekly Nutrition Plan</h2>
    </div>

    <div className="space-y-8">
      {Object.entries(weeklyMealPlan).map(([day, plan]) => (
        <div key={day} className="bg-white/5 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-xl mb-6 text-primary border-b border-white/10 pb-4">{day}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(plan).map(([mealType, meal]) => (
              <div key={mealType} className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  {mealType === 'breakfast' && <FaAppleAlt className="text-yellow-500 text-2xl" />}
                  {mealType === 'lunch' && <FaUtensils className="text-green-500 text-2xl" />}
                  {mealType === 'dinner' && <FaClock className="text-blue-500 text-2xl" />}
                  <h4 className="text-lg font-semibold text-gray-200">
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)} • {meal.time}
                  </h4>
                </div>

                <ul className="space-y-2 mb-4">
                  {meal.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-primary">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>

                <div className="text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Calories:</span>
                    <span>{meal.macros.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Protein:</span>
                    <span>{meal.macros.protein}g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Carbs:</span>
                    <span>{meal.macros.carbs}g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Fats:</span>
                    <span>{meal.macros.fats}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
)}

      {/* AI Nutrition Insights */}
      {showPlanAndInsights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaRobot className="text-primary text-2xl" />
            <h2 className="text-xl font-semibold">AI Nutrition Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sport-Specific Recommendations',
                insights: [
                  `As a ${athleteData.sport} player, focus on high-quality proteins for muscle recovery.`,
                  'Maintain balanced carbohydrate intake for sustained energy.',
                  'Include anti-inflammatory foods to support joint health.'
                ]
              },
              {
                title: 'Timing Optimization',
                insights: [
                  'Consume protein within 30 minutes post-training.',
                  'Space meals 3-4 hours apart for optimal digestion.',
                  'Hydrate with 500ml water 2 hours before training.'
                ]
              },
              {
                title: 'Performance Boosters',
                insights: [
                  'Include omega-3 rich foods for joint health.',
                  'Add beetroot juice for improved endurance.',
                  'Consider creatine supplementation for power output.'
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 p-4 rounded-lg"
              >
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  {index === 0 && <FaAppleAlt className="text-green-500" />}
                  {index === 1 && <FaClock className="text-blue-500" />}
                  {index === 2 && <FaBrain className="text-purple-500" />}
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Nutrition;