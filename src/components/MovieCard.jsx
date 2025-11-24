const MovieCard = ({ movie }) => {
    return (
        <div className="card bg-base-100 shadow-xl card-hover h-full">
            <figure className="h-64 overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg line-clamp-1">{movie.title}</h2>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-warning gap-1">
                        ⭐ {movie.rating}
                    </span>
                    <span className="badge badge-outline">{movie.genre}</span>
                    <span className="badge badge-ghost">{movie.releaseYear}</span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                    <strong>Director:</strong> {movie.director}
                </p>

                <div className="card-actions justify-end mt-4">
                    <a
                        href={`/movies/${movie._id}`}
                        className="btn btn-primary btn-sm w-full"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
