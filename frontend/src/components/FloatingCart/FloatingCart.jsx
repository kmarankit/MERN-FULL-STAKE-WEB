import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import '../FloatingCart/FloatingCart.css';
// import FloatingCart from './components/FloatingCart/FlotingCart.jsx'

// Reusable SVG icon for the cart
const CartIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-white"
    >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

const FloatingCartIcon = () => {
    // Access cart data and the animation trigger from the context
    const { totalItems, justAdded } = useCart();

    // The cart icon will not be displayed if there are no items
    if (totalItems === 0) {
        return null;
    }

    return (
        <Link 
            to="/cart" 
            // The 'justAdded' state triggers a CSS animation
            className={`floating-cart-link ${justAdded ? 'just-added-animation' : ''}`}
            aria-label={`View your cart with ${totalItems} items`}
        >
            <div className="cart-icon-container">
                <CartIcon />
                {totalItems > 0 && (
                    <span className="cart-item-count">
                        {totalItems}
                    </span>
                )}
            </div>
            <span className="cart-label">View Cart</span>
        </Link>
    );
};

export default FloatingCartIcon;

