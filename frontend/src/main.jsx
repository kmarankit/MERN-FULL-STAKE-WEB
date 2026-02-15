// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { CartProvider } from './CartContext/CartContext'

// createRoot(document.getElementById('root')).render(
//     <BrowserRouter>
//         <CartProvider>
//             <App />
//         </CartProvider>
//     </BrowserRouter>
// )

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './CartContext/CartContext';

// 1. Import the NotificationProvider
import { NotificationProvider } from './NotificationContext/NotificationContext'; // Adjust path if needed

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* 2. Wrap your other providers with NotificationProvider */}
    <NotificationProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </NotificationProvider>
  </BrowserRouter>
);