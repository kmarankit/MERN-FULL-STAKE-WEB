import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import FloatingCart from '../../components/FloatingCart/FloatingCart.jsx';
import Logo from "../../assets/logo.png";
import Navbar from '../../components/Navbar/Navbar'

// --- Inline SVG Icons ---
const StarIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);
const PlusIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);
const MinusIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);
const CartIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);
const ArrowLeftIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
);
const CheckIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

// --- Suggestion Card Component ---
const SuggestionCard = ({ item }) => (
    <Link to={`/items/${item._id}`} className="flex-shrink-0 mb-20 w-48 md:w-56 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden hide-scrollbar">
        <img
            src={item.imageUrl || 'https://placehold.co/400x400/FEE2E2/E6002B?text=Image'}
            alt={item.name}
            className="w-full h-45 md:h-40 object-cover"
        />
        <div className="p-3">
            <h3 className="text-md font-bold text-gray-800 truncate">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">₹{item.price.toFixed(2)}</p>
        </div>
    </Link>
);

// --- Suggestions Container Component ---
const Suggestions = ({ title, items, isLoading, error }) => {
    if (isLoading || !items || items.length === 0) return null;
    if (error) return <div className="text-center p-4 text-red-500">Could not load suggestions.</div>;

    return (
        <div className="mt-12 md:mt-16 font-['Nunito']">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{title}</h2>
            <div className="flex gap-4 md:gap-6 pb-4 overflow-x-auto">
                {items.map(item => <SuggestionCard key={item._id} item={item} />)}
            </div>
        </div>
    );
};

const Itempage = () => {
    const { itemId } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(true);
    const [suggestionsError, setSuggestionsError] = useState(null);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    // Effect for auto-hiding the success banner
    useEffect(() => {
        if (showSuccessBanner) {
            const timer = setTimeout(() => {
                setShowSuccessBanner(false);
            }, 3000); // Banner visible for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [showSuccessBanner]);

    // Effect for fetching product and suggestion data
    useEffect(() => {
        if (!itemId) {
            setIsLoading(false);
            setError("No item ID provided.");
            return;
        }

        const fetchProductAndSuggestions = async () => {
            setIsLoading(true);
            setError(null);
            setProduct(null);

            try {
                const response = await fetch(`http://localhost:4000/api/items/${itemId}`);
                if (!response.ok) throw new Error('Product not found or network error.');
                const data = await response.json();
                setProduct(data);

                if (data && data.category) {
                    setIsSuggestionsLoading(true);
                    setSuggestionsError(null);
                    try {
                        const suggestionsResponse = await fetch(`http://localhost:4000/api/items/category/${data.category}`);
                        if (!suggestionsResponse.ok) throw new Error('Could not fetch suggestions.');
                        let suggestionsData = await suggestionsResponse.json();
                        suggestionsData = suggestionsData.filter(item => item._id !== itemId);
                        setSuggestions(suggestionsData);
                    } catch (err) {
                        setSuggestionsError(err.message);
                    } finally {
                        setIsSuggestionsLoading(false);
                    }
                } else {
                    setSuggestions([]);
                    setIsSuggestionsLoading(false);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductAndSuggestions();
    }, [itemId]);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = async () => {
        if (!product) return;
        setIsAdding(true);
        try {
            await addToCart(product, quantity);
            setShowSuccessBanner(true); // Show banner on success
        } catch (err) {
            console.error("Failed to add to cart:", err);
            alert("There was an issue adding the item to your cart.");
        } finally {
            setIsAdding(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }
    
    if (error) return <div className="text-center py-20 text-red-500 text-xl font-semibold bg-gray-50 min-h-screen">{error}</div>;
    if (!product) return <div className="text-center py-20 text-gray-700 text-xl font-semibold bg-gray-50 min-h-screen">Could not find the requested item.</div>;
        
    return (
        <div className=" bg-gray-100 min-h-screen font-['Nunito']">
            {/* Success Banner */}
            <div
                className={`fixed top-24 right-5 z-50 flex items-center gap-3 px-6 py-3 rounded-lg shadow-2xl bg-green-500 text-white transition-transform duration-500 ease-in-out
                ${showSuccessBanner ? 'transform translate-x-0' : 'transform translate-x-[120%]'}`}
            >
                <CheckIcon />
                <span className="font-semibold">Item added successfully!</span>
            </div>
            
            <div className="relative container mx-auto p-4 pt-16 md:p-8 lg:p-12">
                <button
                    onClick={() => navigate(-1)}
                    className="top-6 left-9 z-10 bg-[#e6002b]/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors fixed"
                    aria-label="Go back"
                >
                    <ArrowLeftIcon />
                </button>

                <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    
                    <div className="relative mb-8 lg:mb-0">
                        <img 
                            src={product.imageUrl || 'https://placehold.co/600x600/FEE2E2/E6002B?text=Image'} 
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-2xl shadow-lg aspect-square"
                        />
                        <img
                            src={Logo}
                            alt="Dhaba Logo"
                            className="absolute bottom-1 right-1 w-30 h-30 md:w-20 md:h-20 object-contain p-2"
                        />
                    </div>

                    <div className="font-['Nunito'] ">
                        <p className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-3 font-['Nunito']">{product.category || 'Category'}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 mb-4 uppercase font-['Nunito']">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">
                                <StarIcon />
                                <span>{product.rating || 'N/A'}</span>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-8 font-['Nunito']">{product.description}</p>
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-4xl font-bold text-gray-900 font-['Nunito']">₹{(product.price || 0).toFixed(2)}</p>
                            <div className="flex items-center gap-4 bg-gray-100 rounded-full p-2">
                                <button onClick={handleDecrement} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-red-500 shadow hover:bg-red-50 transition">
                                    <MinusIcon />
                                </button>
                                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                                <button onClick={handleIncrement} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-red-500 shadow hover:bg-red-50 transition">
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="w-full flex items-center justify-center gap-3 bg-red-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-red-400 disabled:cursor-not-allowed"
                        >
                            <CartIcon />
                            <span>{isAdding ? 'Adding to Cart...' : 'Add to Cart'}</span>
                        </button>
                    </div>
                </div>

                <Suggestions
                    title={`More from ${product.category}`}
                    items={suggestions}
                    isLoading={isSuggestionsLoading}
                    error={suggestionsError}
                />
            </div>
            
            <FloatingCart />
             <Navbar/>
        </div>
    );
};

export default Itempage;