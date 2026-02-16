import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';
import { apiUrl } from '../../config/api';

const VerifyPaymentPage = () => {
    const { clearCart } = useCart();
    const { search } = useLocation();
    const navigate = useNavigate();
    const [statusMsg, setStatusMsg] = useState('Verifying payment…');

    // Grab token from localStorage
    const token = localStorage.getItem('authToken');
    useEffect(() => {
        const params = new URLSearchParams(search);
        const success = params.get('success');
        const session_id = params.get('session_id');

        // Cancelled or missing session:
        if (success !== 'true' || !session_id) {
            if (success === 'false') {
                // User explicitly cancelled
                navigate('/checkout', { replace: true });
                return;
            }
            setStatusMsg('Payment was not completed.');
            return;
        }

        // Stripe says success=true & we have a session_id:
        axios.get(apiUrl('/api/orders/confirm'), {
            params: { session_id },
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
            .then(() => {
                // Only clear the cart on true success:
                clearCart();
                navigate('/myorder', { replace: true });
            })
            .catch(err => {
                console.error('Confirmation error:', err);
                setStatusMsg('There was an error confirming your payment.');
            });
    }, [search, clearCart, navigate, token]);

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <p>{statusMsg}</p>
        </div>
    );
};

export default VerifyPaymentPage;
