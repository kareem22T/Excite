import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import Home from './pages/home/home';
import "./css/main.css"
import Product from './pages/product';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import Wishlist from './pages/wishlist';
import Category from './pages/categories/category';
import Addresses from './pages/Adresses';
import Cart from './pages/cart';
import Brand from './pages/brand/brand';

function App() {
  const isAuthentication = useSelector((state:any) => state.auth);

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path="/wishlist"
          element={
            isAuthentication.isAuthenticated ?
            <>
              <Wishlist />
            </>
            : 
            <Navigate to="/" replace /> // Use Navigate with replace for better behavior
          }
        />
        <Route
          path="/cart"
          element={
            isAuthentication.isAuthenticated ?
            <>
              <Cart />
            </>
            : 
            <Navigate to="/" replace /> // Use Navigate with replace for better behavior
          }
        />
        <Route
          path="/my-addresses"
          element={
            isAuthentication.isAuthenticated ?
            <>
              <Addresses />
            </>
            : 
            <Navigate to="/login" replace /> // Use Navigate with replace for better behavior
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Product />
            </>
          }
        />
        <Route
          path="/category/:id/:name"
          element={
            <>
              <Category />
            </>
          }
        />
        <Route
          path="/brand/:id/:name"
          element={
            <>
              <Brand />
            </>
          }
        />
        <Route
          path="/login"
          element={
            !isAuthentication.isAuthenticated ?
            <>
              <Login />
            </>
            : 
            <Navigate to="/" replace /> // Use Navigate with replace for better behavior
          }
        />
        <Route
          path="/register"
          element={
            !isAuthentication.isAuthenticated ?
            <>
              <Register />
            </>
            : 
            <Navigate to="/" replace /> // Use Navigate with replace for better behavior
          }
        />
      </Routes>
    </>
  );
}

export default App;
