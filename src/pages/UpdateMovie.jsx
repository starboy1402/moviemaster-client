import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UpdateMovie = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
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

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/movies/${id}`);
            const movie = response.data;

            // Check if user is the owner
            if (movie.addedBy !== user.email) {
                toast.error('You can only edit your own movies');
                navigate('/my-collection');
                return;
            }

            setFormData({
                title: movie.title,
                genre: movie.genre,
                releaseYear: movie.releaseYear.toString(),
                director: movie.director,
                cast: movie.cast,
                rating: movie.rating.toString(),
                duration: movie.duration.toString(),
                plotSummary: movie.plotSummary,
                posterUrl: movie.posterUrl,
                language: movie.language,
                country: movie.country
            });
        } catch (error) {
            console.error('Error fetching movie details:', error);
            toast.error('Failed to load movie details');
            navigate('/my-collection');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const movieData = {
            ...formData,
            releaseYear: parseInt(formData.releaseYear),
            rating: parseFloat(formData.rating),
            duration: parseInt(formData.duration)
        };

        try {
            await axios.put(`${API_URL}/api/movies/${id}`, movieData);
            toast.success('Movie updated successfully!');
            navigate(`/movies/${id}`);
        } catch (error) {
            console.error('Error updating movie:', error);
            toast.error(error.response?.data?.message || 'Failed to update movie');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-16 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-base-content mb-4">Update Movie</h1>
                    <p className="text-base-content/60">Update the details of your movie</p>
                </div>

                <div className="bg-base-200/50 backdrop-blur-sm border border-base-content/10 rounded-3xl shadow-xl p-8 md:p-10">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Title *</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Movie title"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Genre */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Genre *</span>
                                </label>
                                <select
                                    name="genre"
                                    className="select select-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
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
                                    <span className="label-text text-base-content font-medium">Release Year *</span>
                                </label>
                                <input
                                    type="number"
                                    name="releaseYear"
                                    placeholder="2024"
                                    min="1900"
                                    max="2025"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.releaseYear}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Director */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Director *</span>
                                </label>
                                <input
                                    type="text"
                                    name="director"
                                    placeholder="Director name"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.director}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Cast */}
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Cast *</span>
                                </label>
                                <input
                                    type="text"
                                    name="cast"
                                    placeholder="Actor 1, Actor 2, Actor 3"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.cast}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Rating */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Rating (0-10) *</span>
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    placeholder="8.5"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Duration */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Duration (minutes) *</span>
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    placeholder="120"
                                    min="1"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Language */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Language *</span>
                                </label>
                                <input
                                    type="text"
                                    name="language"
                                    placeholder="English"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.language}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Country */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Country *</span>
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="USA"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Poster URL */}
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Poster URL *</span>
                                </label>
                                <input
                                    type="url"
                                    name="posterUrl"
                                    placeholder="https://example.com/poster.jpg"
                                    className="input input-bordered bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    value={formData.posterUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Plot Summary */}
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Plot Summary *</span>
                                </label>
                                <textarea
                                    name="plotSummary"
                                    placeholder="Brief description of the movie plot"
                                    className="textarea textarea-bordered bg-base-100 text-base-content h-32 focus:border-primary focus:outline-none"
                                    value={formData.plotSummary}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control mt-8">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-full md:w-auto md:px-12 mx-auto"
                                disabled={submitting}
                            >
                                {submitting ? <span className="loading loading-spinner"></span> : 'Update Movie'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateMovie;
