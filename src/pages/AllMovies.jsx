import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast.error('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Movies</h1>
      
      {movies.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-500">No movies found</p>
          <Link to="/add-movie" className="btn btn-primary mt-4">Add First Movie</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="card bg-base-100 shadow-xl card-hover">
              <figure className="h-72">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{movie.title}</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-warning">⭐ {movie.rating}</span>
                    <span className="badge badge-outline">{movie.genre}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    <strong>Year:</strong> {movie.releaseYear}
                  </p>
                  
                  <p className="text-sm text-gray-600">
                    <strong>Director:</strong> {movie.director}
                  </p>
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <Link 
                    to={`/movies/${movie._id}`} 
                    className="btn btn-primary btn-sm w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMovies;
