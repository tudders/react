import React from 'react';

//routes
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Orders from './pages/Orders';
import Login from './pages/Login';
import NoPage from './pages/NoPage';

//preline
import { useEffect } from 'react';
import 'preline/preline';
import { IStaticMethods } from 'preline/preline';

//css
import './App.css';

//store
import useStore from './store';

export const ProtectedRoute = ({ children }: any) => {
  const isAuthenticated = useStore(state => state.loggedIn);
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
