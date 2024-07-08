import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import BrandPage from './pages/Brand/BrandList';
import DetailPage from './pages/Watch/WatchDetail';
import WatchesPage from './pages/Watch/WatchList';
import UserPage from './pages/User/UserList';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import Profile from './pages/User/Profile';
import CheckoutPage from './pages/Checkout/Checkout';
import CheckoutSuccessPage from './pages/Checkout/CheckoutSuccess';
import OrderManagementPage from './pages/Order/Order';
import Orders from './pages/User/Orders';
import CartPage from './pages/User/Cart';


const { Content } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Navbar />
      <br />
      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 64px - 134px)' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/watches" element={<WatchesPage />} />
            <Route path="/watches/:id" element={<DetailPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorders" element={<Orders />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="/orders" element={<OrderManagementPage />} />
          </Routes>
        </div>
      </Content>
      <br />
      <Footer />
    </Layout>
  );
};

export default App;
