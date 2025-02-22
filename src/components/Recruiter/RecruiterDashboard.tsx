import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaUsers, FaChartLine, FaBell, FaRobot, FaFileContract, FaTrophy, FaExclamationTriangle, FaCog, FaVideo } from 'react-icons/fa';
import Sidebar from './Sidebar';
import AthletePerformanceTracking from './AthletePerformanceTracking';
import GlobalScouting from './GlobalScouting';
import ContractManagement from './ContractManagement';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import Settings from '../Settings/Settings';
import CommunityPage from '../Community/CommunityPage';
import NotificationsCenter from './NotificationsCenter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AIInsights from './AiInsights';

interface RecruiterData {
  fullName: string;
  organization: string;
  sportSpecialization: string;
  [key: string]: any;
}

interface QuickStat {
  icon: JSX.Element;
  label: string;
  value: number;
  trend?: 'up' | 'down' | 'stable';
  color: string;
}

const menuItems = [
  { icon: FaUsers, label: 'Athlete Performance Tracking', id: 'performance' },
  { icon: FaUserTie, label: 'Global Scouting', id: 'scouting' },
  { icon: FaFileContract, label: 'Contract Management', id: 'contracts' },
  { icon: FaRobot, label: 'AiInsights', id: 'ai-insights' },
  { icon: FaChartLine, label: 'Performance Analytics', id: 'analytics' },
  { icon: FaBell, label: 'Notifications', id: 'notifications' },
  { icon: FaUserTie, label: 'Community', id: 'community' },
  { icon: FaCog, label: 'Settings', id: 'settings' },
];

const RecruiterDashboard = () => {
  const [recruiterData, setRecruiterData] = useState<RecruiterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('performance');
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  // Quick stats data
  const quickStats: QuickStat[] = [
    {
      icon: <FaUsers className="text-primary" />,
      label: 'New Talents',
      value: 5,
      trend: 'up',
      color: 'primary'
    },
    {
      icon: <FaFileContract className="text-yellow-500" />,
      label: 'Pending Contracts',
      value: 2,
      trend: 'stable',
      color: 'yellow'
    },
    {
      icon: <FaBell className="text-red-500" />,
      label: 'Training Alerts',
      value: 3,
      trend: 'down',
      color: 'red'
    },
    {
      icon: <FaTrophy className="text-green-500" />,
      label: 'Successful Recruits',
      value: 12,
      trend: 'up',
      color: 'green'
    }
  ];

  // Sample performance data
  const performanceData = [
    { month: 'Jan', athletes: 10, contracts: 2 },
    { month: 'Feb', athletes: 15, contracts: 4 },
    { month: 'Mar', athletes: 12, contracts: 3 },
    { month: 'Apr', athletes: 20, contracts: 5 }
  ];

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const recruiterDoc = await getDoc(doc(db, 'recruiters', userId));
        if (recruiterDoc.exists()) {
          setRecruiterData(recruiterDoc.data() as RecruiterData);
        }

        // Simulate fetching recent activity
        setRecentActivity([
          {
            type: 'video',
            title: 'New Match Performance',
            athlete: 'John Smith',
            time: '2 hours ago'
          },
          {
            type: 'contract',
            title: 'Contract Accepted',
            athlete: 'Sarah Johnson',
            time: '5 hours ago'
          },
          {
            type: 'alert',
            title: 'Injury Alert',
            athlete: 'Mike Wilson',
            time: '1 day ago'
          }
        ]);

        // Simulate AI recommendations
        setAiRecommendations([
          'Rising star Alex Chen shows 25% performance improvement in the last month',
          'Consider reviewing Maria Garcia\'s latest match performance',
          'Contract opportunity: 3 athletes match your recruitment criteria'
        ]);

      } catch (error) {
        console.error('Error fetching recruiter data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!recruiterData) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl text-gray-400">No recruiter data found</p>
        </div>
      );
    }

    switch (activeSection) {
      case 'performance':
        return <AthletePerformanceTracking />;
      case 'scouting':
        return <GlobalScouting />;
      case 'contracts':
        return <ContractManagement />;
      case 'ai-insights':
        return <AIInsights />;
      case 'settings':
        return <Settings />;
      case 'community':
        return <CommunityPage />;
      case 'analytics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaChartLine className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">Performance Analytics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Recruitment Success Rate</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="contracts"
                        stroke="#646cff"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Athlete Performance Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="athletes"
                        stroke="#00ff88"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white/5 p-4 rounded-lg"
                  >
                    {activity.type === 'video' && (
                      <div className="text-blue-500 text-xl">
                        <FaVideo />
                      </div>
                    )}
                    {activity.type === 'contract' && (
                      <div className="text-green-500 text-xl">
                        <FaFileContract />
                      </div>
                    )}
                    {activity.type === 'alert' && (
                      <div className="text-red-500 text-xl">
                        <FaExclamationTriangle />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{activity.title}</h3>
                      <p className="text-sm text-gray-400">
                        {activity.athlete} • {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      default:
        return <AthletePerformanceTracking />;
    }
  };

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar menuItems={menuItems} activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome, {recruiterData?.fullName}! 👋</h1>
          <p className="text-gray-400">
            {recruiterData?.organization} • {recruiterData?.sportSpecialization} Specialist
          </p>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 p-6 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{stat.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{stat.label}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.trend === 'up' && (
                      <span className="text-green-500 text-sm">↑ 12%</span>
                    )}
                    {stat.trend === 'down' && (
                      <span className="text-red-500 text-sm">↓ 5%</span>
                    )}
                    {stat.trend === 'stable' && (
                      <span className="text-yellow-500 text-sm">→</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Recommendations */}
        {activeSection === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 p-6 rounded-xl mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaRobot className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">AI Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiRecommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-4 rounded-lg"
                >
                  <p className="text-gray-300">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Render the selected section */}
        {renderContent()}
      </main>
    </div>
  );
};

export default RecruiterDashboard;