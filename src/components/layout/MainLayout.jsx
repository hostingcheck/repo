import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import AnimatedBackground from '../animations/AnimatedBackground';
import TransitionEffect from '../animations/TransitionEffect';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSplashScreen = location.pathname === '/';

  // Determine which background image to use based on route
  const getBackgroundImage = () => {
    if (isLoginPage || isSplashScreen) return 'bg1.png';
    if (location.pathname.includes('premium')) return 'bg2.png';
    return 's4.png';
  };

  return (
    <AnimatedBackground>
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/assets/images/${getBackgroundImage()}')`
        }}
      >
        {!isSplashScreen && !isLoginPage && <Header />}
        
        <main className={`
          ${!isSplashScreen && !isLoginPage ? 'pt-20' : ''}
          min-h-screen
          relative z-10
        `}>
          <TransitionEffect location={location.pathname}>
            {children}
          </TransitionEffect>
        </main>
      </div>
    </AnimatedBackground>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;