import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success('Logged in successfully!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            toast.success('Logged in with Google!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 pt-20 transition-colors duration-300">
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
                        <h2 className="text-2xl font-bold text-base-content">Welcome Back</h2>
                        <p className="text-base-content/60 mt-2">Login to manage your movie collection</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-base-content font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-base-content font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full text-lg h-12"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
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

                    <p className="text-center mt-8 text-base-content/60">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline font-medium">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
