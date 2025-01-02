import { lazy } from 'react';

// Lazy load components
const SplashScreen = lazy(() => import('./pages/SplashScreen'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const IdeaInputPage = lazy(() => import('./pages/IdeaInputPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const GenerateImagesPage = lazy(() => import('./pages/GenerateImagesPage'));
const DownloadPage = lazy(() => import('./pages/DownloadPage'));
const PremiumPage = lazy(() => import('./pages/PremiumPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const WebsiteGenerationPage = lazy(() => import('./pages/WebsiteGenerationPage'));
const ExploreIdeasPage = lazy(() => import('./pages/ExploreIdeasPage'));

export const lazyRoutes = [
  {
    path: '/',
    component: SplashScreen
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/idea',
    component: IdeaInputPage
  },
  {
    path: '/documentation',
    component: DocumentationPage
  },
  {
    path: '/generate-images',
    component: GenerateImagesPage
  },
  {
    path: '/download',
    component: DownloadPage
  },
  {
    path: '/premium',
    component: PremiumPage
  },
  {
    path: '/success',
    component: SuccessPage
  },
  {
    path: '/website-generation',
    component: WebsiteGenerationPage
  },
  {
    path: '/explore',
    component: ExploreIdeasPage
  }
];