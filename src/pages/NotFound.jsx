import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="text-center relative z-10 p-8 bg-base-200/50 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-2xl max-w-lg w-full mx-4">
                <div className="text-9xl mb-4">🤔</div>
                <h1 className="text-8xl font-bold text-primary mb-2">404</h1>
                <h2 className="text-3xl font-bold text-base-content mb-4">Page Not Found</h2>
                <p className="text-base-content/70 mb-8 text-lg">
                    Oops! The movie reel seems to have broken. The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20 w-full sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
