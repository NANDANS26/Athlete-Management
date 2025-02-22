import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUserFriends, FaVideo, FaImage, FaPoll, FaGlobe, FaHeart, FaComment, FaShare, FaTrophy, FaCalendarAlt, FaUsers, FaRobot } from 'react-icons/fa';
import { db, auth } from '../config/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    sport: string;
    verified?: boolean;
  };
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  isLiked?: boolean;
}

interface TrendingAthlete {
  id: string;
  name: string;
  sport: string;
  achievement: string;
  avatar: string;
  followers: number;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  type: string;
  participants: number;
}

interface Group {
  id: string;
  name: string;
  members: number;
  category: string;
  icon: string;
}

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingAthletes, setTrendingAthletes] = useState<TrendingAthlete[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching posts from Firestore
        const mockPosts: Post[] = [
          {
            id: '1',
            author: {
              id: '1',
              name: 'John Smith',
              avatar: 'https://i.pravatar.cc/150?img=1',
              sport: 'Football',
              verified: true
            },
            content: 'Just completed an intense training session! 💪 Working on improving my sprint speed. Any tips from fellow athletes?',
            media: {
              type: 'image',
              url: 'https://source.unsplash.com/random/800x600/?football'
            },
            likes: 124,
            comments: 18,
            shares: 5,
            timestamp: new Date(),
            isLiked: false
          },
          {
            id: '2',
            author: {
              id: '2',
              name: 'Sarah Johnson',
              avatar: 'https://i.pravatar.cc/150?img=2',
              sport: 'Swimming'
            },
            content: 'New personal best in 100m freestyle! 🏊‍♀️ Months of dedication finally paying off. Remember: consistency is key!',
            likes: 89,
            comments: 12,
            shares: 3,
            timestamp: new Date(Date.now() - 3600000),
            isLiked: true
          }
        ];

        const mockTrendingAthletes: TrendingAthlete[] = [
          {
            id: '1',
            name: 'Michael Chen',
            sport: 'Basketball',
            achievement: 'Regional MVP',
            avatar: 'https://i.pravatar.cc/150?img=3',
            followers: 15420
          },
          {
            id: '2',
            name: 'Emma Rodriguez',
            sport: 'Tennis',
            achievement: 'Rising Star',
            avatar: 'https://i.pravatar.cc/150?img=4',
            followers: 12350
          }
        ];

        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Youth Sports Summit',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            type: 'Conference',
            participants: 250
          },
          {
            id: '2',
            title: 'Regional Championships',
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            type: 'Competition',
            participants: 500
          }
        ];

        const mockGroups: Group[] = [
          {
            id: '1',
            name: 'Football Tactics',
            members: 2840,
            category: 'Football',
            icon: '⚽'
          },
          {
            id: '2',
            name: 'Athletes Nutrition',
            members: 1560,
            category: 'Health',
            icon: '🥗'
          }
        ];

        setPosts(mockPosts);
        setTrendingAthletes(mockTrendingAthletes);
        setEvents(mockEvents);
        setGroups(mockGroups);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostSubmit = async () => {
    if (!newPost.trim() && !selectedMedia) return;

    // Simulate post creation
    const post: Post = {
      id: Date.now().toString(),
      author: {
        id: auth.currentUser?.uid || '0',
        name: auth.currentUser?.displayName || 'Anonymous',
        avatar: auth.currentUser?.photoURL || 'https://i.pravatar.cc/150',
        sport: 'Football'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date(),
      isLiked: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setSelectedMedia(null);
  };

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked
            }
          : post
      )
    );
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="sticky top-0 bg-dark/80 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Athlete Community</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search community..."
                  className="w-64 bg-white/10 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Trending Athletes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaTrophy className="text-primary text-xl" />
                <h2 className="text-xl font-semibold">Trending Athletes</h2>
              </div>

              <div className="space-y-4">
                {trendingAthletes.map((athlete) => (
                  <motion.div
                    key={athlete.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 bg-white/5 p-4 rounded-lg"
                  >
                    <img
                      src={athlete.avatar}
                      alt={athlete.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{athlete.name}</h3>
                      <p className="text-sm text-gray-400">{athlete.sport}</p>
                      <p className="text-sm text-primary">
                        {formatNumber(athlete.followers)} followers
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Suggested Connections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaRobot className="text-primary text-xl" />
                <h2 className="text-xl font-semibold">AI Suggestions</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm">
                    Based on your sport and interests, you might want to connect with:
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span>Elite Football Academy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span>Pro Training Group</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-xl p-6"
            >
              <div className="flex gap-4 mb-4">
                <img
                  src={auth.currentUser?.photoURL || 'https://i.pravatar.cc/150'}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your achievements..."
                  className="flex-1 bg-white/5 rounded-lg p-4 resize-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                    <FaImage />
                    Photo
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                    <FaVideo />
                    Video
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                    <FaPoll />
                    Poll
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePostSubmit}
                  className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Post
                </motion.button>
              </div>
            </motion.div>

            {/* Posts Feed */}
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{post.author.name}</h3>
                        {post.author.verified && (
                          <span className="text-primary">✓</span>
                        )}
                        <span className="text-gray-400">• {post.author.sport}</span>
                      </div>
                      <p className="mb-4">{post.content}</p>
                      {post.media && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          {post.media.type === 'image' ? (
                            <img
                              src={post.media.url}
                              alt="Post content"
                              className="w-full"
                            />
                          ) : (
                            <video
                              src={post.media.url}
                              controls
                              className="w-full"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 transition-colors ${
                            post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <FaHeart />
                          {formatNumber(post.likes)}
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                          <FaComment />
                          {formatNumber(post.comments)}
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                          <FaShare />
                          {formatNumber(post.shares)}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaCalendarAlt className="text-primary text-xl" />
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 p-4 rounded-lg"
                  >
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-400">
                      {event.date.toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                        {event.type}
                      </span>
                      <span className="text-gray-400">
                        {formatNumber(event.participants)} participants
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Group Discussions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaUsers className="text-primary text-xl" />
                <h2 className="text-xl font-semibold">Group Discussions</h2>
              </div>

              <div className="space-y-4">
                {groups.map((group) => (
                  <motion.div
                    key={group.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-gray-400">
                          {formatNumber(group.members)} members
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;