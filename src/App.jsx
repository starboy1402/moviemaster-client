import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import AllMovies from './pages/AllMovies';
import MovieDetails from './pages/MovieDetails';
import AddMovie from './pages/AddMovie';
import UpdateMovie from './pages/UpdateMovie';
import MyCollection from './pages/MyCollection';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<AllMovies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route 
                path="/add-movie" 
                element={
                  <PrivateRoute>
                    <AddMovie />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/update-movie/:id" 
                element={
                  <PrivateRoute>
                    <UpdateMovie />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/my-collection" 
                element={
                  <PrivateRoute>
                    <MyCollection />
                  </PrivateRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;

