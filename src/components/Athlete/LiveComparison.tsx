import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaDumbbell, FaHeartbeat, FaBrain, FaUsers, FaTrophy, FaFilter } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import type { AthleteData } from './AthleteDashboard';
import athletesData from '../config/athlete.json'; // Import the JSON data

interface LiveComparisonProps {
  athleteData: AthleteData;
}

interface ComparisonMetric {
  category: string;
  athlete: number;
  average: number;
  top: number;
}

interface PerformanceData {
  metric: string;
  athlete: number;
  others: number;
}

interface IndividualComparisonData {
  name: string;
  athlete: number;
  otherPlayer: number;
}

const LiveComparison = ({ athleteData }: LiveComparisonProps) => {
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [comparisonType, setComparisonType] = useState<'global' | 'friends' | 'ai'>('global');
  const [barData, setBarData] = useState<PerformanceData[]>([]);
  const [individualComparisonData, setIndividualComparisonData] = useState<IndividualComparisonData[]>([]);
  const [radarData, setRadarData] = useState<ComparisonMetric[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching comparison data
  useEffect(() => {
    const generateData = () => {
      // Generate bar chart data based on the selected sport
      const sportAthletes = athletesData[athleteData.sport as keyof typeof athletesData];
      const athleteMetrics = {
        overall: 85,
        strength: 75,
        endurance: 80,
        technique: 70,
      };

      const barMetrics: PerformanceData[] = [
        {
          metric: 'Overall Performance',
          athlete: athleteMetrics.overall,
          others: sportAthletes.reduce((sum, athlete) => sum + (athlete.Age || 0), 0) / sportAthletes.length, // Example calculation
        },
        {
          metric: 'Strength',
          athlete: athleteMetrics.strength,
          others: sportAthletes.reduce((sum, athlete) => sum + (athlete.Age || 0), 0) / sportAthletes.length, // Example calculation
        },
        {
          metric: 'Endurance',
          athlete: athleteMetrics.endurance,
          others: sportAthletes.reduce((sum, athlete) => sum + (athlete.Age || 0), 0) / sportAthletes.length, // Example calculation
        },
        {
          metric: 'Technique',
          athlete: athleteMetrics.technique,
          others: sportAthletes.reduce((sum, athlete) => sum + (athlete.Age || 0), 0) / sportAthletes.length, // Example calculation
        },
      ];
      setBarData(barMetrics);

      // Generate individual comparison data
      const individualData: IndividualComparisonData[] = sportAthletes.map((player) => ({
        name: player.Name,
        athlete: athleteMetrics.overall, // Use overall performance for comparison
        otherPlayer: player.Age || 0, // Example: Using Age as a metric
      }));
      setIndividualComparisonData(individualData);

      // Generate radar chart data
      const radarMetrics: ComparisonMetric[] = [
        {
          category: 'Strength',
          athlete: 85,
          average: 70,
          top: 95,
        },
        {
          category: 'Speed',
          athlete: 75,
          average: 65,
          top: 90,
        },
        {
          category: 'Endurance',
          athlete: 80,
          average: 60,
          top: 85,
        },
        {
          category: 'Agility',
          athlete: 70,
          average: 65,
          top: 88,
        },
        {
          category: 'Recovery',
          athlete: 90,
          average: 75,
          top: 92,
        },
      ];
      setRadarData(radarMetrics);

      // Generate AI insights
      const newInsights = [
        "Your endurance is 20% above average but 10% below top performers. Consider high-intensity interval training.",
        "Recovery rate is exceptional - in the top 5% of athletes in your category!",
        "Strength metrics show room for improvement. Adding compound exercises could help bridge the gap.",
        "Your consistency in training is paying off - performance variance is 15% lower than average.",
      ];
      setInsights(newInsights);

      setLoading(false);
    };

    generateData();
  }, [athleteData.sport]);

  const metrics = [
    { id: 'overall', label: 'Overall Performance', icon: FaChartLine },
    { id: 'strength', label: 'Strength', icon: FaDumbbell },
    { id: 'endurance', label: 'Endurance', icon: FaHeartbeat },
    { id: 'technique', label: 'Technique', icon: FaBrain },
  ];

  const comparisonTypes = [
    { id: 'global', label: 'Global Rankings', icon: FaTrophy },
    { id: 'friends', label: 'Friends', icon: FaUsers },
    { id: 'ai', label: 'AI Suggested', icon: FaBrain },
  ];

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
          <h1 className="text-3xl font-bold mb-2">Live Progress Comparison</h1>
          <p className="text-gray-400">
            Compare your performance with other {athleteData.sport} athletes
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metric Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaFilter className="text-primary text-xl" />
            <h3 className="font-semibold">Select Metric</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <motion.button
                key={metric.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMetric(metric.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${selectedMetric === metric.id
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
              >
                <metric.icon />
                {metric.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Comparison Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaUsers className="text-primary text-xl" />
            <h3 className="font-semibold">Compare With</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {comparisonTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setComparisonType(type.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${comparisonType === type.id
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
              >
                <type.icon />
                {type.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaChartLine className="text-primary text-2xl" />
            <h2 className="text-xl font-semibold">Performance Comparison</h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="metric" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid #666',
                  }}
                />
                <Bar dataKey="athlete" name="You" fill="#646cff" />
                <Bar dataKey="others" name="Others" fill="#888888" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Individual Comparison Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaChartLine className="text-primary text-2xl" />
            <h2 className="text-xl font-semibold">Individual Player Comparison</h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={individualComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid #666',
                  }}
                />
                <Bar dataKey="athlete" name="You" fill="#646cff" />
                <Bar dataKey="otherPlayer" name="Other Player" fill="#888888" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Performance Breakdown (Radar Chart) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaChartLine className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">Performance Breakdown</h2>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey="category" stroke="#888" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" />
              <Radar
                name="You"
                dataKey="athlete"
                stroke="#646cff"
                fill="#646cff"
                fillOpacity={0.3}
              />
              <Radar
                name="Average"
                dataKey="average"
                stroke="#888888"
                fill="#888888"
                fillOpacity={0.3}
              />
              <Radar
                name="Top"
                dataKey="top"
                stroke="#00ff88"
                fill="#00ff88"
                fillOpacity={0.3}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid #666',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaBrain className="text-primary text-2xl" />
          <h2 className="text-xl font-semibold">AI Performance Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <p>{insight}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveComparison;