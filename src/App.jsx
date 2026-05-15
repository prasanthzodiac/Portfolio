import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
// Add page imports here
import Portfolio from './pages/Portfolio';
import EditorPortfolioPage from '@/editor-portfolio/EditorPortfolioPage';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';
import { soundManager } from '@/lib/sound';

const GlobalTransitionOverlay = () => {
  const [liquidState, setLiquidState] = useState({ active: false, x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleTransition = (e) => {
      setLiquidState({ active: true, x: e.detail.x, y: e.detail.y });
      soundManager.playTransition();
      
      // Wait for the circular liquid reveal to cover the entire screen
      setTimeout(() => {
        navigate(e.detail.to);
        
        // Gracefully fade out the liquid overlay revealing the newly loaded page
        setTimeout(() => {
          setLiquidState({ active: false, x: 0, y: 0 });
        }, 400);
      }, 1500); // Duration matches framer-motion transition
    };

    window.addEventListener('liquid-transition', handleTransition);
    return () => window.removeEventListener('liquid-transition', handleTransition);
  }, [navigate]);

  return <LiquidEffectAnimation isActive={liquidState.active} originX={liquidState.x} originY={liquidState.y} />;
};

const routerBasename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || undefined;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <>
      <GlobalTransitionOverlay />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/editor" element={<EditorPortfolioPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};


function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Global Click Sound
    const handleClick = (e) => {
      if (e.target.closest('button, a')) {
        soundManager.playClick();
      }
    };
    window.addEventListener('click', handleClick, { capture: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <Router basename={routerBasename}>
          <GlobalTransitionOverlay />
          <AuthenticatedApp />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;