import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      toast.error('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/movies/${id}`);
      toast.success('Movie deleted successfully!');
      navigate('/movies');
    } catch (error) {
      console.error('Error deleting movie:', error);
      toast.error('Failed to delete movie');
    }
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-gray-500">Movie not found</p>
        <Link to="/movies" className="btn btn-primary mt-4">Back to Movies</Link>
      </div>
    );
  }

  const isOwner = user && user.email === movie.addedBy;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="card lg:card-side bg-base-100 shadow-2xl">
        <figure className="lg:w-1/3">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
        </figure>
        
        <div className="card-body lg:w-2/3">
          <h1 className="card-title text-4xl mb-4">{movie.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-lg badge-warning">⭐ {movie.rating}</span>
            <span className="badge badge-lg badge-primary">{movie.genre}</span>
            <span className="badge badge-lg badge-secondary">{movie.releaseYear}</span>
            <span className="badge badge-lg badge-outline">{movie.duration} min</span>
          </div>
          
          <div className="space-y-3">
            <p><strong className="text-lg">Director:</strong> {movie.director}</p>
            <p><strong className="text-lg">Cast:</strong> {movie.cast}</p>
            <p><strong className="text-lg">Language:</strong> {movie.language}</p>
            <p><strong className="text-lg">Country:</strong> {movie.country}</p>
            
            <div>
              <strong className="text-lg">Plot Summary:</strong>
              <p className="mt-2 text-gray-700">{movie.plotSummary}</p>
            </div>
            
            <p className="text-sm text-gray-500">
              <strong>Added by:</strong> {movie.addedBy}
            </p>
          </div>
          
          {isOwner && (
            <div className="card-actions justify-end mt-6 gap-2">
              <Link 
                to={`/update-movie/${movie._id}`} 
                className="btn btn-warning"
              >
                Edit Movie
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)} 
                className="btn btn-error"
              >
                Delete Movie
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete "{movie.title}"? This action cannot be undone.</p>
            <div className="modal-action">
              <button onClick={() => setShowDeleteModal(false)} className="btn">Cancel</button>
              <button onClick={handleDelete} className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
