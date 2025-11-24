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
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                placeholder="https://example.com/photo.jpg"
                                className="input input-bordered"
                                value={formData.photoURL}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter a strong password"
                                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && (
                                <label className="label">
                                    {errors.password.map((error, index) => (
                                        <span key={index} className="label-text-alt text-error block">{error}</span>
                                    ))}
                                </label>
                            )}
                            <label className="label">
                                <span className="label-text-alt text-sm">
                                    Must contain: uppercase, lowercase, min 6 characters
                                </span>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : 'Register'}
                            </button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline"
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

                    <p className="text-center mt-4">
                        Already have an account?
                        <Link to="/login" className="link link-primary ml-1">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
