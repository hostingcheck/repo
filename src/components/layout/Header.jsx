import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import GradientText from '../animations/GradientText';

const Header = () => {
  const { user } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/assets/logos/ideaforge-logo.png" 
            alt="IdeaForge" 
            className="w-10 h-10"
          />
          <GradientText
            text="IdeaForge"
            className="text-2xl font-bold"
            gradient="from-orange-500 via-purple-500 to-blue-500"
          />
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                {user.name[0].toUpperCase()}
              </div>
              <span className="text-white/80">{user.name}</span>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md 
                        border border-white/20 text-white hover:bg-white/20 
                        transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;