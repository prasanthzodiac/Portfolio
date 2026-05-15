import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Portfolio from './pages/Portfolio';
import EditorPortfolioPage from '@/editor-portfolio/EditorPortfolioPage';
import { useEffect, useState } from 'react';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';
import { soundManager } from '@/lib/sound';
import SmoothScroll from '@/components/SmoothScroll';
import { getLenis } from '@/lib/smooth-scroll';

const GlobalTransitionOverlay = () => {
  const [liquidState, setLiquidState] = useState({ active: false, x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleTransition = (e) => {
      setLiquidState({ active: true, x: e.detail.x, y: e.detail.y });
      soundManager.playTransition();

      setTimeout(() => {
        navigate(e.detail.to);
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);

        setTimeout(() => {
          setLiquidState({ active: false, x: 0, y: 0 });
        }, 400);
      }, 1500);
    };

    window.addEventListener('liquid-transition', handleTransition);
    return () => window.removeEventListener('liquid-transition', handleTransition);
  }, [navigate]);

  return <LiquidEffectAnimation isActive={liquidState.active} originX={liquidState.x} originY={liquidState.y} />;
};

const routerBasename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || undefined;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

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
    const handleClick = (e) => {
      if (e.target.closest('button, a')) {
        soundManager.playClick();
      }
    };
    window.addEventListener('click', handleClick, { capture: true });
    return () => window.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <Router basename={routerBasename}>
          <SmoothScroll>
            <AuthenticatedApp />
          </SmoothScroll>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
