import { motion } from 'framer-motion';
import { FaRunning } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://videocdn.cdnpk.net/videos/5c7b2c6b-3552-4ddf-b7b3-0d81e52c7789/horizontal/previews/clear/large.mp4?token=exp=1739466304~hmac=d0eb80c030fb05e1ad0817dff696fb5c967f85f6a691515d3229462e8c6004e8"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          AI-Powered Athlete Tracking & Recruitment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          Train Smarter. Perform Better. Get Discovered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleGetStarted}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            <FaRunning />
            Let's get started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;