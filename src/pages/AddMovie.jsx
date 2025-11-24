import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddMovie = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    director: '',
    cast: '',
    rating: '',
    duration: '',
    plotSummary: '',
    posterUrl: '',
    language: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const movieData = {
      ...formData,
      releaseYear: parseInt(formData.releaseYear),
      rating: parseFloat(formData.rating),
      duration: parseInt(formData.duration),
      addedBy: user.email
    };

    try {
      await axios.post(`${API_URL}/api/movies`, movieData);
      toast.success('Movie added successfully!');
      navigate('/my-collection');
    } catch (error) {
      console.error('Error adding movie:', error);
      toast.error(error.response?.data?.message || 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Add New Movie</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Movie title"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Genre */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Genre *</span>
                </label>
                <select
                  name="genre"
                  className="select select-bordered"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Drama">Drama</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Documentary">Documentary</option>
                </select>
              </div>

              {/* Release Year */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Release Year *</span>
                </label>
                <input
                  type="number"
                  name="releaseYear"
                  placeholder="2024"
                  min="1900"
                  max="2025"
                  className="input input-bordered"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Director */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Director *</span>
                </label>
                <input
                  type="text"
                  name="director"
                  placeholder="Director name"
                  className="input input-bordered"
                  value={formData.director}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Cast */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Cast *</span>
                </label>
                <input
                  type="text"
                  name="cast"
                  placeholder="Actor 1, Actor 2, Actor 3"
                  className="input input-bordered"
                  value={formData.cast}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Rating */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rating (0-10) *</span>
                </label>
                <input
                  type="number"
                  name="rating"
                  placeholder="8.5"
                  min="0"
                  max="10"
                  step="0.1"
                  className="input input-bordered"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Duration */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Duration (minutes) *</span>
                </label>
                <input
                  type="number"
                  name="duration"
                  placeholder="120"
                  min="1"
                  className="input input-bordered"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Language *</span>
                </label>
                <input
                  type="text"
                  name="language"
                  placeholder="English"
                  className="input input-bordered"
                  value={formData.language}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country *</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="USA"
                  className="input input-bordered"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Poster URL */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Poster URL *</span>
                </label>
                <input
                  type="url"
                  name="posterUrl"
                  placeholder="https://example.com/poster.jpg"
                  className="input input-bordered"
                  value={formData.posterUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Plot Summary */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Plot Summary *</span>
                </label>
                <textarea
                  name="plotSummary"
                  placeholder="Brief description of the movie plot"
                  className="textarea textarea-bordered h-24"
                  value={formData.plotSummary}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : 'Add Movie'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
