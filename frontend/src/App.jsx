

import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// --- Page and Component Imports ---
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import ContactPage from './pages/ContactPage/ContactPage';
import CheckoutPage from './pages/Checkout/Checkout';
import AboutPage from './pages/AboutPage/AboutPage';
import Menu from './pages/Menu/Menu';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MyOrders from './pages/MyOredrs/MyOrders';
import VerifyPaymentPage from './pages/VerifyPaymentPage/VerifyPaymentPage';
import TnC from './pages/TnC/TnC';
import PrivecyPolicy from './pages/PrivecyPolicy/PrivecyPolicy';
import RefundCancellationPolicy from './pages/Refund/Refund';
import Shipping from './pages/Shipping/Shipping';
import Address from './pages/Address/Address';
import UsersFootFall from './components/UsersFootFall/UsersFootFall.jsx';
import Bill from './components/Bill/Bill.jsx';
import Itempage from './components/ItemPage/ItemPage.jsx';
import FloatingCart from './components/FloatingCart/FloatingCart.jsx';
import { useNotifications } from './NotificationContext/NotificationContext';
import OrderPlaced from './components/NotificationStatus/OrderPlaced';
import OutForDilevery from './components/NotificationStatus/OutForDilevery';
import Deliverd from './components/NotificationStatus/Delivered';
import SignUp from './components/SignUp/SignUp.jsx';

// --- Layout that wraps your main pages ---
const MainLayout = () => {
  const { activeIsland } = useNotifications();
  return (
    <div className="relative">
      <main>
        <Outlet />
      </main>

      {/* Render notification islands on top of content */}
      {activeIsland === 'placed' && <OrderPlaced />}
      {activeIsland === 'delivery' && <OutForDilevery />}
      {activeIsland === 'delivered' && <Deliverd />}
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* All routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/tnc" element={<TnC />} />
        <Route path="/usersfootfall" element={<UsersFootFall />} />
        <Route path="/privecypolicy" element={<PrivecyPolicy />} />
        <Route path="/refundpolicy" element={<RefundCancellationPolicy />} />
        <Route path="/shippingPolicy" element={<Shipping />} />
        <Route path="/bill/:_id" element={<Bill />} />
        <Route path="/items/:itemId" element={<Itempage />} />
        <Route path="/floatingcart" element={<FloatingCart />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/address" element={<Address />} />
          <Route path="/myorder/verify" element={<VerifyPaymentPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
