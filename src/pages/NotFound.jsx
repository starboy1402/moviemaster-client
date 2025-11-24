const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <p className="text-3xl font-semibold mt-4">Page Not Found</p>
                <p className="text-gray-600 mt-2 mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">Go Home</a>
            </div>
        </div>
    );
};

export default NotFound;
