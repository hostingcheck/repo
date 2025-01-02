import { Suspense } from 'react';
import { lazyRoutes } from './lazyRoutes';
import LoadingSpinner from './components/common/LoadingSpinner';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const routes = lazyRoutes.map(route => ({
  path: route.path,
  element: (
    <Suspense fallback={<LoadingFallback />}>
      <route.component />
    </Suspense>
  )
}));