import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaDumbbell, FaUtensils, FaHeart, FaBrain, FaCheckCircle, FaRocket } from 'react-icons/fa';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const AthleteOnboarding = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [showOath, setShowOath] = useState(false);
  const [loading, setLoading] = useState(false);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const sections = [
    {
      title: "Your Path to Excellence",
      icon: <FaRocket className="text-5xl text-primary mb-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-300">
            Welcome to your personalized journey to athletic excellence. We've crafted a comprehensive
            program tailored to your goals as a {auth.currentUser?.displayName} athlete.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FaHeart className="text-red-500" />
                Dedication Required
              </h3>
              <p className="text-sm text-gray-400">
                2-3 hours daily commitment for optimal results
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FaBrain className="text-purple-500" />
                Mental Preparation
              </h3>
              <p className="text-sm text-gray-400">
                Focus, discipline, and unwavering determination
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Nutrition Plan",
      icon: <FaUtensils className="text-5xl text-green-500 mb-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Daily Nutrition Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded">
                  <span className="text-primary">6 AM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Pre-Workout Meal</h4>
                  <p className="text-sm text-gray-400">
                    Oatmeal with banana and honey
                    <br />
                    Protein shake with almond milk
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded">
                  <span className="text-primary">9 AM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Post-Workout Nutrition</h4>
                  <p className="text-sm text-gray-400">
                    Grilled chicken breast with quinoa
                    <br />
                    Mixed vegetables and avocado
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded">
                  <span className="text-primary">1 PM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Lunch</h4>
                  <p className="text-sm text-gray-400">
                    Lean protein with complex carbs
                    <br />
                    Green leafy vegetables
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded">
                  <span className="text-primary">4 PM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Afternoon Snack</h4>
                  <p className="text-sm text-gray-400">
                    Greek yogurt with berries
                    <br />
                    Handful of nuts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded">
                  <span className="text-primary">7 PM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Dinner</h4>
                  <p className="text-sm text-gray-400">
                    Grilled salmon with sweet potato
                    <br />
                    Steamed broccoli
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded">
                  <span className="text-primary">9 PM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Evening Snack</h4>
                  <p className="text-sm text-gray-400">
                    Cottage cheese with pineapple
                    <br />
                    Herbal tea
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Hydration</h3>
              <p className="text-sm text-gray-400">
                Minimum 3-4 liters of water daily
                <br />
                Electrolyte balance during training
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Supplements</h3>
              <p className="text-sm text-gray-400">
                Protein supplements
                <br />
                Essential vitamins and minerals
                <br />
                Omega-3 fatty acids
                <br />
                Creatine monohydrate
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Training Schedule",
      icon: <FaDumbbell className="text-5xl text-yellow-500 mb-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Weekly Training Breakdown</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Monday & Thursday</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Strength Training (1.5 hours)</li>
                    <li>• Skill Development (1 hour)</li>
                    <li>• Recovery & Stretching (30 mins)</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Tuesday & Friday</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Speed & Agility (1 hour)</li>
                    <li>• Endurance Training (1 hour)</li>
                    <li>• Technical Drills (1 hour)</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Wednesday & Saturday</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Position-specific Training (2 hours)</li>
                    <li>• Mental Conditioning (1 hour)</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Sunday</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Active Recovery</li>
                    <li>• Light Mobility Work</li>
                    <li>• Mental Preparation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Detailed Training Plan</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Strength Training</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Squats: 4 sets of 8-12 reps</li>
                    <li>• Deadlifts: 4 sets of 6-10 reps</li>
                    <li>• Bench Press: 4 sets of 8-12 reps</li>
                    <li>• Pull-Ups: 3 sets of 8-10 reps</li>
                    <li>• Core Work: Planks, Russian Twists</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Speed & Agility</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Sprints: 10 x 40m</li>
                    <li>• Ladder Drills: 3 sets</li>
                    <li>• Cone Drills: 3 sets</li>
                    <li>• Plyometrics: Box Jumps, Depth Jumps</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Endurance Training</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Long-Distance Runs: 5-10km</li>
                    <li>• Interval Training: 1 min sprint, 2 min jog</li>
                    <li>• Hill Sprints: 10 x 100m</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Recovery & Mobility</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Foam Rolling: Full Body</li>
                    <li>• Stretching: Dynamic & Static</li>
                    <li>• Yoga: 30-45 minutes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      setShowOath(true);
    }
  };

  const handleTakeOath = async () => {
    setLoading(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('No user logged in');

      await updateDoc(doc(db, 'athletes', userId), {
        onboardingCompleted: true,
        oathTaken: true,
        updatedAt: new Date().toISOString()
      });

      navigate('/dashboard/athlete');
    } catch (error) {
      console.error('Error updating athlete:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          particles: {
            color: { value: "#646cff" },
            links: { color: "#646cff", distance: 150, enable: true, opacity: 0.5, width: 1 },
            move: { enable: true, speed: 1 },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />

      <AnimatePresence mode="wait">
        {!showOath ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-4xl w-full mx-4"
          >
            <div className="text-center mb-8">
              {sections[currentSection].icon}
              <h2 className="text-3xl font-bold mb-4">{sections[currentSection].title}</h2>
            </div>

            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              {sections[currentSection].content}
            </motion.div>

            <div className="flex justify-between items-center">
              {currentSection > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSection(prev => prev - 1)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Previous
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-6 py-2 bg-primary hover:bg-secondary rounded-lg transition-colors ml-auto"
              >
                {currentSection === sections.length - 1 ? "Take the Oath" : "Next"}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="oath"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-2xl w-full mx-4 text-center"
          >
            <FaCheckCircle className="text-6xl text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Athlete's Oath</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I solemnly swear to:
              <br /><br />
              Dedicate myself to the pursuit of athletic excellence
              <br />
              Follow my training and nutrition plan with discipline
              <br />
              Never give up in the face of challenges
              <br />
              Represent myself and my sport with honor
              <br /><br />
              This is my commitment to excellence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTakeOath}
              disabled={loading}
              className={`flex items-center justify-center gap-2 bg-primary hover:bg-secondary 
                text-white px-8 py-3 rounded-lg mx-auto ${loading ? 'opacity-50' : ''}`}
            >
              <FaRocket />
              {loading ? "Processing..." : "I Accept This Oath"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AthleteOnboarding;