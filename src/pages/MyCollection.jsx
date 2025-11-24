import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyCollection = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMyMovies();
    }
  }, [user]);

  const fetchMyMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/user/${user.email}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast.error('Failed to load your movies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/movies/${id}`);
      setMovies(movies.filter(movie => movie._id !== id));
      toast.success('Movie deleted successfully!');
    } catch (error) {
      console.error('Error deleting movie:', error);
      toast.error('Failed to delete movie');
    }
    setDeleteId(null);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Collection</h1>
        <Link to="/add-movie" className="btn btn-primary">Add Movie</Link>
      </div>
      
      {movies.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-500 mb-4">You haven't added any movies yet</p>
          <Link to="/add-movie" className="btn btn-primary">Add Your First Movie</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-16 h-20 rounded">
                        <img src={movie.posterUrl} alt={movie.title} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{movie.title}</div>
                    <div className="text-sm opacity-50">{movie.director}</div>
                  </td>
                  <td>{movie.genre}</td>
                  <td>{movie.releaseYear}</td>
                  <td>
                    <span className="badge badge-warning">⭐ {movie.rating}</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link 
                        to={`/movies/${movie._id}`} 
                        className="btn btn-sm btn-info"
                      >
                        View
                      </Link>
                      <Link 
                        to={`/update-movie/${movie._id}`} 
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => setDeleteId(movie._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this movie? This action cannot be undone.</p>
            <div className="modal-action">
              <button onClick={() => setDeleteId(null)} className="btn">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollection;
