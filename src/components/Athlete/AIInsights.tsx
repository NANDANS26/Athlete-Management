import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaBrain, FaAppleAlt, FaUserTie, FaRobot, FaDumbbell, FaStopwatch, FaArrowUp, FaArrowDown, FaMinus, FaTrophy, FaGraduationCap, FaFire, FaBed, FaSmile, } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AthleteData } from './AthleteDashboard';

interface AIInsightsProps {
  athleteData: AthleteData;
}

interface DevelopmentMetric {
  category: string;
  current: number;
  target: number;
  improvement: number;
  trend: 'up' | 'down' | 'stable';
}

interface TrainingRecommendation {
  type: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: number;
}

interface PerformanceInsight {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  recommendation: string;
}

interface MealPlan {
  day: string;
  meals: string[];
  calories: number;
}

interface RecoveryPlan {
  type: string;
  description: string;
  duration: string;
  benefits: string[];
}

const AIInsights = ({ athleteData }: AIInsightsProps) => {
  const [developmentMetrics, setDevelopmentMetrics] = useState<DevelopmentMetric[]>([]);
  const [recommendations, setRecommendations] = useState<TrainingRecommendation[]>([]);
  const [performanceInsights, setPerformanceInsights] = useState<PerformanceInsight[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [recoveryPlans, setRecoveryPlans] = useState<RecoveryPlan[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSportSpecificData = () => {
      // Sport-specific development metrics
      const metrics: DevelopmentMetric[] = getSportSpecificMetrics(athleteData.sport, athleteData.position);
      setDevelopmentMetrics(metrics);

      // Training recommendations
      const recs: TrainingRecommendation[] = getSportSpecificRecommendations(athleteData.sport, athleteData.position);
      setRecommendations(recs);

      // Performance insights
      const insights: PerformanceInsight[] = generatePerformanceInsights(athleteData.sport, athleteData.position);
      setPerformanceInsights(insights);

      // Meal plans
      const meals: MealPlan[] = generateMealPlans(athleteData.sport, athleteData.position);
      setMealPlans(meals);

      // Recovery plans
      const recovery: RecoveryPlan[] = generateRecoveryPlans(athleteData.sport, athleteData.position);
      setRecoveryPlans(recovery);

      setLoading(false);
    };

    generateSportSpecificData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      updateMetricsInRealTime();
    }, 5000);

    return () => clearInterval(interval);
  }, [athleteData]);

  const getSportSpecificMetrics = (sport: string, position: string): DevelopmentMetric[] => {
    switch (sport) {
      // Football (Soccer)
      case 'Football':
        if (position === 'Forward') {
          return [
            { category: 'Shooting Accuracy', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Sprint Speed', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Ball Control', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Tactical Awareness', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Midfielder') {
          return [
            { category: 'Passing Accuracy', current: 90, target: 95, improvement: 1.5, trend: 'up' },
            { category: 'Stamina', current: 85, target: 90, improvement: 2.0, trend: 'up' },
            { category: 'Vision', current: 80, target: 88, improvement: 3.0, trend: 'up' },
            { category: 'Tackling', current: 75, target: 85, improvement: 4.0, trend: 'up' },
          ];
        } else if (position === 'Defender') {
          return [
            { category: 'Tackling Success', current: 88, target: 95, improvement: 2.0, trend: 'up' },
            { category: 'Aerial Duels', current: 85, target: 90, improvement: 1.5, trend: 'up' },
            { category: 'Positioning', current: 80, target: 88, improvement: 3.0, trend: 'up' },
            { category: 'Passing Range', current: 75, target: 85, improvement: 4.0, trend: 'up' },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { category: 'Shot Stopping', current: 90, target: 95, improvement: 1.5, trend: 'up' },
            { category: 'Command of Area', current: 85, target: 90, improvement: 2.0, trend: 'up' },
            { category: 'Distribution', current: 80, target: 88, improvement: 3.0, trend: 'up' },
            { category: 'Reflexes', current: 75, target: 85, improvement: 4.0, trend: 'up' },
          ];
        }
        break;
  
      // Basketball
      case 'Basketball':
        if (position === 'Point Guard') {
          return [
            { category: 'Assists', current: 80, target: 90, improvement: 3.0, trend: 'up' },
            { category: 'Three-Point Shooting', current: 75, target: 85, improvement: 2.5, trend: 'up' },
            { category: 'Ball Handling', current: 85, target: 95, improvement: 2.0, trend: 'up' },
            { category: 'Defensive Awareness', current: 70, target: 80, improvement: 4.0, trend: 'up' },
          ];
        } else if (position === 'Shooting Guard') {
          return [
            { category: 'Three-Point Shooting', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Mid-Range Shooting', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Defensive Pressure', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Ball Handling', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Small Forward') {
          return [
            { category: 'Versatility', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Scoring Efficiency', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Defensive Awareness', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Rebounding', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Power Forward') {
          return [
            { category: 'Rebounding', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Post Moves', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Defensive Awareness', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Mid-Range Shooting', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Center') {
          return [
            { category: 'Rebounding', current: 90, target: 95, improvement: 1.5, trend: 'up' },
            { category: 'Post Moves', current: 85, target: 90, improvement: 2.0, trend: 'up' },
            { category: 'Blocking', current: 80, target: 88, improvement: 3.0, trend: 'up' },
            { category: 'Free Throw Shooting', current: 75, target: 85, improvement: 4.0, trend: 'up' },
          ];
        }
        break;
  
      // Tennis
      case 'Tennis':
        if (position === 'Singles Player') {
          return [
            { category: 'Serve Accuracy', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Forehand Power', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Backhand Consistency', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Footwork', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { category: 'Net Play', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Communication', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Serve Accuracy', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Positioning', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        }
        break;
  
      // Boxing
      case 'Boxing':
        if (position === 'Lightweight') {
          return [
            { category: 'Punch Accuracy', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Footwork', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Defensive Skills', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Stamina', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Middleweight') {
          return [
            { category: 'Power Punching', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Endurance', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Ring Control', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Counter-Punching', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Heavyweight') {
          return [
            { category: 'Knockout Power', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Defensive Skills', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Stamina', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Ring IQ', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        }
        break;
  
      // Badminton
      case 'Badminton':
        if (position === 'Singles Player') {
          return [
            { category: 'Serve Accuracy', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Smash Power', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Footwork', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Net Play', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { category: 'Communication', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Net Play', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Positioning', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Smash Power', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Mixed Doubles') {
          return [
            { category: 'Coordination', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Net Play', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Smash Power', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Positioning', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        }
        break;
  
      // Cricket
      case 'Cricket':
        if (position === 'Batsman') {
          return [
            { category: 'Batting Average', current: 45, target: 55, improvement: 2.5, trend: 'up' },
            { category: 'Strike Rate', current: 130, target: 140, improvement: 1.8, trend: 'up' },
            { category: 'Footwork', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Shot Selection', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Bowler') {
          return [
            { category: 'Economy Rate', current: 5.5, target: 4.5, improvement: 2.5, trend: 'up' },
            { category: 'Wicket-Taking Ability', current: 3.0, target: 4.0, improvement: 1.8, trend: 'up' },
            { category: 'Yorker Accuracy', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Variation', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'All-rounder') {
          return [
            { category: 'Batting Average', current: 35, target: 45, improvement: 2.5, trend: 'up' },
            { category: 'Bowling Average', current: 30, target: 25, improvement: 1.8, trend: 'up' },
            { category: 'Fielding', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Stamina', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Wicket Keeper') {
          return [
            { category: 'Catching', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Stumping', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Batting Average', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Reaction Time', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        }
        break;
  
      // Rugby
      case 'Rugby':
        if (position === 'Forward') {
          return [
            { category: 'Scrum Power', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Tackling', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Rucking', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Endurance', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Back') {
          return [
            { category: 'Speed', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Passing Accuracy', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Tackling', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Positioning', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Scrum-half') {
          return [
            { category: 'Passing Accuracy', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Decision Making', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Kicking Accuracy', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Communication', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Fly-half') {
          return [
            { category: 'Kicking Accuracy', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Game Management', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Passing Accuracy', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Tackling', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        }
        break;
  
      // Athletics (Track and Field)
      case 'Athletics':
        if (position === 'Sprinter') {
          return [
            { category: '100m Time', current: 10.5, target: 9.8, improvement: 2.5, trend: 'up' },
            { category: 'Reaction Time', current: 0.18, target: 0.15, improvement: 1.8, trend: 'up' },
            { category: 'Explosive Power', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Stride Length', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Long Distance') {
          return [
            { category: 'Marathon Time', current: 180, target: 170, improvement: 2.5, trend: 'up' },
            { category: 'Endurance', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Pacing', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Mental Toughness', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'High Jump') {
          return [
            { category: 'Jump Height', current: 2.0, target: 2.2, improvement: 2.5, trend: 'up' },
            { category: 'Approach Speed', current: 8.5, target: 9.0, improvement: 1.8, trend: 'up' },
            { category: 'Takeoff Technique', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Flexibility', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Long Jump') {
          return [
            { category: 'Jump Distance', current: 7.5, target: 8.0, improvement: 2.5, trend: 'up' },
            { category: 'Approach Speed', current: 9.0, target: 9.5, improvement: 1.8, trend: 'up' },
            { category: 'Takeoff Angle', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Landing Technique', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Shot Put') {
          return [
            { category: 'Throw Distance', current: 18.0, target: 20.0, improvement: 2.5, trend: 'up' },
            { category: 'Explosive Power', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Technique', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Core Strength', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        }
        break;
  
      // Hockey
      case 'Hockey':
        if (position === 'Forward') {
          return [
            { category: 'Shooting Accuracy', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Speed', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Dribbling', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Positioning', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Midfielder') {
          return [
            { category: 'Passing Accuracy', current: 90, target: 95, improvement: 1.5, trend: 'up' },
            { category: 'Stamina', current: 85, target: 90, improvement: 2.0, trend: 'up' },
            { category: 'Tackling', current: 80, target: 88, improvement: 3.0, trend: 'up' },
            { category: 'Vision', current: 75, target: 85, improvement: 4.0, trend: 'up' },
          ];
        } else if (position === 'Defender') {
          return [
            { category: 'Tackling', current: 88, target: 95, improvement: 2.0, trend: 'up' },
            { category: 'Aerial Duels', current: 85, target: 90, improvement: 1.5, trend: 'up' },
            { category: 'Positioning', current: 80, target: 88, improvement: 3.0, trend: 'up' },
            { category: 'Passing Range', current: 75, target: 85, improvement: 4.0, trend: 'up' },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { category: 'Shot Stopping', current: 90, target: 95, improvement: 1.5, trend: 'up' },
            { category: 'Reflexes', current: 85, target: 90, improvement: 2.0, trend: 'up' },
            { category: 'Distribution', current: 80, target: 88, improvement: 3.0, trend: 'up' },
            { category: 'Command of Area', current: 75, target: 85, improvement: 4.0, trend: 'up' },
          ];
        }
        break;
  
      // Swimming
      case 'Swimming':
        if (position === 'Freestyle') {
          return [
            { category: 'Speed', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Endurance', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Turn Efficiency', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Breathing Technique', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Butterfly') {
          return [
            { category: 'Stroke Efficiency', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Endurance', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Underwater Kicks', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Breathing Technique', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Backstroke') {
          return [
            { category: 'Stroke Efficiency', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Turn Efficiency', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Underwater Kicks', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Positioning', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Breaststroke') {
          return [
            { category: 'Stroke Efficiency', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Kick Power', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Turn Efficiency', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Breathing Technique', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        } else if (position === 'Individual Medley') {
          return [
            { category: 'Stroke Efficiency', current: 85, target: 95, improvement: 2.5, trend: 'up' },
            { category: 'Transition Speed', current: 88, target: 92, improvement: 1.8, trend: 'up' },
            { category: 'Endurance', current: 82, target: 90, improvement: 3.2, trend: 'up' },
            { category: 'Breathing Technique', current: 78, target: 85, improvement: 4.5, trend: 'up' },
          ];
        }
        break;
  
      // Default case for unsupported sports
      default:
        return [];
    }
    return [];
  };

  const getSportSpecificRecommendations = (sport: string, position: string): TrainingRecommendation[] => {
    switch (sport) {
      // Football (Soccer)
      case 'Football':
        if (position === 'Forward') {
          return [
            { type: 'Technical', title: 'Finishing Drills', description: 'Focus on one-on-one situations and shooting under pressure', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Explosive Power Training', description: 'Incorporate plyometrics and sprint training', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Movement Pattern Analysis', description: 'Study and practice optimal positioning and runs', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Midfielder') {
          return [
            { type: 'Technical', title: 'Passing Drills', description: 'Focus on accurate long and short passes', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for sustained performance', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Positional Awareness', description: 'Study and practice optimal positioning', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Defender') {
          return [
            { type: 'Technical', title: 'Tackling Drills', description: 'Practice clean and effective tackles', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build upper body and core strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Defensive Positioning', description: 'Study and practice optimal defensive positioning', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { type: 'Technical', title: 'Shot Stopping Drills', description: 'Practice saving shots from various angles', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Reaction Training', description: 'Improve reflexes and reaction time', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Command of Area', description: 'Study and practice organizing the defense', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Basketball
      case 'Basketball':
        if (position === 'Point Guard') {
          return [
            { type: 'Technical', title: 'Ball Handling Drills', description: 'Improve dribbling under pressure', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Agility Training', description: 'Enhance quickness and lateral movement', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Playmaking Analysis', description: 'Study and practice creating scoring opportunities', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Shooting Guard') {
          return [
            { type: 'Technical', title: 'Shooting Drills', description: 'Focus on three-point and mid-range shooting', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for sustained performance', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Off-Ball Movement', description: 'Study and practice creating space for shots', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Small Forward') {
          return [
            { type: 'Technical', title: 'Versatility Drills', description: 'Practice scoring from multiple positions', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build overall body strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Defensive Awareness', description: 'Study and practice guarding multiple positions', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Power Forward') {
          return [
            { type: 'Technical', title: 'Post Moves', description: 'Practice low-post scoring techniques', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build core and lower body strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Rebounding Drills', description: 'Improve positioning and timing for rebounds', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Center') {
          return [
            { type: 'Technical', title: 'Post Moves', description: 'Practice low-post scoring techniques', priority: 'high', impact: 100 },
            { type: 'Physical', title: 'Strength Training', description: 'Build core and lower body strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Rebounding Drills', description: 'Improve positioning and timing for rebounds', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Tennis
      case 'Tennis':
        if (position === 'Singles Player') {
          return [
            { type: 'Technical', title: 'Serve Accuracy', description: 'Focus on consistent and powerful serves', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Footwork Drills', description: 'Improve movement on the court', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Match Strategy', description: 'Study opponent weaknesses and adapt', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { type: 'Technical', title: 'Net Play', description: 'Practice volleys and net positioning', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Reaction Training', description: 'Improve reflexes for quick net exchanges', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Communication Drills', description: 'Work on coordination with your partner', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Boxing
      case 'Boxing':
        if (position === 'Lightweight') {
          return [
            { type: 'Technical', title: 'Punch Accuracy', description: 'Focus on precise and powerful punches', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Footwork Drills', description: 'Improve agility and movement in the ring', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Defensive Skills', description: 'Practice blocking and dodging', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Middleweight') {
          return [
            { type: 'Technical', title: 'Power Punching', description: 'Focus on delivering knockout punches', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for longer fights', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Ring Control', description: 'Study and practice controlling the ring', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Heavyweight') {
          return [
            { type: 'Technical', title: 'Knockout Power', description: 'Focus on delivering powerful punches', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build overall body strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Counter-Punching', description: 'Practice countering opponent moves', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Badminton
      case 'Badminton':
        if (position === 'Singles Player') {
          return [
            { type: 'Technical', title: 'Serve Accuracy', description: 'Focus on consistent and deceptive serves', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Footwork Drills', description: 'Improve movement on the court', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Match Strategy', description: 'Study opponent weaknesses and adapt', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { type: 'Technical', title: 'Net Play', description: 'Practice quick net exchanges', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Reaction Training', description: 'Improve reflexes for fast-paced play', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Communication Drills', description: 'Work on coordination with your partner', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Mixed Doubles') {
          return [
            { type: 'Technical', title: 'Versatility Drills', description: 'Practice adapting to different playstyles', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for longer matches', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Positioning', description: 'Study and practice optimal court positioning', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Cricket
      case 'Cricket':
        if (position === 'Batsman') {
          return [
            { type: 'Technical', title: 'Batting Drills', description: 'Focus on shot selection and timing', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Footwork Drills', description: 'Improve movement and balance at the crease', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Match Strategy', description: 'Study bowlers and adapt your batting', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Bowler') {
          return [
            { type: 'Technical', title: 'Bowling Accuracy', description: 'Focus on consistent line and length', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build core and shoulder strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Variation Drills', description: 'Practice different types of deliveries', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'All-rounder') {
          return [
            { type: 'Technical', title: 'Batting and Bowling Drills', description: 'Focus on both batting and bowling skills', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for all-round performance', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Match Awareness', description: 'Study and adapt to match situations', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Wicket Keeper') {
          return [
            { type: 'Technical', title: 'Catching Drills', description: 'Practice catching and stumping', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Reaction Training', description: 'Improve reflexes for quick catches', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Positioning', description: 'Study and practice optimal positioning behind the stumps', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Rugby
      case 'Rugby':
        if (position === 'Forward') {
          return [
            { type: 'Technical', title: 'Scrum Drills', description: 'Practice scrum techniques and power', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build overall body strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Rucking Drills', description: 'Study and practice effective rucking', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Back') {
          return [
            { type: 'Technical', title: 'Passing Drills', description: 'Focus on accurate and quick passes', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Speed Training', description: 'Improve sprint speed and agility', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Positioning', description: 'Study and practice optimal positioning', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Scrum-half') {
          return [
            { type: 'Technical', title: 'Passing Drills', description: 'Focus on quick and accurate passes', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Agility Training', description: 'Improve quickness and lateral movement', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Game Management', description: 'Study and practice controlling the game', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Fly-half') {
          return [
            { type: 'Technical', title: 'Kicking Drills', description: 'Practice accurate and powerful kicks', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for sustained performance', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Decision Making', description: 'Study and practice making quick decisions', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Athletics (Track and Field)
      case 'Athletics':
        if (position === 'Sprinter') {
          return [
            { type: 'Technical', title: 'Start Drills', description: 'Focus on explosive starts', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Speed Training', description: 'Improve sprint speed', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Race Strategy', description: 'Study and practice optimal pacing', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Long Distance') {
          return [
            { type: 'Technical', title: 'Pacing Drills', description: 'Focus on maintaining consistent speed', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for long distances', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Race Strategy', description: 'Study and practice optimal pacing', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'High Jump') {
          return [
            { type: 'Technical', title: 'Takeoff Drills', description: 'Focus on explosive takeoff techniques', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build leg and core strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Approach Drills', description: 'Study and practice optimal approach angles', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Long Jump') {
          return [
            { type: 'Technical', title: 'Takeoff Drills', description: 'Focus on explosive takeoff techniques', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build leg and core strength', priority: 'high', impact: 80 },
            { type: 'Tactical', title: 'Approach Drills', description: 'Study and practice optimal approach angles', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Shot Put') {
          return [
            { type: 'Technical', title: 'Throwing Drills', description: 'Focus on explosive throwing techniques', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build overall body strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Positioning', description: 'Study and practice optimal throwing positions', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Hockey
      case 'Hockey':
        if (position === 'Forward') {
          return [
            { type: 'Technical', title: 'Shooting Drills', description: 'Focus on accurate and powerful shots', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Speed Training', description: 'Improve sprint speed and agility', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Positioning', description: 'Study and practice optimal positioning', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Midfielder') {
          return [
            { type: 'Technical', title: 'Passing Drills', description: 'Focus on accurate and quick passes', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Improve stamina for sustained performance', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Positional Awareness', description: 'Study and practice optimal positioning', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Defender') {
          return [
            { type: 'Technical', title: 'Tackling Drills', description: 'Practice clean and effective tackles', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Strength Training', description: 'Build upper body and core strength', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Defensive Positioning', description: 'Study and practice optimal defensive positioning', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { type: 'Technical', title: 'Shot Stopping Drills', description: 'Practice saving shots from various angles', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Reaction Training', description: 'Improve reflexes and reaction time', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Command of Area', description: 'Study and practice organizing the defense', priority: 'medium', impact: 80 },
          ];
        }
        break;
  
      // Swimming
      case 'Swimming':
        if (position === 'Freestyle') {
          return [
            { type: 'Technical', title: 'Stroke Efficiency', description: 'Focus on reducing drag and improving form', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Increase swimming stamina', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Race Strategy', description: 'Optimize pacing and turns', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Butterfly') {
          return [
            { type: 'Technical', title: 'Stroke Efficiency', description: 'Focus on reducing drag and improving form', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Increase swimming stamina', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Race Strategy', description: 'Optimize pacing and turns', priority: 'medium', impact: 70 },
          ];
        } else if (position === 'Backstroke') {
          return [
            { type: 'Technical', title: 'Stroke Efficiency', description: 'Focus on reducing drag and improving form', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Increase swimming stamina', priority: 'high', impact: 90 },
            { type: 'Tactical', title: 'Race Strategy', description: 'Optimize pacing and turns', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Breaststroke') {
          return [
            { type: 'Technical', title: 'Stroke Efficiency', description: 'Focus on reducing drag and improving form', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Increase swimming stamina', priority: 'high', impact: 95 },
            { type: 'Tactical', title: 'Race Strategy', description: 'Optimize pacing and turns', priority: 'medium', impact: 80 },
          ];
        } else if (position === 'Individual Medley') {
          return [
            { type: 'Technical', title: 'Stroke Efficiency', description: 'Focus on reducing drag and improving form', priority: 'high', impact: 90 },
            { type: 'Physical', title: 'Endurance Training', description: 'Increase swimming stamina', priority: 'high', impact: 85 },
            { type: 'Tactical', title: 'Race Strategy', description: 'Optimize pacing and turns', priority: 'medium', impact: 90 },
          ];
        }
        break;
  
      // Default case for unsupported sports
      default:
        return [];
    }
    return [];
  };

  const generatePerformanceInsights = (sport: string, position: string): PerformanceInsight[] => {
    switch (sport) {
      // Football (Soccer)
      case 'Football':
        if (position === 'Forward') {
          return [
            { metric: 'Goal Conversion Rate', value: 75, change: 5, trend: 'up', recommendation: 'Continue focusing on first-touch finishing' },
            { metric: 'Sprint Recovery', value: 82, change: -2, trend: 'down', recommendation: 'Increase rest periods between high-intensity runs' },
            { metric: 'Positioning', value: 88, change: 3, trend: 'up', recommendation: 'Maintain current off-ball movement patterns' },
          ];
        } else if (position === 'Midfielder') {
          return [
            { metric: 'Passing Accuracy', value: 90, change: 2, trend: 'up', recommendation: 'Focus on quick, accurate passes' },
            { metric: 'Tackling Success Rate', value: 85, change: -1, trend: 'down', recommendation: 'Improve timing and positioning in tackles' },
            { metric: 'Distance Covered', value: 88, change: 3, trend: 'up', recommendation: 'Maintain high work rate during matches' },
          ];
        } else if (position === 'Defender') {
          return [
            { metric: 'Tackling Success Rate', value: 88, change: 2, trend: 'up', recommendation: 'Focus on clean and effective tackles' },
            { metric: 'Aerial Duels Won', value: 85, change: -1, trend: 'down', recommendation: 'Improve timing and jumping ability' },
            { metric: 'Interceptions', value: 82, change: 3, trend: 'up', recommendation: 'Maintain awareness of opponent movements' },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { metric: 'Save Percentage', value: 90, change: 2, trend: 'up', recommendation: 'Focus on shot-stopping techniques' },
            { metric: 'Clean Sheets', value: 12, change: 1, trend: 'up', recommendation: 'Maintain strong communication with defenders' },
            { metric: 'Distribution Accuracy', value: 85, change: -1, trend: 'down', recommendation: 'Improve passing accuracy under pressure' },
          ];
        }
        break;
  
      // Basketball
      case 'Basketball':
        if (position === 'Point Guard') {
          return [
            { metric: 'Assists per Game', value: 8.5, change: 0.5, trend: 'up', recommendation: 'Continue creating scoring opportunities for teammates' },
            { metric: 'Turnovers per Game', value: 3.2, change: -0.2, trend: 'down', recommendation: 'Improve ball security under pressure' },
            { metric: 'Three-Point Percentage', value: 38, change: 2, trend: 'up', recommendation: 'Maintain consistent shooting form' },
          ];
        } else if (position === 'Shooting Guard') {
          return [
            { metric: 'Points per Game', value: 22.5, change: 1.5, trend: 'up', recommendation: 'Focus on efficient scoring' },
            { metric: 'Three-Point Percentage', value: 40, change: -1, trend: 'down', recommendation: 'Improve shot selection' },
            { metric: 'Defensive Rebounds', value: 4.5, change: 0.5, trend: 'up', recommendation: 'Maintain strong positioning under the basket' },
          ];
        } else if (position === 'Small Forward') {
          return [
            { metric: 'Points per Game', value: 18.5, change: 1.0, trend: 'up', recommendation: 'Focus on versatile scoring' },
            { metric: 'Steals per Game', value: 1.8, change: -0.2, trend: 'down', recommendation: 'Improve defensive anticipation' },
            { metric: 'Assists per Game', value: 4.5, change: 0.5, trend: 'up', recommendation: 'Continue creating opportunities for teammates' },
          ];
        } else if (position === 'Power Forward') {
          return [
            { metric: 'Rebounds per Game', value: 10.5, change: 0.5, trend: 'up', recommendation: 'Focus on boxing out and positioning' },
            { metric: 'Blocks per Game', value: 2.0, change: -0.3, trend: 'down', recommendation: 'Improve timing and vertical leap' },
            { metric: 'Field Goal Percentage', value: 55, change: 2, trend: 'up', recommendation: 'Maintain efficient shooting' },
          ];
        } else if (position === 'Center') {
          return [
            { metric: 'Rebounds per Game', value: 12.0, change: 0.5, trend: 'up', recommendation: 'Focus on positioning and timing' },
            { metric: 'Blocks per Game', value: 2.5, change: -0.2, trend: 'down', recommendation: 'Improve defensive awareness' },
            { metric: 'Free Throw Percentage', value: 75, change: 3, trend: 'up', recommendation: 'Practice free throws under pressure' },
          ];
        }
        break;
  
      // Tennis
      case 'Tennis':
        if (position === 'Singles Player') {
          return [
            { metric: 'First Serve Percentage', value: 65, change: 2, trend: 'up', recommendation: 'Focus on consistent first serves' },
            { metric: 'Break Points Saved', value: 70, change: -1, trend: 'down', recommendation: 'Improve mental toughness in key moments' },
            { metric: 'Winners per Match', value: 25, change: 3, trend: 'up', recommendation: 'Maintain aggressive playstyle' },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { metric: 'Net Points Won', value: 75, change: 2, trend: 'up', recommendation: 'Focus on quick net exchanges' },
            { metric: 'Communication Errors', value: 5, change: -1, trend: 'down', recommendation: 'Improve coordination with your partner' },
            { metric: 'Serve Accuracy', value: 85, change: 1, trend: 'up', recommendation: 'Maintain consistent serves' },
          ];
        }
        break;
  
      // Boxing
      case 'Boxing':
        if (position === 'Lightweight') {
          return [
            { metric: 'Punch Accuracy', value: 85, change: 2, trend: 'up', recommendation: 'Focus on precise and powerful punches' },
            { metric: 'Defensive Efficiency', value: 80, change: -1, trend: 'down', recommendation: 'Improve blocking and dodging' },
            { metric: 'Stamina', value: 88, change: 3, trend: 'up', recommendation: 'Maintain high endurance levels' },
          ];
        } else if (position === 'Middleweight') {
          return [
            { metric: 'Power Punching', value: 90, change: 2, trend: 'up', recommendation: 'Focus on delivering knockout punches' },
            { metric: 'Ring Control', value: 85, change: -1, trend: 'down', recommendation: 'Improve movement and positioning in the ring' },
            { metric: 'Counter-Punching', value: 82, change: 3, trend: 'up', recommendation: 'Practice countering opponent moves' },
          ];
        } else if (position === 'Heavyweight') {
          return [
            { metric: 'Knockout Power', value: 95, change: 2, trend: 'up', recommendation: 'Focus on delivering powerful punches' },
            { metric: 'Defensive Skills', value: 85, change: -1, trend: 'down', recommendation: 'Improve blocking and dodging' },
            { metric: 'Stamina', value: 80, change: 3, trend: 'up', recommendation: 'Maintain high endurance levels' },
          ];
        }
        break;
  
      // Badminton
      case 'Badminton':
        if (position === 'Singles Player') {
          return [
            { metric: 'Serve Accuracy', value: 85, change: 2, trend: 'up', recommendation: 'Focus on consistent and deceptive serves' },
            { metric: 'Smash Success Rate', value: 80, change: -1, trend: 'down', recommendation: 'Improve smash technique' },
            { metric: 'Footwork Efficiency', value: 88, change: 3, trend: 'up', recommendation: 'Maintain quick and precise movement' },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { metric: 'Net Play Success Rate', value: 85, change: 2, trend: 'up', recommendation: 'Focus on quick net exchanges' },
            { metric: 'Communication Errors', value: 5, change: -1, trend: 'down', recommendation: 'Improve coordination with your partner' },
            { metric: 'Serve Accuracy', value: 90, change: 1, trend: 'up', recommendation: 'Maintain consistent serves' },
          ];
        } else if (position === 'Mixed Doubles') {
          return [
            { metric: 'Coordination', value: 85, change: 2, trend: 'up', recommendation: 'Focus on adapting to different playstyles' },
            { metric: 'Net Play Success Rate', value: 80, change: -1, trend: 'down', recommendation: 'Improve quick net exchanges' },
            { metric: 'Serve Accuracy', value: 88, change: 3, trend: 'up', recommendation: 'Maintain consistent serves' },
          ];
        }
        break;
  
      // Cricket
      case 'Cricket':
        if (position === 'Batsman') {
          return [
            { metric: 'Batting Average', value: 45, change: 2, trend: 'up', recommendation: 'Focus on shot selection and timing' },
            { metric: 'Strike Rate', value: 130, change: -5, trend: 'down', recommendation: 'Improve scoring efficiency' },
            { metric: 'Boundary Percentage', value: 25, change: 3, trend: 'up', recommendation: 'Maintain aggressive playstyle' },
          ];
        } else if (position === 'Bowler') {
          return [
            { metric: 'Economy Rate', value: 5.5, change: -0.2, trend: 'up', recommendation: 'Focus on consistent line and length' },
            { metric: 'Wicket-Taking Ability', value: 3.0, change: 0.5, trend: 'up', recommendation: 'Improve variation and accuracy' },
            { metric: 'Dot Ball Percentage', value: 40, change: -1, trend: 'down', recommendation: 'Focus on building pressure' },
          ];
        } else if (position === 'All-rounder') {
          return [
            { metric: 'Batting Average', value: 35, change: 2, trend: 'up', recommendation: 'Focus on consistent scoring' },
            { metric: 'Bowling Average', value: 30, change: -1, trend: 'up', recommendation: 'Improve wicket-taking ability' },
            { metric: 'Fielding Efficiency', value: 85, change: 3, trend: 'up', recommendation: 'Maintain strong fielding performance' },
          ];
        } else if (position === 'Wicket Keeper') {
          return [
            { metric: 'Catching Success Rate', value: 90, change: 2, trend: 'up', recommendation: 'Focus on clean catches' },
            { metric: 'Stumping Success Rate', value: 85, change: -1, trend: 'down', recommendation: 'Improve quick reflexes' },
            { metric: 'Batting Average', value: 30, change: 3, trend: 'up', recommendation: 'Maintain consistent scoring' },
          ];
        }
        break;
  
      // Rugby
      case 'Rugby':
        if (position === 'Forward') {
          return [
            { metric: 'Tackles per Game', value: 15, change: 1, trend: 'up', recommendation: 'Focus on clean and effective tackles' },
            { metric: 'Rucks Won', value: 85, change: -2, trend: 'down', recommendation: 'Improve rucking technique' },
            { metric: 'Lineout Success Rate', value: 90, change: 3, trend: 'up', recommendation: 'Maintain strong lineout performance' },
          ];
        } else if (position === 'Back') {
          return [
            { metric: 'Try Assists', value: 5, change: 1, trend: 'up', recommendation: 'Focus on creating scoring opportunities' },
            { metric: 'Defensive Errors', value: 3, change: -1, trend: 'down', recommendation: 'Improve defensive positioning' },
            { metric: 'Meters Gained', value: 120, change: 10, trend: 'up', recommendation: 'Maintain strong running lines' },
          ];
        } else if (position === 'Scrum-half') {
          return [
            { metric: 'Pass Accuracy', value: 90, change: 2, trend: 'up', recommendation: 'Focus on quick and accurate passes' },
            { metric: 'Kicking Accuracy', value: 85, change: -1, trend: 'down', recommendation: 'Improve kicking technique' },
            { metric: 'Tackles per Game', value: 10, change: 1, trend: 'up', recommendation: 'Maintain strong defensive performance' },
          ];
        } else if (position === 'Fly-half') {
          return [
            { metric: 'Kicking Accuracy', value: 85, change: 2, trend: 'up', recommendation: 'Focus on accurate and powerful kicks' },
            { metric: 'Decision Making', value: 90, change: -1, trend: 'down', recommendation: 'Improve game management' },
            { metric: 'Try Assists', value: 6, change: 1, trend: 'up', recommendation: 'Continue creating scoring opportunities' },
          ];
        }
        break;
  
      // Athletics (Track and Field)
      case 'Athletics':
        if (position === 'Sprinter') {
          return [
            { metric: '100m Time', value: 10.5, change: -0.1, trend: 'up', recommendation: 'Focus on explosive starts' },
            { metric: 'Reaction Time', value: 0.15, change: -0.01, trend: 'up', recommendation: 'Improve reaction off the blocks' },
            { metric: 'Stride Length', value: 2.5, change: 0.1, trend: 'up', recommendation: 'Maintain strong running form' },
          ];
        } else if (position === 'Long Distance') {
          return [
            { metric: 'Marathon Time', value: 180, change: -5, trend: 'up', recommendation: 'Focus on pacing and endurance' },
            { metric: 'Heart Rate Recovery', value: 85, change: 2, trend: 'up', recommendation: 'Improve recovery between intervals' },
            { metric: 'Pacing Consistency', value: 90, change: -1, trend: 'down', recommendation: 'Maintain consistent speed' },
          ];
        } else if (position === 'High Jump') {
          return [
            { metric: 'Jump Height', value: 2.2, change: 0.05, trend: 'up', recommendation: 'Focus on explosive takeoff' },
            { metric: 'Approach Speed', value: 9.0, change: -0.1, trend: 'up', recommendation: 'Improve approach technique' },
            { metric: 'Landing Success Rate', value: 85, change: 2, trend: 'up', recommendation: 'Maintain strong landing form' },
          ];
        } else if (position === 'Long Jump') {
          return [
            { metric: 'Jump Distance', value: 7.5, change: 0.1, trend: 'up', recommendation: 'Focus on explosive takeoff' },
            { metric: 'Approach Speed', value: 9.5, change: -0.1, trend: 'up', recommendation: 'Improve approach technique' },
            { metric: 'Landing Success Rate', value: 90, change: 2, trend: 'up', recommendation: 'Maintain strong landing form' },
          ];
        } else if (position === 'Shot Put') {
          return [
            { metric: 'Throw Distance', value: 18.0, change: 0.2, trend: 'up', recommendation: 'Focus on explosive power' },
            { metric: 'Technique Score', value: 85, change: 2, trend: 'up', recommendation: 'Improve throwing technique' },
            { metric: 'Consistency', value: 90, change: -1, trend: 'down', recommendation: 'Maintain consistent performance' },
          ];
        }
        break;
  
      // Hockey
      case 'Hockey':
        if (position === 'Forward') {
          return [
            { metric: 'Goals per Game', value: 1.5, change: 0.2, trend: 'up', recommendation: 'Focus on accurate shooting' },
            { metric: 'Assists per Game', value: 1.0, change: -0.1, trend: 'down', recommendation: 'Improve passing accuracy' },
            { metric: 'Shooting Accuracy', value: 85, change: 2, trend: 'up', recommendation: 'Maintain strong shooting form' },
          ];
        } else if (position === 'Midfielder') {
          return [
            { metric: 'Pass Accuracy', value: 90, change: 2, trend: 'up', recommendation: 'Focus on quick and accurate passes' },
            { metric: 'Tackles per Game', value: 5, change: -1, trend: 'down', recommendation: 'Improve defensive positioning' },
            { metric: 'Distance Covered', value: 10.5, change: 0.5, trend: 'up', recommendation: 'Maintain high work rate' },
          ];
        } else if (position === 'Defender') {
          return [
            { metric: 'Tackles per Game', value: 8, change: 1, trend: 'up', recommendation: 'Focus on clean and effective tackles' },
            { metric: 'Interceptions per Game', value: 3, change: -0.5, trend: 'down', recommendation: 'Improve anticipation' },
            { metric: 'Clearances per Game', value: 10, change: 1, trend: 'up', recommendation: 'Maintain strong defensive play' },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { metric: 'Save Percentage', value: 90, change: 2, trend: 'up', recommendation: 'Focus on shot-stopping techniques' },
            { metric: 'Clean Sheets', value: 12, change: 1, trend: 'up', recommendation: 'Maintain strong communication with defenders' },
            { metric: 'Distribution Accuracy', value: 85, change: -1, trend: 'down', recommendation: 'Improve passing accuracy under pressure' },
          ];
        }
        break;
  
      // Swimming
      case 'Swimming':
        if (position === 'Freestyle') {
          return [
            { metric: '50m Time', value: 23.5, change: -0.2, trend: 'up', recommendation: 'Focus on explosive starts and turns' },
            { metric: 'Stroke Efficiency', value: 85, change: 2, trend: 'up', recommendation: 'Improve form and reduce drag' },
            { metric: 'Endurance', value: 88, change: -1, trend: 'down', recommendation: 'Increase stamina for longer races' },
          ];
        } else if (position === 'Butterfly') {
          return [
            { metric: '100m Time', value: 52.0, change: -0.5, trend: 'up', recommendation: 'Focus on stroke efficiency' },
            { metric: 'Underwater Kicks', value: 85, change: 2, trend: 'up', recommendation: 'Improve underwater technique' },
            { metric: 'Endurance', value: 80, change: -1, trend: 'down', recommendation: 'Increase stamina for longer races' },
          ];
        } else if (position === 'Backstroke') {
          return [
            { metric: '100m Time', value: 55.0, change: -0.3, trend: 'up', recommendation: 'Focus on stroke efficiency' },
            { metric: 'Turn Efficiency', value: 85, change: 2, trend: 'up', recommendation: 'Improve flip turns' },
            { metric: 'Endurance', value: 82, change: -1, trend: 'down', recommendation: 'Increase stamina for longer races' },
          ];
        } else if (position === 'Breaststroke') {
          return [
            { metric: '100m Time', value: 58.0, change: -0.4, trend: 'up', recommendation: 'Focus on stroke efficiency' },
            { metric: 'Kick Power', value: 85, change: 2, trend: 'up', recommendation: 'Improve leg strength' },
            { metric: 'Endurance', value: 80, change: -1, trend: 'down', recommendation: 'Increase stamina for longer races' },
          ];
        } else if (position === 'Individual Medley') {
          return [
            { metric: '200m Time', value: 120.0, change: -1.0, trend: 'up', recommendation: 'Focus on transitions between strokes' },
            { metric: 'Stroke Efficiency', value: 85, change: 2, trend: 'up', recommendation: 'Improve form and reduce drag' },
            { metric: 'Endurance', value: 82, change: -1, trend: 'down', recommendation: 'Increase stamina for longer races' },
          ];
        }
        break;
  
      // Default case for unsupported sports
      default:
        return [];
    }
    return [];
  };

  const generateMealPlans = (sport: string, position: string): MealPlan[] => {
    switch (sport) {
      // Football (Soccer)
      case 'Football':
        if (position === 'Forward') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2500 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2600 },
            { day: 'Wednesday', meals: ['Greek yogurt with granola', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2700 },
            { day: 'Thursday', meals: ['Scrambled eggs with spinach', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2600 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2500 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2400 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        } else if (position === 'Midfielder') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2600 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2500 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        } else if (position === 'Defender') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2600 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2700 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { day: 'Monday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
            { day: 'Tuesday', meals: ['Protein pancakes with maple syrup', 'Chicken Caesar salad', 'Beef and broccoli with rice'], calories: 3100 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Friday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2600 },
            { day: 'Saturday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2500 },
            { day: 'Sunday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
          ];
        }
        break;
  
      // Basketball
      case 'Basketball':
        if (position === 'Point Guard') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2500 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2600 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        } else if (position === 'Center') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2600 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2500 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        } else if (position === 'Shooting Guard') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2600 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2800 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2700 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2600 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2700 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3100 },
          ];
        } else if (position === 'Small Forward') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2700 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2800 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2900 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2800 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2700 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2800 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3200 },
          ];
        } else if (position === 'Power Forward') {
          return [
            { day: 'Monday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2900 },
            { day: 'Tuesday', meals: ['Protein pancakes with maple syrup', 'Chicken Caesar salad', 'Beef and broccoli with rice'], calories: 3000 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3100 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3000 },
            { day: 'Friday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2900 },
            { day: 'Saturday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3000 },
            { day: 'Sunday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3100 },
          ];
        }
        break;
  
      // Tennis
      case 'Tennis':
        if (position === 'Singles Player') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2600 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2700 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2600 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2500 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        }
        break;
  
      // Boxing
      case 'Boxing':
        if (position === 'Lightweight') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2200 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2300 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2400 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2300 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2200 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2300 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2500 },
          ];
        } else if (position === 'Heavyweight') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3000 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3100 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3200 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3100 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3000 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3100 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3300 },
          ];
        } else if (position === 'Middleweight') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2600 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2700 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2800 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2700 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2600 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2700 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2900 },
          ];
        }
        break;
  
      // Badminton
      case 'Badminton':
        if (position === 'Singles Player') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2400 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2500 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2600 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2500 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2700 },
          ];
        } else if (position === 'Doubles Specialist') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2600 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2500 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2400 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2500 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2700 },
          ];
        } else if (position === 'Mixed Doubles') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2500 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2600 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2700 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2600 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2500 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2600 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2800 },
          ];
        } 
        break;
  
      // Cricket
      case 'Cricket':
        if (position === 'Batsman') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2800 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2900 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3000 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2900 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2800 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2900 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3100 },
          ];
        } else if (position === 'Bowler') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3000 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3100 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3200 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3100 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3000 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3100 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3300 },
          ];
        } else if (position === 'All-rounder') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2900 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3000 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3100 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3000 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2900 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3000 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3200 },
          ];
        } else if (position === 'Wicket Keeper') {
          return [
            { day: 'Monday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2700 },
            { day: 'Tuesday', meals: ['Protein pancakes with maple syrup', 'Chicken Caesar salad', 'Beef and broccoli with rice'], calories: 2800 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2900 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2800 },
            { day: 'Friday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2700 },
            { day: 'Saturday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2800 },
            { day: 'Sunday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3000 },
          ];
        }
        break;
  
      // Rugby
      case 'Rugby':
        if (position === 'Forward') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3500 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3600 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3700 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3600 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3500 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3600 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3800 },
          ];
        } else if (position === 'Back') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3400 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3500 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3600 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3500 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3700 },
          ];
        } else if (position === 'Scrum-half') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3300 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3400 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3500 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3400 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3300 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3400 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3600 },
          ];
        } else if (position === 'Fly-half') {
          return [
            { day: 'Monday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3200 },
            { day: 'Tuesday', meals: ['Protein pancakes with maple syrup', 'Chicken Caesar salad', 'Beef and broccoli with rice'], calories: 3300 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3400 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3300 },
            { day: 'Friday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3200 },
            { day: 'Saturday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3300 },
            { day: 'Sunday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3500 },
          ];
        }
        break;
  
      // Athletics
      case 'Athletics':
        if (position === 'Sprinter') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2800 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2900 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3000 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2900 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2800 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2900 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3100 },
          ];
        } else if (position === 'Long Distance') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3200 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3300 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3400 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3300 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3200 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3300 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3500 },
          ];
        } else if (position === 'High Jump') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2700 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2800 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2900 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2800 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2700 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2800 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
          ];
        } else if (position === 'Long Jump') {
          return [
            { day: 'Monday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2900 },
            { day: 'Tuesday', meals: ['Protein pancakes with maple syrup', 'Chicken Caesar salad', 'Beef and broccoli with rice'], calories: 3000 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3100 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3000 },
            { day: 'Friday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2900 },
            { day: 'Saturday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3000 },
            { day: 'Sunday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3200 },
          ];
        } else if (position === 'Shot Put') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3400 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3500 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3600 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3500 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3400 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3500 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3700 },
          ];
        }
        break;
  
      // Hockey
      case 'Hockey':
        if (position === 'Forward') {
          return [
            { day: 'Monday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3000 },
            { day: 'Tuesday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3100 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3200 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3100 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3000 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3100 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3300 },
          ];
        } else if (position === 'Goalkeeper') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2800 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2900 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3000 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2900 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2800 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 2900 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3100 },
          ];
        } else if (position === 'Midfielder') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3200 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3300 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3400 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3300 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3200 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3300 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3500 },
          ];
        } else if (position === 'Defender') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3100 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3200 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3300 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3200 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3100 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3200 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3400 },
          ];
        }
        break;
  
      // Swimming
      case 'Swimming':
        if (position === 'Freestyle') {
          return [
            { day: 'Monday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3000 },
            { day: 'Tuesday', meals: ['Protein pancakes with maple syrup', 'Chicken Caesar salad', 'Beef and broccoli with rice'], calories: 3100 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3200 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3100 },
            { day: 'Friday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3000 },
            { day: 'Saturday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3100 },
            { day: 'Sunday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3200 },
          ];
        } else if (position === 'Butterfly') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3100 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3200 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3300 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3200 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3100 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3200 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3400 },
          ];
        } else if (position === 'Backstroke') {
          return [
            { day: 'Monday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 2900 },
            { day: 'Tuesday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3000 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3100 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3000 },
            { day: 'Friday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 2900 },
            { day: 'Saturday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3000 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3200 },
          ];
        } else if (position === 'Breaststroke') {
          return [
            { day: 'Monday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 2800 },
            { day: 'Tuesday', meals: ['Protein pancakes with maple syrup', 'Chicken Caesar salad', 'Beef and broccoli with rice'], calories: 2900 },
            { day: 'Wednesday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3000 },
            { day: 'Thursday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 2900 },
            { day: 'Friday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 2800 },
            { day: 'Saturday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 2900 },
            { day: 'Sunday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3100 },
          ];
        } else if (position === 'Individual Medley') {
          return [
            { day: 'Monday', meals: ['Scrambled eggs with spinach', 'Grilled fish with vegetables', 'Pasta with lean meat sauce'], calories: 3300 },
            { day: 'Tuesday', meals: ['Greek yogurt with berries', 'Chicken salad with avocado', 'Stir-fried tofu with rice'], calories: 3400 },
            { day: 'Wednesday', meals: ['Oatmeal with fruits', 'Grilled chicken with quinoa', 'Salmon with sweet potatoes'], calories: 3500 },
            { day: 'Thursday', meals: ['Protein smoothie', 'Turkey sandwich with veggies', 'Beef stir-fry with brown rice'], calories: 3400 },
            { day: 'Friday', meals: ['Whole grain toast with peanut butter', 'Grilled chicken with mixed greens', 'Quinoa with roasted vegetables'], calories: 3300 },
            { day: 'Saturday', meals: ['Smoothie bowl with granola', 'Tuna salad wrap', 'Grilled salmon with asparagus'], calories: 3400 },
            { day: 'Sunday', meals: ['Oatmeal with banana and honey', 'Grilled turkey burger with sweet potato fries', 'Shrimp stir-fry with noodles'], calories: 3600 },
          ];
        }
        break;
  
      // Default case for unsupported sports
      default:
        return [];
    }
    return [];
  };
  
  const generateRecoveryPlans = (sport: string, position: string): RecoveryPlan[] => {
    switch (sport) {
      // Football (Soccer)
      case 'Football':
        switch (position) {
          case 'Forward':
          case 'Midfielder':
          case 'Defender':
          case 'Goalkeeper':
            return [
              { type: 'Sleep Optimization', description: 'Ensure 8-9 hours of quality sleep', duration: 'Daily', benefits: ['Improved recovery', 'Enhanced focus'] },
              { type: 'Physiotherapy', description: 'Weekly sessions for muscle recovery', duration: 'Weekly', benefits: ['Reduced injury risk', 'Improved flexibility'] },
              { type: 'Active Recovery', description: 'Light jogging and stretching', duration: 'Weekly', benefits: ['Reduced muscle soreness', 'Improved circulation'] },
            ];
          default:
            return [];
        }
  
      // Basketball
      case 'Basketball':
        switch (position) {
          case 'Point Guard':
          case 'Shooting Guard':
          case 'Small Forward':
          case 'Power Forward':
          case 'Center':
            return [
              { type: 'Active Recovery', description: 'Light shooting and stretching sessions', duration: 'Weekly', benefits: ['Improved muscle recovery', 'Reduced soreness'] },
              { type: 'Hydration Plan', description: 'Maintain optimal hydration levels', duration: 'Daily', benefits: ['Improved performance', 'Reduced fatigue'] },
              { type: 'Massage Therapy', description: 'Weekly deep tissue massages', duration: 'Weekly', benefits: ['Reduced muscle tension', 'Improved recovery'] },
            ];
          default:
            return [];
        }
  
      // Tennis
      case 'Tennis':
        switch (position) {
          case 'Singles Player':
          case 'Doubles Specialist':
            return [
              { type: 'Foam Rolling', description: 'Daily foam rolling sessions', duration: 'Daily', benefits: ['Improved muscle recovery', 'Reduced tightness'] },
              { type: 'Mental Recovery', description: 'Meditation and visualization exercises', duration: 'Weekly', benefits: ['Improved focus', 'Reduced stress'] },
              { type: 'Stretching Routine', description: 'Dynamic stretches before and after matches', duration: 'Daily', benefits: ['Improved flexibility', 'Reduced injury risk'] },
            ];
          default:
            return [];
        }
  
      // Boxing
      case 'Boxing':
        switch (position) {
          case 'Lightweight':
          case 'Middleweight':
          case 'Heavyweight':
            return [
              { type: 'Cold Therapy', description: 'Ice baths after intense training', duration: 'Weekly', benefits: ['Reduced inflammation', 'Improved recovery'] },
              { type: 'Active Recovery', description: 'Light shadowboxing and stretching', duration: 'Weekly', benefits: ['Reduced soreness', 'Improved mobility'] },
              { type: 'Sleep Optimization', description: 'Ensure 8-9 hours of quality sleep', duration: 'Daily', benefits: ['Enhanced recovery', 'Improved focus'] },
            ];
          default:
            return [];
        }
  
      // Badminton
      case 'Badminton':
        switch (position) {
          case 'Singles Player':
          case 'Doubles Specialist':
          case 'Mixed Doubles':
            return [
              { type: 'Stretching Routine', description: 'Daily stretching for flexibility', duration: 'Daily', benefits: ['Improved range of motion', 'Reduced injury risk'] },
              { type: 'Foam Rolling', description: 'Daily foam rolling sessions', duration: 'Daily', benefits: ['Reduced muscle tightness', 'Improved recovery'] },
              { type: 'Hydration Plan', description: 'Maintain optimal hydration levels', duration: 'Daily', benefits: ['Improved performance', 'Reduced fatigue'] },
            ];
          default:
            return [];
        }
  
      // Cricket
      case 'Cricket':
        switch (position) {
          case 'Batsman':
          case 'Bowler':
          case 'All-rounder':
          case 'Wicket Keeper':
            return [
              { type: 'Active Recovery', description: 'Light jogging and stretching', duration: 'Weekly', benefits: ['Reduced muscle soreness', 'Improved circulation'] },
              { type: 'Massage Therapy', description: 'Weekly deep tissue massages', duration: 'Weekly', benefits: ['Reduced muscle tension', 'Improved recovery'] },
              { type: 'Sleep Optimization', description: 'Ensure 8-9 hours of quality sleep', duration: 'Daily', benefits: ['Enhanced recovery', 'Improved focus'] },
            ];
          default:
            return [];
        }
  
      // Rugby
      case 'Rugby':
        switch (position) {
          case 'Forward':
          case 'Back':
          case 'Scrum-half':
          case 'Fly-half':
            return [
              { type: 'Cold Therapy', description: 'Ice baths after matches', duration: 'Weekly', benefits: ['Reduced inflammation', 'Improved recovery'] },
              { type: 'Physiotherapy', description: 'Weekly sessions for muscle recovery', duration: 'Weekly', benefits: ['Reduced injury risk', 'Improved flexibility'] },
              { type: 'Active Recovery', description: 'Light jogging and stretching', duration: 'Weekly', benefits: ['Reduced muscle soreness', 'Improved circulation'] },
            ];
          default:
            return [];
        }
  
      // Athletics
      case 'Athletics':
        switch (position) {
          case 'Sprinter':
          case 'Long Distance':
          case 'High Jump':
          case 'Long Jump':
          case 'Shot Put':
            return [
              { type: 'Foam Rolling', description: 'Daily foam rolling sessions', duration: 'Daily', benefits: ['Improved muscle recovery', 'Reduced tightness'] },
              { type: 'Stretching Routine', description: 'Dynamic stretches before and after training', duration: 'Daily', benefits: ['Improved flexibility', 'Reduced injury risk'] },
              { type: 'Sleep Optimization', description: 'Ensure 8-9 hours of quality sleep', duration: 'Daily', benefits: ['Enhanced recovery', 'Improved focus'] },
            ];
          default:
            return [];
        }
  
      // Hockey
      case 'Hockey':
        switch (position) {
          case 'Forward':
          case 'Midfielder':
          case 'Defender':
          case 'Goalkeeper':
            return [
              { type: 'Cold Therapy', description: 'Ice baths after intense sessions', duration: 'Weekly', benefits: ['Reduced inflammation', 'Improved recovery'] },
              { type: 'Active Recovery', description: 'Light skating and stretching', duration: 'Weekly', benefits: ['Reduced muscle soreness', 'Improved circulation'] },
              { type: 'Massage Therapy', description: 'Weekly deep tissue massages', duration: 'Weekly', benefits: ['Reduced muscle tension', 'Improved recovery'] },
            ];
          default:
            return [];
        }
  
      // Swimming
      case 'Swimming':
        switch (position) {
          case 'Freestyle':
          case 'Butterfly':
          case 'Backstroke':
          case 'Breaststroke':
          case 'Individual Medley':
            return [
              { type: 'Cold Therapy', description: 'Ice baths after intense sessions', duration: 'Weekly', benefits: ['Reduced inflammation', 'Improved recovery'] },
              { type: 'Stretching Routine', description: 'Daily stretching for flexibility', duration: 'Daily', benefits: ['Improved range of motion', 'Reduced injury risk'] },
              { type: 'Hydration Plan', description: 'Maintain optimal hydration levels', duration: 'Daily', benefits: ['Improved performance', 'Reduced fatigue'] },
            ];
          default:
            return [];
        }
  
      // Default case for unsupported sports
      default:
        return [];
    }
  };

  const updateMetricsInRealTime = () => {
    setDevelopmentMetrics((prev) =>
      prev.map((metric) => ({
        ...metric,
        current: Math.min(100, Math.max(0, metric.current + (Math.random() * 2 - 1))),
        improvement: metric.improvement + (Math.random() * 0.5 - 0.25),
      }))
    );

    setPerformanceInsights((prev) =>
      prev.map((insight) => ({
        ...insight,
        value: Math.min(100, Math.max(0, insight.value + (Math.random() * 2 - 1))),
        change: insight.change + (Math.random() * 0.5 - 0.25),
      }))
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp className="text-green-500" />;
      case 'down':
        return <FaArrowDown className="text-red-500" />;
      default:
        return <FaMinus className="text-yellow-500" />;
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 85) return 'bg-green-500';
    if (value >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Performance Insights</h1>
          <p className="text-gray-400">
            Advanced analytics and recommendations for {athleteData.sport} - {athleteData.position}
          </p>
        </div>
      </div>

      {/* Development Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {developmentMetrics.map((metric, index) => (
          <div key={index} className="bg-white/10 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{metric.category}</h3>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="text-3xl font-bold mb-2">{metric.current.toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(metric.current)}`}
                style={{ width: `${metric.current}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Target: {metric.target}%</span>
              <span className={metric.improvement > 0 ? 'text-green-500' : 'text-red-500'}>
                {metric.improvement > 0 ? '+' : ''}{metric.improvement.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* AI Training Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaRobot className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">AI Training Recommendations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <FaDumbbell className="text-primary" />
                <h3 className="font-semibold">{rec.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">{rec.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  rec.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                  rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-green-500/20 text-green-500'
                }`}>
                  {rec.priority.toUpperCase()}
                </span>
                <span className="text-sm text-gray-400">Impact: {rec.impact}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Meal Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaAppleAlt className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">Personalized Meal Plans</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">{plan.day}</h3>
              <ul className="text-sm text-gray-400 mb-3">
                {plan.meals.map((meal, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaFire className="text-yellow-500" />
                    {meal}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-400">Calories: {plan.calories}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recovery Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaBed className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">Recovery Plans</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recoveryPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">{plan.type}</h3>
              <p className="text-sm text-gray-400 mb-3">{plan.description}</p>
              <div className="text-sm text-gray-400">
                <span className="font-semibold">Duration:</span> {plan.duration}
              </div>
              <ul className="text-sm text-gray-400">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaSmile className="text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaChartLine className="text-primary text-2xl" />
            <h2 className="text-xl font-semibold">Performance Timeline</h2>
          </div>
          <div className="flex gap-2">
            {['week'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe as any)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceInsights}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="metric" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid #666'
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#646cff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Development Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaGraduationCap className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">Development Pathway</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Short-term Goals (1-3 months)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaStopwatch className="text-yellow-500" />
                <span>Improve sprint speed by 5%</span>
              </div>
              <div className="flex items-center gap-2">
                <FaDumbbell className="text-blue-500" />
                <span>Increase strength metrics by 8%</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBrain className="text-purple-500" />
                <span>Enhanced decision-making speed</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Long-term Vision (6-12 months)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                <span>Achieve professional team selection</span>
              </div>
              <div className="flex items-center gap-2">
                <FaChartLine className="text-green-500" />
                <span>Consistent match performance above 85%</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserTie className="text-blue-500" />
                <span>Leadership role development</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Motivational Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaBrain className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">Motivational Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Performance Mindset</h3>
            <p className="text-sm text-gray-400">
              Your dedication to training is showing results. Keep pushing your limits while maintaining focus on recovery.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Growth Areas</h3>
            <p className="text-sm text-gray-400">
              Your technical skills are developing rapidly. Consider incorporating more tactical analysis into your routine.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Next Milestone</h3>
            <p className="text-sm text-gray-400">
              You're just 5% away from reaching elite-level performance metrics. Stay focused on your goals.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIInsights;