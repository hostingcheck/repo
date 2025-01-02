import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import MainLayout from './components/layout/MainLayout';

// Loading component for suspense fallback
const Loading = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background">
    <div className="text-2xl text-white gradient-text">Loading...</div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </MainLayout>
    </Suspense>
  );
}

export default App;