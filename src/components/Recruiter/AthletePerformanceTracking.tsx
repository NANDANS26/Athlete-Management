import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaRobot, FaChartLine, FaRunning, FaHeartbeat, FaArrowsAlt, FaExclamationTriangle, FaBrain, FaDumbbell, FaStopwatch, FaChartBar } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Import the JSON data (replace with your actual JSON data)
import athletesData from '../config/athlete.json'; // Adjust the path as needed

interface Athlete {
  id: string;
  name: string;
  age: number;
  sport: string;
  position: string;
  skillScore: number;
  recentTrend: 'up' | 'down' | 'stable';
  metrics: {
    speed: number;
    strength: number;
    endurance: number;
    agility: number;
    recovery: number;
    mentalHealth: number;
  };
  injuryRisk: number;
  videos: {
    id: string;
    title: string;
    thumbnail: string;
    tags: string[];
    date: string;
  }[];
  image: string; // Add image field
  awards?: string; // Add awards field
}

interface PerformanceData {
  date: string;
  speed: number;
  strength: number;
  endurance: number;
  agility: number;
}

const AthletePerformanceTracking = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('speed');
  const [compareMode, setCompareMode] = useState(false);
  const [comparedAthletes, setComparedAthletes] = useState<string[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'analysis'>('overview');
  const [selectedSport, setSelectedSport] = useState<string>('');

  // Load athletes data from JSON
  useEffect(() => {
    const formattedAthletes = athletesData.Football.map((player) => ({
      id: player.Name.replace(/\s+/g, '-').toLowerCase(),
      name: player.Name,
      age: player.Age,
      sport: 'Football', // Hardcoded for now, but can be dynamic
      position: player.Position,
      skillScore: Math.floor(Math.random() * 40) + 60, // Random skill score for demo
      recentTrend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      metrics: {
        speed: Math.floor(Math.random() * 40) + 60,
        strength: Math.floor(Math.random() * 40) + 60,
        endurance: Math.floor(Math.random() * 40) + 60,
        agility: Math.floor(Math.random() * 40) + 60,
        recovery: Math.floor(Math.random() * 40) + 60,
        mentalHealth: Math.floor(Math.random() * 40) + 60,
      },
      injuryRisk: Math.floor(Math.random() * 30) + 10,
      videos: [
        {
          id: 'v1',
          title: 'Match Highlights',
          thumbnail: player.Image,
          tags: ['Goal', 'Sprint', 'Best Play'],
          date: '2024-02-15',
        },
      ],
      image: player.Image, // Add image from JSON
      awards: player.Awards, // Add awards from JSON
    }));
    setAthletes(formattedAthletes);
  }, []);

  // Filter athletes by sport
  const filteredAthletes = selectedSport
    ? athletes.filter((athlete) => athlete.sport.toLowerCase() === selectedSport.toLowerCase())
    : athletes;

  // Generate sample performance data
  useEffect(() => {
    const generateData = () => {
      const data: PerformanceData[] = [];
      const now = new Date();
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString(),
          speed: 70 + Math.random() * 20,
          strength: 65 + Math.random() * 25,
          endurance: 75 + Math.random() * 15,
          agility: 80 + Math.random() * 10,
        });
      }
      setPerformanceData(data);
    };

    generateData();
  }, []);

  const handleCompareToggle = (athleteId: string) => {
    if (comparedAthletes.includes(athleteId)) {
      setComparedAthletes((prev) => prev.filter((id) => id !== athleteId));
    } else if (comparedAthletes.length < 2) {
      setComparedAthletes((prev) => [...prev, athleteId]);
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 85) return 'text-green-500';
    if (value >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderMetricCard = (title: string, value: number, icon: JSX.Element) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 p-4 rounded-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        <span className={`text-xl font-bold ${getMetricColor(value)}`}>
          {value}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-dark p-8">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search athletes by name, sport, or position..."
            className="w-full bg-white/10 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="bg-white/10 rounded-lg px-4 py-3"
          >
            <option value="">All Sports</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="boxing">Boxing</option>
            <option value="swimming">Swimming</option>
            <option value="tennis">Tennis</option>
            <option value="badminton">Badminton</option>
            <option value="rugby">Rugby</option>
            <option value="hockey">Hockey</option>
            <option value="athletics">Athletics</option>
            <option value="cricket">Cricket</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCompareMode(!compareMode)}
            className={`px-4 py-3 rounded-lg transition-colors ${
              compareMode ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'
            }`}
          >
            <FaArrowsAlt />
          </motion.button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Athlete List */}
        <div className="lg:col-span-1 bg-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Athletes</h2>
          <div className="space-y-4">
            {filteredAthletes.map((athlete) => (
              <motion.div
                key={athlete.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedAthlete(athlete)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedAthlete?.id === athlete.id
                    ? 'bg-primary/20'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{athlete.name}</h3>
                    <p className="text-sm text-gray-400">
                      {athlete.sport} • {athlete.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{athlete.skillScore}</p>
                    <p className="text-sm text-gray-400">Skill Score</p>
                  </div>
                </div>
                {compareMode && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompareToggle(athlete.id);
                    }}
                    className={`mt-2 w-full py-1 rounded-lg transition-colors ${
                      comparedAthletes.includes(athlete.id)
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {comparedAthletes.includes(athlete.id) ? 'Remove' : 'Compare'}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Details */}
        <div className="lg:col-span-3 space-y-8">
          {selectedAthlete && (
            <>
              {/* Navigation Tabs */}
              <div className="flex gap-4 mb-6">
                {[
                  { id: 'overview', label: 'Overview', icon: FaChartLine },
                  { id: 'analysis', label: 'AI Analysis', icon: FaRobot },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <tab.icon />
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    {/* Athlete Overview */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedAthlete.name}</h2>
                          <p className="text-gray-400">
                            {selectedAthlete.age} years • {selectedAthlete.sport} • {selectedAthlete.position}
                          </p>
                          {selectedAthlete.awards && (
                            <p className="text-sm text-gray-400 mt-2">
                              Awards: {selectedAthlete.awards}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">
                            {selectedAthlete.skillScore}
                          </div>
                          <p className="text-sm text-gray-400">Overall Skill Score</p>
                        </div>
                      </div>

                      {/* Athlete Image */}
                      <div className="mb-6">
                        <img
                          src={selectedAthlete.image}
                          alt={selectedAthlete.name}
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {renderMetricCard('Speed', selectedAthlete.metrics.speed, <FaRunning className="text-blue-500" />)}
                        {renderMetricCard('Strength', selectedAthlete.metrics.strength, <FaDumbbell className="text-red-500" />)}
                        {renderMetricCard('Endurance', selectedAthlete.metrics.endurance, <FaStopwatch className="text-green-500" />)}
                        {renderMetricCard('Agility', selectedAthlete.metrics.agility, <FaRunning className="text-yellow-500" />)}
                        {renderMetricCard('Recovery', selectedAthlete.metrics.recovery, <FaHeartbeat className="text-purple-500" />)}
                        {renderMetricCard('Mental Health', selectedAthlete.metrics.mentalHealth, <FaBrain className="text-pink-500" />)}
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Performance Trends</h2>
                        <div className="flex gap-2">
                          {['speed', 'strength', 'endurance', 'agility'].map((metric) => (
                            <button
                              key={metric}
                              onClick={() => setSelectedMetric(metric)}
                              className={`px-4 py-2 rounded-lg capitalize ${
                                selectedMetric === metric
                                  ? 'bg-primary text-white'
                                  : 'bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              {metric}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="date" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid #666',
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey={selectedMetric}
                              stroke="#646cff"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Injury Risk Assessment */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <FaExclamationTriangle className={`text-2xl ${
                          selectedAthlete.injuryRisk > 50 ? 'text-red-500' : 'text-green-500'
                        }`} />
                        <h2 className="text-xl font-semibold">Injury Risk Assessment</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-4">
                            <div className="flex justify-between mb-2">
                              <span>Risk Level</span>
                              <span className={selectedAthlete.injuryRisk > 50 ? 'text-red-500' : 'text-green-500'}>
                                {selectedAthlete.injuryRisk}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-4">
                              <div
                                className={`h-4 rounded-full transition-all duration-300 ${
                                  selectedAthlete.injuryRisk > 50 ? 'bg-red-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${selectedAthlete.injuryRisk}%` }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400">
                              • Recent training load: Moderate
                            </p>
                            <p className="text-sm text-gray-400">
                              • Recovery status: Optimal
                            </p>
                            <p className="text-sm text-gray-400">
                              • Previous injuries: None reported
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">AI Recommendations</h3>
                          <ul className="space-y-2 text-sm text-gray-400">
                            <li>• Maintain current training intensity</li>
                            <li>• Focus on recovery between sessions</li>
                            <li>• Continue mobility exercises</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'analysis' && (
                  <motion.div
                    key="analysis"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    {/* Radar Chart */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-6">Performance Analysis</h2>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                            { subject: 'Speed', A: selectedAthlete.metrics.speed },
                            { subject: 'Strength', A: selectedAthlete.metrics.strength },
                            { subject: 'Endurance', A: selectedAthlete.metrics.endurance },
                            { subject: 'Agility', A: selectedAthlete.metrics.agility },
                            { subject: 'Recovery', A: selectedAthlete.metrics.recovery },
                            { subject: 'Mental', A: selectedAthlete.metrics.mentalHealth },
                          ]}>
                            <PolarGrid stroke="#444" />
                            <PolarAngleAxis dataKey="subject" stroke="#888" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" />
                            <Radar name="Athlete" dataKey="A" stroke="#646cff" fill="#646cff" fillOpacity={0.3} />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <FaRobot className="text-2xl text-primary" />
                        <h2 className="text-xl font-semibold">AI Insights</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-white/5 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Strengths</h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <FaChartLine className="text-green-500" />
                                Exceptional speed and agility
                              </li>
                              <li className="flex items-center gap-2">
                                <FaChartLine className="text-green-500" />
                                Strong mental resilience
                              </li>
                            </ul>
                          </div>

                          <div className="bg-white/5 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <FaChartBar className="text-yellow-500" />
                                Endurance in extended matches
                              </li>
                              <li className="flex items-center gap-2">
                                <FaChartBar className="text-yellow-500" />
                                Recovery time between intense sessions
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-lg">
                          <h3 className="font-semibold mb-4">Development Recommendations</h3>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <FaBrain className="text-primary mt-1" />
                              <div>
                                <p className="font-semibold">Training Focus</p>
                                <p className="text-sm text-gray-400">
                                  Implement high-intensity interval training to improve endurance
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <FaHeartbeat className="text-red-500 mt-1" />
                              <div>
                                <p className="font-semibold">Recovery Plan</p>
                                <p className="text-sm text-gray-400">
                                  Add active recovery sessions between high-intensity training days
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AthletePerformanceTracking;