import { Link } from 'react-router-dom';

// Helper function to get actual image URL from Unsplash page URL
const getImageUrl = (url) => {
    if (!url) return null;

    // If it's already a direct image URL, return it
    if (url.includes('images.unsplash.com') || url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg')) {
        return url;
    }

    // If it's an Unsplash photo page URL, extract the photo ID and create proper image URL
    if (url.includes('unsplash.com/photos/')) {
        // Extract the last part after the last hyphen which is the photo ID
        const parts = url.split('/photos/')[1];
        if (parts) {
            // Get the last segment after splitting by '-'
            const segments = parts.split('-');
            const photoId = segments[segments.length - 1];
            if (photoId) {
                // Use Unsplash source URL which is more reliable
                return `https://source.unsplash.com/${photoId}/800x1200`;
            }
        }
    }

    // Return original URL if no conversion needed
    return url;
};

const MovieCard = ({ movie }) => {
    return (
        <div className="group relative h-full">
            <div className="bg-base-200/50 backdrop-blur-sm rounded-xl overflow-hidden border border-base-content/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                        src={getImageUrl(movie.posterUrl)}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-300/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base-content font-bold text-base mb-2 line-clamp-2 min-h-[3rem]">
                        {movie.title}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-base-content font-semibold text-sm">{movie.rating}</span>
                        </div>
                        <span className="text-base-content/60 text-xs">{movie.releaseYear}</span>
                    </div>

                    <div className="mb-3">
                        <span className="badge badge-sm badge-primary/20 text-primary border-primary/30">
                            {movie.genre}
                        </span>
                    </div>

                    <div className="mt-auto">
                        <Link
                            to={`/movies/${movie._id}`}
                            className="btn btn-primary btn-sm w-full gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
