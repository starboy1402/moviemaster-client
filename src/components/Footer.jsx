import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-neutral border-t border-white/10">
            <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🎬</span>
                            <span className="text-2xl font-bold text-white">
                                Movie<span className="text-primary">Master</span>
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your ultimate companion for managing and discovering movies.
                            Organize your collection effortlessly.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="btn btn-circle btn-sm bg-white/10 border-white/20 hover:bg-primary hover:border-primary text-white">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                                className="btn btn-circle btn-sm bg-white/10 border-white/20 hover:bg-primary hover:border-primary text-white">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="btn btn-circle btn-sm bg-white/10 border-white/20 hover:bg-primary hover:border-primary text-white">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Navigation</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-primary transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies" className="text-gray-300 hover:text-primary transition-colors text-sm">
                                    All Movies
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-collection" className="text-gray-300 hover:text-primary transition-colors text-sm">
                                    My Collection
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-movie" className="text-gray-300 hover:text-primary transition-colors text-sm">
                                    Add Movie
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
                        <ul className="space-y-3">
                            <li><span className="text-gray-300 text-sm">Action</span></li>
                            <li><span className="text-gray-300 text-sm">Drama</span></li>
                            <li><span className="text-gray-300 text-sm">Comedy</span></li>
                            <li><span className="text-gray-300 text-sm">Sci-Fi</span></li>
                            <li><span className="text-gray-300 text-sm">Horror</span></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">Help Center</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="divider my-8"></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-300 text-sm">
                        © {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-gray-400">
                        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full">⭐ 4.9/5 Rating</span>
                        <span className="px-3 py-1 bg-success/20 text-success rounded-full">1000+ Users</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
