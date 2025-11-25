import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { register, googleLogin } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            setErrors({ password: passwordErrors });
            toast.error(passwordErrors[0]);
            return;
        }

        setLoading(true);
        try {
            await register(formData.email, formData.password, formData.name, formData.photoURL);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            toast.success('Registered with Google!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-8 pt-20 transition-colors duration-300">
            <div className="w-full max-w-md">
                <div className="bg-base-200/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-base-content/10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-4xl">🎬</span>
                            <span className="text-3xl font-bold text-base-content">
                                Movie<span className="text-primary">Master</span>
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-base-content">Create Account</h2>
                        <p className="text-base-content/60 mt-2">Join us to start your collection</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-base-content font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-base-content font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-base-content font-medium mb-2">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                placeholder="https://example.com/photo.jpg"
                                className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                value={formData.photoURL}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-base-content font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter a strong password"
                                className={`input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none ${errors.password ? 'border-error' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && (
                                <div className="mt-2 space-y-1">
                                    {errors.password.map((error, index) => (
                                        <p key={index} className="text-error text-sm">{error}</p>
                                    ))}
                                </div>
                            )}
                            <p className="text-base-content/50 text-xs mt-2">
                                Must contain: uppercase, lowercase, min 6 characters
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full text-lg h-12"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Register'}
                        </button>
                    </form>

                    <div className="divider text-base-content/60">OR</div>

                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full h-12 gap-3 text-base-content hover:bg-base-content hover:text-base-100"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center mt-6 text-base-content/60">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline font-medium">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
