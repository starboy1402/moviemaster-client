import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    if (featuredMovies.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredMovies]);

  const fetchHomeData = async () => {
    try {
      const [moviesRes, topRatedRes, recentRes] = await Promise.all([
        axios.get(`${API_URL}/api/movies`),
        axios.get(`${API_URL}/api/movies/top-rated`),
        axios.get(`${API_URL}/api/movies/recent`)
      ]);

      setFeaturedMovies(moviesRes.data.slice(0, 5));
      setTopRatedMovies(topRatedRes.data);
      setRecentMovies(recentRes.data);
      setStats({
        totalMovies: moviesRes.data.length,
        totalUsers: 150 // Mock data - replace with real API
      });
    } catch (error) {
      console.error('Error fetching home data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const genres = [
    { name: 'Action', icon: '💥', color: 'bg-red-500' },
    { name: 'Drama', icon: '🎭', color: 'bg-purple-500' },
    { name: 'Comedy', icon: '😂', color: 'bg-yellow-500' },
    { name: 'Sci-Fi', icon: '🚀', color: 'bg-blue-500' },
    { name: 'Horror', icon: '👻', color: 'bg-gray-800' },
    { name: 'Romance', icon: '💕', color: 'bg-pink-500' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {featuredMovies.map((movie, index) => (
          <div
            key={movie._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="hero min-h-full"
              style={{
                backgroundImage: `url(${movie.posterUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="hero-overlay bg-opacity-70"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold animate-fade-in">{movie.title}</h1>
                  <p className="mb-5 line-clamp-3">{movie.plotSummary}</p>
                  <div className="flex gap-2 justify-center mb-5">
                    <span className="badge badge-warning">⭐ {movie.rating}</span>
                    <span className="badge badge-info">{movie.genre}</span>
                    <span className="badge badge-secondary">{movie.releaseYear}</span>
                  </div>
                  <Link to={`/movies/${movie._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-primary' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Total Movies</div>
          <div className="stat-value text-primary">{stats.totalMovies}</div>
          <div className="stat-desc">In our collection</div>
        </div>
        
        <div className="stat place-items-center">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-secondary">{stats.totalUsers}+</div>
          <div className="stat-desc">Active community members</div>
        </div>
        
        <div className="stat place-items-center">
          <div className="stat-title">Average Rating</div>
          <div className="stat-value">8.5</div>
          <div className="stat-desc">⭐ Quality content</div>
        </div>
      </div>

      {/* Top Rated Movies Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Top Rated Movies</h2>
          <Link to="/movies" className="btn btn-outline btn-sm">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topRatedMovies.map((movie) => (
            <div key={movie._id} className="card bg-base-100 shadow-xl card-hover">
              <figure className="h-64">
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-sm">{movie.title}</h3>
                <div className="flex justify-between items-center text-xs">
                  <span className="badge badge-sm badge-warning">⭐ {movie.rating}</span>
                  <span>{movie.releaseYear}</span>
                </div>
                <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-xs mt-2">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-base-200">
        <h2 className="text-4xl font-bold mb-8 text-center">Recently Added</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentMovies.map((movie) => (
            <div key={movie._id} className="card lg:card-side bg-base-100 shadow-xl">
              <figure className="lg:w-1/3">
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-48 lg:h-full object-cover" />
              </figure>
              <div className="card-body lg:w-2/3">
                <h3 className="card-title">{movie.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{movie.plotSummary}</p>
                <div className="flex gap-2 flex-wrap mt-2">
                  <span className="badge badge-outline">{movie.genre}</span>
                  <span className="badge badge-outline">⭐ {movie.rating}</span>
                </div>
                <div className="card-actions justify-end mt-2">
                  <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Genre Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8 text-center">Browse by Genre</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <div key={genre.name} className={`${genre.color} rounded-lg p-6 text-white text-center cursor-pointer transform transition hover:scale-105 hover:shadow-xl`}>
              <div className="text-4xl mb-2">{genre.icon}</div>
              <h3 className="font-bold">{genre.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* About Platform Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">About MovieMaster Pro</h2>
          <p className="text-lg mb-4">
            MovieMaster Pro is your ultimate companion for managing and discovering movies. 
            Whether you're a casual viewer or a cinema enthusiast, our platform helps you 
            organize your favorite films, discover new releases, and keep track of what to watch next.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">📚 Organize</h3>
              <p>Manage your personal movie collection effortlessly</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">🔍 Discover</h3>
              <p>Find new movies based on ratings and genres</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">⭐ Rate</h3>
              <p>Share your opinions and see what others think</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
