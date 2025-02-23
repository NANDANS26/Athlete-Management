import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaDumbbell,
  FaRunning,
  FaHeart,
  FaYinYang,
  FaBrain,
  FaHeartbeat,
  FaTrophy,
  FaChartLine,
  FaWater,
  FaBed,
  FaMedal,
  FaStopwatch,
  FaExclamationTriangle,
} from 'react-icons/fa';
import type { AthleteData } from './AthleteDashboard';

interface TrainingPlansProps {
  athleteData: AthleteData;
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: string;
  intensity: string;
  targetHeartRate?: string;
  notes?: string;
  sportSpecific?: boolean;
}

interface WorkoutSection {
  title: string;
  exercises: Exercise[];
  type: 'strength' | 'cardio' | 'recovery' | 'sport-specific';
  intensity: 'high' | 'medium' | 'low';
}

type WorkoutData = {
  [key: string]: {
    strength: WorkoutSection[];
    endurance: WorkoutSection[];
    speed: WorkoutSection[];
    recovery: WorkoutSection[];
  };
};

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  target: number;
  unit: string;
}

interface HealthMetrics {
  heartRate: number;
  fatigueLevel: number;
  recoveryScore: number;
  sleepQuality: number;
  hydrationLevel: number;
  stressLevel: number;
}



const workoutData: WorkoutData = {
  today: {
    strength: [
      {
        title: 'Strength Training',
        type: 'strength',
        intensity: 'high',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '8-10', intensity: 'High' },
          { name: 'Bench Press', sets: 4, reps: '8-10', intensity: 'High' },
        ],
      },
    ],
    endurance: [
      {
        title: 'Endurance Training',
        type: 'cardio',
        intensity: 'medium',
        exercises: [
          { name: 'Long Run', sets: 1, reps: '30 mins', intensity: 'Medium' },
        ],
      },
    ],
    speed: [
      {
        title: 'Speed Training',
        type: 'sport-specific',
        intensity: 'high',
        exercises: [
          { name: 'Sprint Intervals', sets: 6, reps: '30s', intensity: 'High' },
        ],
      },
    ],
    recovery: [
      {
        title: 'Recovery Session',
        type: 'recovery',
        intensity: 'low',
        exercises: [
          { name: 'Yoga Flow', sets: 1, reps: '20 mins', intensity: 'Low' },
        ],
      },
    ],
  },
  tomorrow: {
    strength: [
      {
        title: 'Strength Training',
        type: 'strength',
        intensity: 'medium',
        exercises: [
          { name: 'Squats', sets: 3, reps: '10-12', intensity: 'Medium' },
        ],
      },
    ],
    endurance: [
      {
        title: 'Endurance Training',
        type: 'cardio',
        intensity: 'high',
        exercises: [
          { name: 'Cycling', sets: 1, reps: '45 mins', intensity: 'High' },
        ],
      },
    ],
    speed: [
      {
        title: 'Speed Training',
        type: 'sport-specific',
        intensity: 'high',
        exercises: [
          { name: 'Agility Drills', sets: 5, reps: '1 min', intensity: 'High' },
        ],
      },
    ],
    recovery: [
      {
        title: 'Recovery Session',
        type: 'recovery',
        intensity: 'low',
        exercises: [
          { name: 'Foam Rolling', sets: 1, reps: '15 mins', intensity: 'Low' },
        ],
      },
    ],
  },
  day3: {
    strength: [
      {
        title: 'Strength Training',
        type: 'strength',
        intensity: 'high',
        exercises: [
          { name: 'Pull-Ups', sets: 4, reps: '8-10', intensity: 'High' },
        ],
      },
    ],
    endurance: [
      {
        title: 'Endurance Training',
        type: 'cardio',
        intensity: 'medium',
        exercises: [
          { name: 'Swimming', sets: 1, reps: '30 mins', intensity: 'Medium' },
        ],
      },
    ],
    speed: [
      {
        title: 'Speed Training',
        type: 'sport-specific',
        intensity: 'high',
        exercises: [
          { name: 'Plyometrics', sets: 6, reps: '30s', intensity: 'High' },
        ],
      },
    ],
    recovery: [
      {
        title: 'Recovery Session',
        type: 'recovery',
        intensity: 'low',
        exercises: [
          { name: 'Stretching', sets: 1, reps: '20 mins', intensity: 'Low' },
        ],
      },
    ],
  },
};

const TrainingPlans = ({ athleteData }: TrainingPlansProps) => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [selectedGoal, setSelectedGoal] = useState('strength');
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    heartRate: 75,
    fatigueLevel: 30,
    recoveryScore: 85,
    sleepQuality: 90,
    hydrationLevel: 75,
    stressLevel: 40,
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  // Simulate real-time health data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthMetrics((prev) => ({
        heartRate: prev.heartRate + Math.floor(Math.random() * 3) - 1,
        fatigueLevel: Math.max(0, Math.min(100, prev.fatigueLevel + Math.floor(Math.random() * 5) - 2)),
        recoveryScore: Math.max(0, Math.min(100, prev.recoveryScore + Math.floor(Math.random() * 4) - 2)),
        sleepQuality: prev.sleepQuality,
        hydrationLevel: Math.max(0, Math.min(100, prev.hydrationLevel + Math.floor(Math.random() * 3) - 1)),
        stressLevel: Math.max(0, Math.min(100, prev.stressLevel + Math.floor(Math.random() * 4) - 2)),
      }));
      console.log("Updated Health Metrics:", healthMetrics); // Log the updated state
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);

  // Initialize achievements
  useEffect(() => {
    setAchievements([
      {
        id: '1',
        title: 'Consistency King',
        description: 'Complete workouts for 7 consecutive days',
        icon: <FaTrophy className="text-yellow-500" />,
        progress: 5,
        target: 7,
        unit: 'days',
      },
      {
        id: '2',
        title: 'Heart Rate Master',
        description: 'Maintain target heart rate zone for 30 minutes',
        icon: <FaHeart className="text-red-500" />,
        progress: 25,
        target: 30,
        unit: 'minutes',
      },
      {
        id: '3',
        title: 'Recovery Pro',
        description: 'Achieve 90% recovery score for 5 days',
        icon: <FaYinYang className="text-blue-500" />,
        progress: 3,
        target: 5,
        unit: 'days',
      },
    ]);
  }, []);

  const generateWorkout = (): WorkoutSection[] => {
    const dayWorkouts = workoutData[selectedDay as keyof typeof workoutData];
    const focusWorkouts = dayWorkouts[selectedGoal as keyof typeof dayWorkouts];
  
    const workout: WorkoutSection[] = [
      {
        title: 'Warm-up',
        type: 'cardio',
        intensity: 'low',
        exercises: [
          {
            name: 'Dynamic Stretching',
            sets: 1,
            reps: '10 each',
            duration: '10 mins',
            intensity: 'Low',
            notes: 'Focus on major muscle groups',
          },
        ],
      },
      ...focusWorkouts,
      {
        title: 'Cool-down',
        type: 'recovery',
        intensity: 'low',
        exercises: [
          {
            name: 'Static Stretching',
            sets: 1,
            reps: '30s each',
            duration: '10 mins',
            intensity: 'Low',
          },
        ],
      },
    ];
  
    return workout;
  };

  const workout = generateWorkout();

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };



  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Training Plans</h1>
          <p className="text-gray-400">
            AI-powered workouts tailored for {athleteData.sport} - {athleteData.position}
          </p>
        </div>
  
        {/* Day Selection */}
        <div className="flex gap-2">
          {['today', 'tomorrow', 'day3'].map((day) => (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDay === day
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
  
      {/* Health Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {/* Heart Rate */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <FaHeart className="text-red-500 text-xl" />
            <h3 className="font-semibold">Heart Rate</h3>
          </div>
          <p className="text-2xl font-bold">{healthMetrics.heartRate} BPM</p>
        </div>
  
        {/* Fatigue */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <FaRunning className="text-blue-500 text-xl" />
            <h3 className="font-semibold">Fatigue</h3>
          </div>
          <p className="text-2xl font-bold">{healthMetrics.fatigueLevel}%</p>
        </div>
  
        {/* Recovery */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <FaYinYang className="text-green-500 text-xl" />
            <h3 className="font-semibold">Recovery</h3>
          </div>
          <p className="text-2xl font-bold">{healthMetrics.recoveryScore}%</p>
        </div>
  
        {/* Sleep */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <FaBed className="text-purple-500 text-xl" />
            <h3 className="font-semibold">Sleep</h3>
          </div>
          <p className="text-2xl font-bold">{healthMetrics.sleepQuality}%</p>
        </div>
  
        {/* Hydration */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <FaWater className="text-blue-500 text-xl" />
            <h3 className="font-semibold">Hydration</h3>
          </div>
          <p className="text-2xl font-bold">{healthMetrics.hydrationLevel}%</p>
        </div>
  
        {/* Stress */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <FaBrain className="text-yellow-500 text-xl" />
            <h3 className="font-semibold">Stress</h3>
          </div>
          <p className="text-2xl font-bold">{healthMetrics.stressLevel}%</p>
        </div>
      </motion.div>
  
      {/* Training Focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaChartLine className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">Training Focus</h2>
        </div>
  
        <div className="flex flex-wrap gap-4">
          {['strength', 'endurance', 'speed', 'recovery'].map((goal) => (
            <motion.button
              key={goal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGoal(goal)}
              className={`px-6 py-3 rounded-lg capitalize ${
                selectedGoal === goal
                  ? 'bg-primary text-white'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400'
              }`}
            >
              {goal}
            </motion.button>
          ))}
        </div>
      </motion.div>
  
      {/* Workout Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaDumbbell className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">{selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}'s Workout Plan</h2>
        </div>
  
        <div className="space-y-6">
          {workout.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                {section.title}
                {section.type === 'recovery' && <FaYinYang className="text-purple-500" />}
              </h3>
              <div className="space-y-4">
                {section.exercises.map((exercise, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="bg-white/5 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-gray-400">
                          {exercise.sets} {exercise.sets > 1 ? 'sets' : 'set'} × {exercise.reps}
                          {exercise.duration && ` • ${exercise.duration}`}
                        </p>
                      </div>
                      <span className={`text-sm ${getIntensityColor(exercise.intensity)}`}>
                        {exercise.intensity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
  
      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaMedal className="text-yellow-500 text-2xl" />
          <h2 className="text-xl font-semibold">Achievements</h2>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                {achievement.icon}
                <h3 className="font-semibold">{achievement.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary">
                      {Math.round((achievement.progress / achievement.target) * 100)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-400">
                      {achievement.progress}/{achievement.target} {achievement.unit}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                  <div
                    style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

{/* AI Recommendations */}
{/* AI Recommendations */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
>
  <div className="flex items-center gap-3 mb-6">
    <FaBrain className="text-primary text-2xl" />
    <h2 className="text-xl font-semibold">AI Recommendations</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Health Insights */}
    <div className="space-y-4 border-2 border-red-500"> {/* Debugging border */}
      {/* High Fatigue */}
      {healthMetrics.fatigueLevel > 50 && ( // Adjusted threshold
        <div className="flex items-center gap-3 bg-red-500/20 p-4 rounded-lg">
          <FaExclamationTriangle className="text-red-500" />
          <div>
            <p className="text-sm font-semibold">High Fatigue Detected</p>
            <p className="text-xs text-gray-400">
              Your fatigue level is {healthMetrics.fatigueLevel}%. Consider a recovery day or light activity.
            </p>
          </div>
        </div>
      )}

      {/* Low Hydration */}
      {healthMetrics.hydrationLevel < 70 && ( // Adjusted threshold
        <div className="flex items-center gap-3 bg-yellow-500/20 p-4 rounded-lg">
          <FaWater className="text-yellow-500" />
          <div>
            <p className="text-sm font-semibold">Low Hydration Level</p>
            <p className="text-xs text-gray-400">
              Your hydration level is {healthMetrics.hydrationLevel}%. Drink at least 500ml of water immediately.
            </p>
          </div>
        </div>
      )}

      {/* Poor Sleep */}
      {healthMetrics.sleepQuality < 70 && (
        <div className="flex items-center gap-3 bg-purple-500/20 p-4 rounded-lg">
          <FaBed className="text-purple-500" />
          <div>
            <p className="text-sm font-semibold">Poor Sleep Quality</p>
            <p className="text-xs text-gray-400">
              Your sleep quality is {healthMetrics.sleepQuality}%. Aim for 7-9 hours of uninterrupted sleep.
            </p>
          </div>
        </div>
      )}

      {/* High Stress */}
      {healthMetrics.stressLevel > 50 && ( // Adjusted threshold
        <div className="flex items-center gap-3 bg-orange-500/20 p-4 rounded-lg">
          <FaBrain className="text-orange-500" />
          <div>
            <p className="text-sm font-semibold">High Stress Level</p>
            <p className="text-xs text-gray-400">
              Your stress level is {healthMetrics.stressLevel}%. Practice mindfulness or deep breathing exercises.
            </p>
          </div>
        </div>
      )}

      {/* Low Recovery */}
      {healthMetrics.recoveryScore < 70 && ( // Adjusted threshold
        <div className="flex items-center gap-3 bg-blue-500/20 p-4 rounded-lg">
          <FaYinYang className="text-blue-500" />
          <div>
            <p className="text-sm font-semibold">Low Recovery Score</p>
            <p className="text-xs text-gray-400">
              Your recovery score is {healthMetrics.recoveryScore}%. Focus on rest and light activities today.
            </p>
          </div>
        </div>
      )}
    </div>

    {/* Training Tips */}
    <div className="bg-white/5 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">Training Tips</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <FaStopwatch className="text-primary" />
          <span className="text-sm">
            Maintain 2-3 minute rest periods between sets for optimal recovery.
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaWater className="text-blue-500" />
          <span className="text-sm">
            Drink 500ml of water before and during your workout to stay hydrated.
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaHeartbeat className="text-red-500" />
          <span className="text-sm">
            Keep your heart rate in the target zone (140-160 BPM) for effective cardio.
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaDumbbell className="text-yellow-500" />
          <span className="text-sm">
            Focus on proper form to avoid injuries during strength training.
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaRunning className="text-green-500" />
          <span className="text-sm">
            Incorporate dynamic stretches before workouts to improve flexibility.
          </span>
        </li>
      </ul>
    </div>
  </div>
</motion.div>
</div>
  );
};

export default TrainingPlans;
