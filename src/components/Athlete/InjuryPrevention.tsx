import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHeartbeat, FaBrain, FaRunning, FaHotjar, FaFirstAid, FaCheckCircle } from 'react-icons/fa';
import type { AthleteData } from './AthleteDashboard';

interface InjuryPreventionProps {
  athleteData: AthleteData;
}

interface BodyPart {
  name: string;
  risk: number;
  status: 'high' | 'moderate' | 'low';
  recommendation: string;
}

interface RecoveryTip {
  title: string;
  description: string;
  icon: JSX.Element;
}

const InjuryPrevention = ({ athleteData }: InjuryPreventionProps) => {
  const [overallRisk, setOverallRisk] = useState(30);
  const [recoveryStatus, setRecoveryStatus] = useState(85);
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([
    { name: 'Knees', risk: 65, status: 'moderate', recommendation: 'Focus on knee stability exercises' },
    { name: 'Lower Back', risk: 45, status: 'moderate', recommendation: 'Add core strengthening exercises' },
    { name: 'Shoulders', risk: 25, status: 'low', recommendation: 'Maintain current routine' },
    { name: 'Ankles', risk: 80, status: 'high', recommendation: 'Reduce high-impact activities' },
  ]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  const recoveryTips: RecoveryTip[] = [
    { title: 'Ice Therapy', description: 'Apply ice to affected areas for 15-20 minutes', icon: <FaHeartbeat className="text-blue-400" /> },
    { title: 'Rest Period', description: '48 hours recommended for full muscle recovery', icon: <FaBrain className="text-purple-400" /> },
    { title: 'Mobility Work', description: 'Light stretching and mobility exercises', icon: <FaRunning className="text-green-400" /> },
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOverallRisk((prev) => Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5))));
      setRecoveryStatus((prev) => Math.max(0, Math.min(100, prev + (Math.random() * 6 - 3))));

      setBodyParts((prev) =>
        prev.map((part) => ({
          ...part,
          risk: Math.max(0, Math.min(100, part.risk + (Math.random() * 8 - 4))),
          status: part.risk > 70 ? 'high' : part.risk > 40 ? 'moderate' : 'low',
        }))
      );

      // Add notifications for high-risk body parts
      const highRiskParts = bodyParts.filter((part) => part.risk > 70);
      if (highRiskParts.length > 0) {
        setNotifications((prev) => [
          ...prev,
          `High risk detected for ${highRiskParts.map((part) => part.name).join(', ')}`,
        ]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bodyParts]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'text-red-500';
      case 'moderate':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  const handleBodyPartClick = (partName: string) => {
    setSelectedBodyPart(partName);
  };

  const handleFeedback = (recommendation: string, feedback: 'helpful' | 'not-helpful') => {
    console.log(`Feedback for "${recommendation}": ${feedback}`);
  };

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Injury Prevention & Recovery</h1>
          <p className="text-gray-400">AI-powered injury prevention for {athleteData.sport}</p>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 p-4 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">High Risk Alerts</h2>
              <ul className="text-gray-300">
                {notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Risk Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl ${
          overallRisk > 70 ? 'bg-red-500/20' : overallRisk > 40 ? 'bg-yellow-500/20' : 'bg-green-500/20'
        }`}
      >
        <div className="flex items-center gap-4">
          <FaExclamationTriangle
            className={`text-3xl ${
              overallRisk > 70 ? 'text-red-500' : overallRisk > 40 ? 'text-yellow-500' : 'text-green-500'
            }`}
          />
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {overallRisk > 70 ? 'High Risk Alert!' : overallRisk > 40 ? 'Moderate Risk Warning' : 'Low Risk Status'}
            </h2>
            <p className="text-gray-300">
              {overallRisk > 70
                ? 'Immediate action required to prevent injury'
                : overallRisk > 40
                ? 'Monitor and take precautionary measures'
                : 'Safe to continue with current training plan'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Body Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaHotjar className="text-red-500 text-2xl" />
            <h2 className="text-xl font-semibold">Body Stress Map</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {bodyParts.map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/5 p-4 rounded-lg cursor-pointer ${
                  selectedBodyPart === part.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleBodyPartClick(part.name)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{part.name}</h3>
                  <span className={`text-sm ${getStatusColor(part.status)}`}>{part.status.toUpperCase()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className={`rounded-full h-2 transition-all duration-300 ${
                      part.status === 'high' ? 'bg-red-500' : part.status === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${part.risk}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">{part.recommendation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recovery Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaFirstAid className="text-primary text-2xl" />
            <h2 className="text-xl font-semibold">Recovery Status</h2>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span>Overall Recovery</span>
              <span>{Math.round(recoveryStatus)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-primary rounded-full h-4 transition-all duration-300"
                style={{ width: `${recoveryStatus}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {recoveryTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  {tip.icon}
                  <h3 className="font-semibold">{tip.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaBrain className="text-purple-500 text-2xl" />
          <h2 className="text-xl font-semibold">AI Prevention Strategy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Immediate Actions</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Reduce training intensity by 20%
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Focus on ankle stability exercises
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Increase warm-up duration
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Long-term Prevention</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Implement regular mobility work
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Add balance training to routine
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Schedule regular recovery days
              </li>
            </ul>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Was this recommendation helpful?</h3>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg"
              onClick={() => handleFeedback('Reduce training intensity by 20%', 'helpful')}
            >
              <FaCheckCircle className="text-green-500" />
              <span>Helpful</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg"
              onClick={() => handleFeedback('Reduce training intensity by 20%', 'not-helpful')}
            >
              <FaExclamationTriangle className="text-red-500" />
              <span>Not Helpful</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InjuryPrevention;