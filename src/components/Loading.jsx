const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-base-100">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-lg font-semibold text-base-content">Loading...</p>
        </div>
    );
};

export default Loading;
