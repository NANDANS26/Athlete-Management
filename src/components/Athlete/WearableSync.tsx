import { useState, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaApple, FaGoogle, FaHeart, FaBed, FaTint, FaRunning, FaBrain, FaPlus, FaSync, FaBolt, FaTimes, FaStopwatch, FaHeartbeat, FaWalking, FaFire } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AthleteData } from './AthleteDashboard';

interface WearableSyncProps {
  athleteData: AthleteData;
}

interface Device {
  id: string;
  name: string;
  icon: JSX.Element;
  connected: boolean;
  lastSync?: Date;
  batteryLevel?: number;
}

interface HealthMetric {
  timestamp: string;
  heartRate: number;
  steps: number;
  calories: number;
  sleep: number;
  hydration: number;
  stress: number;
}

interface Exercise {
  id: string;
  type: string;
  duration: number;
  calories: number;
  heartRate: number;
  timestamp: Date;
}

const WearableSync = ({ }: WearableSyncProps) => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 'apple', name: 'Apple Watch', icon: <FaApple />, connected: false },
    { id: 'google', name: 'Google Fit', icon: <FaGoogle />, connected: false },
    { id: 'fitbit', name: 'Fitbit', icon: <FaBolt />, connected: false },
    { id: 'garmin', name: 'Garmin', icon: <FaBolt />, connected: false },
    { id: 'xiaomi', name: 'Mi Band', icon: <FaBolt />, connected: false },
    { id: 'whoop', name: 'WHOOP', icon: <FaBolt />, connected: false }
  ]);

  const [healthData, setHealthData] = useState<HealthMetric[]>([]);
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [syncing, setSyncing] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [recentExercises, setRecentExercises] = useState<Exercise[]>([]);
  const [isBluetoothConnecting, setIsBluetoothConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');

  // Simulate real-time health data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newMetric: HealthMetric = {
        timestamp: now.toLocaleTimeString(),
        heartRate: 65 + Math.random() * 20,
        steps: 8000 + Math.random() * 1000,
        calories: 1800 + Math.random() * 200,
        sleep: 7.5 + Math.random(),
        hydration: 65 + Math.random() * 10,
        stress: 30 + Math.random() * 20
      };

      setHealthData(prev => [...prev.slice(-30), newMetric]);

      // Generate AI alerts based on thresholds
      if (newMetric.heartRate > 80) {
        setAlerts(prev => [
          "High heart rate detected during rest. Consider taking a break.",
          ...prev.slice(0, 4)
        ]);
      }
      if (newMetric.hydration < 70) {
        setAlerts(prev => [
          "Hydration levels below optimal. Increase water intake.",
          ...prev.slice(0, 4)
        ]);
      }

      // Add random exercise data
      if (Math.random() > 0.95) {
        const exerciseTypes = ['Running', 'Cycling', 'Swimming', 'Strength Training', 'HIIT'];
        const newExercise: Exercise = {
          id: Date.now().toString(),
          type: exerciseTypes[Math.floor(Math.random() * exerciseTypes.length)],
          duration: Math.floor(30 + Math.random() * 60),
          calories: Math.floor(200 + Math.random() * 300),
          heartRate: Math.floor(120 + Math.random() * 40),
          timestamp: new Date()
        };
        setRecentExercises(prev => [newExercise, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDeviceSync = async (deviceId: string) => {
    try {
      setIsBluetoothConnecting(true);
      setConnectionError("");
  
      let options: RequestDeviceOptions;
  
      if (deviceId === 'apple') {
        options = {
          filters: [{ namePrefix: 'Apple' }],
          optionalServices: ['0000180d-0000-1000-8000-00805f9b34fb'], // Heart Rate Service UUID
        };
      } else if (deviceId === 'fitbit') {
        options = {
          filters: [{ namePrefix: 'Fitbit' }],
          optionalServices: ['0000180d-0000-1000-8000-00805f9b34fb'],
        };
      } else if (deviceId === 'garmin') {
        options = {
          filters: [{ namePrefix: 'Garmin' }],
          optionalServices: ['0000180d-0000-1000-8000-00805f9b34fb'],
        };
      } else {
        options = {
          acceptAllDevices: true,
          optionalServices: ['0000180d-0000-1000-8000-00805f9b34fb'],
        };
      }
  
      const device = await navigator.bluetooth.requestDevice(options);
  
      console.log(`Connected to ${device.name}`);
  
      setDevices(prevDevices =>
        prevDevices.map(d =>
          d.id === deviceId ? { ...d, connected: true, lastSync: new Date() } : d
        )
      );
    } catch (error) {
      setConnectionError("Failed to connect. Ensure your device is in pairing mode.");
      console.error("Bluetooth connection error:", error);
    } finally {
      setIsBluetoothConnecting(false);
    }
  };
  
  

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'heartRate':
        return <FaHeart className="text-red-500" />;
      case 'sleep':
        return <FaBed className="text-purple-500" />;
      case 'hydration':
        return <FaTint className="text-blue-500" />;
      case 'steps':
        return <FaRunning className="text-green-500" />;
      case 'stress':
        return <FaBrain className="text-yellow-500" />;
      default:
        return <FaBolt className="text-primary" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'heartRate':
        return '#ef4444';
      case 'sleep':
        return '#a855f7';
      case 'hydration':
        return '#3b82f6';
      case 'steps':
        return '#22c55e';
      case 'stress':
        return '#eab308';
      default:
        return '#646cff';
    }
  };

  const getMetricValue = (data: HealthMetric) => {
    switch (selectedMetric) {
      case 'heartRate':
        return data.heartRate;
      case 'sleep':
        return data.sleep;
      case 'hydration':
        return data.hydration;
      case 'steps':
        return data.steps;
      case 'stress':
        return data.stress;
      default:
        return 0;
    }
  };

  const renderDeviceConnectionModal = () => (
    <AnimatePresence>
      {isBluetoothConnecting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark p-8 rounded-xl max-w-md w-full mx-4 relative"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-4xl text-primary mb-4"
              >
                <FaSync />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Connecting to Device</h2>
              <p className="text-gray-400 mb-4">
                Please make sure your device is nearby and Bluetooth is enabled...
              </p>
              {connectionError && (
                <p className="text-red-500 mb-4">{connectionError}</p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsBluetoothConnecting(false);
                  setSyncing(false);
                }}
                className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wearable Device Sync</h1>
          <p className="text-gray-400">
            Connect your devices to track real-time performance metrics
          </p>
        </div>
      </div>

      {/* Device Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {devices.map((device) => (
          <motion.div
            key={device.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{device.icon}</div>
                <div>
                  <h3 className="font-semibold">{device.name}</h3>
                  <p className={`text-sm ${device.connected ? 'text-green-500' : 'text-gray-400'}`}>
                    {device.connected ? 'Connected' : 'Not Connected'}
                  </p>
                </div>
              </div>
              {device.batteryLevel && (
                <div className="text-sm text-gray-400">
                  {device.batteryLevel}%
                </div>
              )}
            </div>

            {device.connected && device.lastSync && (
              <p className="text-sm text-gray-400 mb-4">
                Last synced: {device.lastSync.toLocaleTimeString()}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDeviceSync(device.id)}
              disabled={syncing}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                transition-colors ${
                  device.connected
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                }`}
            >
              {syncing ? (
                <FaSync className="animate-spin" />
              ) : device.connected ? (
                <>
                  <FaTimes />
                  Disconnect
                </>
              ) : (
                <>
                  <FaPlus />
                  Connect
                </>
              )}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Real-time Data</h2>
            <div className="flex gap-2">
              {['heartRate', 'sleep', 'hydration', 'steps', 'stress'].map(metric => (
                <motion.button
                  key={metric}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMetric(metric)}
                  className={`p-2 rounded-lg transition-colors ${
                    selectedMetric === metric
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {getMetricIcon(metric)}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="timestamp" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid #666'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={d => getMetricValue(d)}
                  stroke={getMetricColor(selectedMetric)}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Exercises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Exercises</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {recentExercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white/5 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{exercise.type}</h3>
                      <p className="text-sm text-gray-400">
                        {exercise.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <FaStopwatch className="text-primary" />
                        <span>{exercise.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaHeartbeat className="text-red-500" />
                        <span>{exercise.heartRate} BPM</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FaFire className="text-orange-500" />
                      <span>{exercise.calories} kcal</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaHeartbeat className="text-red-500 text-2xl" />
            <h3 className="font-semibold">Heart Rate</h3>
          </div>
          <div className="text-3xl font-bold">
            {healthData[healthData.length - 1]?.heartRate.toFixed(0)} BPM
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaWalking className="text-green-500 text-2xl" />
            <h3 className="font-semibold">Steps</h3>
          </div>
          <div className="text-3xl font-bold">
            {healthData[healthData.length - 1]?.steps.toFixed(0)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaFire className="text-orange-500 text-2xl" />
            <h3 className="font-semibold">Calories</h3>
          </div>
          <div className="text-3xl font-bold">
            {healthData[healthData.length - 1]?.calories.toFixed(0)} kcal
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaBed className="text-purple-500 text-2xl" />
            <h3 className="font-semibold">Sleep</h3>
          </div>
          <div className="text-3xl font-bold">
            {healthData[healthData.length - 1]?.sleep.toFixed(1)} hrs
          </div>
        </motion.div>
      </div>

      {/* AI Insights & Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-6">AI Health Insights</h2>
        
        <div className="space-y-4">
          <AnimatePresence>
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 bg-white/5 p-4 rounded-lg"
              >
                <FaBrain className="text-primary text-xl" />
                <p>{alert}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Device Connection Modal */}
      {renderDeviceConnectionModal()}
    </div>
  );
};

export default WearableSync;