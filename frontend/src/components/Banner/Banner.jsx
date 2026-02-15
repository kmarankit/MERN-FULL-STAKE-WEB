
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// // Replaced local image import with a direct URL for compatibility.
//  import bannerImage from "../../assets/banner.png"; // ✅ your provided image

// const calculateLevenshteinDistance = (a, b) => {
//     if (a.length === 0) return b.length;
//     if (b.length === 0) return a.length;
//     const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
//     for (let i = 0; i <= a.length; i += 1) matrix[0][i] = i;
//     for (let j = 0; j <= b.length; j += 1) matrix[j][0] = j;
//     for (let j = 1; j <= b.length; j += 1) {
//         for (let i = 1; i <= a.length; i += 1) {
//             const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
//             matrix[j][i] = Math.min(
//                 matrix[j][i - 1] + 1,
//                 matrix[j - 1][i] + 1,
//                 matrix[j - 1][i - 1] + indicator,
//             );
//         }
//     }
//     return matrix[b.length][a.length];
// };

// const Banner = () => {
//     const [query, setQuery] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [allItems, setAllItems] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [isFallback, setIsFallback] = useState(false); // State to track fallback suggestions
//     const searchContainerRef = useRef(null);
//     const navigate = useNavigate();

//     // 1. Fetch all items once when the component mounts
//     useEffect(() => {
//         const fetchAllItems = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/items');
//                 setAllItems(response.data);
//             } catch (err) {
//                 console.error("Failed to fetch items:", err);
//             }
//         };
//         fetchAllItems();
//     }, []);

//     // 2. Implement fuzzy search and fallback logic
//     useEffect(() => {
//         if (query.trim()) {
//             const lowerCaseQuery = query.toLowerCase();

//             // Fuzzy search: find items with similar spelling
//             const fuzzyMatches = allItems
//                 .map(item => ({
//                     ...item,
//                     distance: calculateLevenshteinDistance(lowerCaseQuery, item.name.toLowerCase())
//                 }))
//                 .filter(item => {
//                     const threshold = lowerCaseQuery.length < 4 ? 1 : 2; // Stricter for short words
//                     return item.distance <= threshold;
//                 })
//                 .sort((a, b) => a.distance - b.distance);

//             if (fuzzyMatches.length > 0) {
//                 setSuggestions(fuzzyMatches);
//                 setIsFallback(false);
//             } else {
//                 // Fallback: If no matches, suggest "Dhaba Special" items
//                 const dhabaSpecials = allItems.filter(
//                     item => item.category === 'Dhaba Special'
//                 ).slice(0, 5); // Show up to 5 specials
//                 setSuggestions(dhabaSpecials);
//                 setIsFallback(true);
//             }
//         } else {
//             setSuggestions([]);
//             setIsFallback(false);
//         }
//     }, [query, allItems]);
    
//     // 3. Handle clicks outside to close suggestions
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
//                 setShowSuggestions(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim()) {
//             navigate(`/search?q=${query}`);
//             setShowSuggestions(false);
//         }
//     };

//     const handleSuggestionClick = (itemId) => {
//         navigate(`/items/${itemId}`);
//         setQuery("");
//         setShowSuggestions(false);
//     };

//     return (
//         <div
//             className="relative h-[322px] sm:h-80 flex items-center justify-center text-center px-4 bg-cover bg-center"
//             style={{ backgroundImage: `url(${bannerImage})` }}
//         >
//             <div className="absolute inset-0 bg-white/10"></div>
//             <div className="relative z-10 w-full max-w-2xl">
               
                

//                 <div className="relative max-w-md mx-auto border-2 rounded-4xl border-gray-400" ref={searchContainerRef}>
//                     <form onSubmit={handleSubmit} className="flex items-center">
//                         <div className="relative w-full">
                           
//                             <input
//                                 type="text"
//                                 id="simple-search"
//                                 className="bg-white/20 backdrop-blur border-2 border-transparent  placeholder-[#e6002b] text-sm rounded-full focus:ring-2 focus:ring-red-400 focus:border-red-500 block w-full ps-10 p-3 transition-all duration-300 font-['Nunito']"
//                                 placeholder="Search Dishes..."
//                                 required
//                                 value={query}
//                                 onChange={(e) => setQuery(e.target.value)}
//                                 onFocus={() => setShowSuggestions(true)}
//                                 autoComplete="off"
//                             />
//                         </div>
                        
//                     </form>

//                     {/* Suggestions Dropdown */}
//                     {showSuggestions && query.trim() && (
//                         <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-20 text-left">
//                             {isFallback && (
//                                 <div className="p-2 text-xs font-bold text-gray-500 border-b bg-gray-50">
//                                     No results found. Try a Dhaba Special?
//                                 </div>
//                             )}
//                             {suggestions.length > 0 ? (
//                                 <ul className="max-h-60 overflow-y-auto">
//                                     {suggestions.map((item) => (
//                                         <li
//                                             key={item._id}
//                                             className="p-3 text-gray-800 hover:bg-gray-100 cursor-pointer text-sm transition-colors flex items-center gap-3"
//                                             onClick={() => handleSuggestionClick(item._id)}
//                                         >
//                                             <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
//                                             <span>{item.name}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <div className="text-gray-500 p-3 text-sm">No results found for "{query}".</div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import bannerImage from "../../assets/banner.png";

const calculateLevenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    for (let i = 0; i <= a.length; i += 1) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j += 1) matrix[j][0] = j;
    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + indicator,
            );
        }
    }
    return matrix[b.length][a.length];
};

const Banner = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFallback, setIsFallback] = useState(false);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    // 1. Fetch all items once when the component mounts
    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                console.log("1. Attempting to fetch items..."); // DEBUG
                const response = await axios.get('http://localhost:4000/api/items');
                console.log("2. API Response Data:", response.data); // DEBUG
                setAllItems(response.data);
            } catch (err) {
                console.error("❗️ FAILED TO FETCH ITEMS:", err); // DEBUG
            }
        };
        fetchAllItems();
    }, []);

    // 2. Implement fuzzy search and fallback logic
  // 2. Implement a "contains" search logic
    useEffect(() => {
        if (query.trim() && allItems.length > 0) {
            const lowerCaseQuery = query.toLowerCase();

            // Find all items where the name includes the search query
            const searchResults = allItems.filter(item =>
                item.name.toLowerCase().includes(lowerCaseQuery)
            );

            // Optional: Sort the results to show the best matches first
            searchResults.sort((a, b) => {
                const aName = a.name.toLowerCase();
                const bName = b.name.toLowerCase();
                // Prioritize items that start with the query
                if (aName.startsWith(lowerCaseQuery) && !bName.startsWith(lowerCaseQuery)) return -1;
                if (!aName.startsWith(lowerCaseQuery) && bName.startsWith(lowerCaseQuery)) return 1;
                // Otherwise, sort alphabetically
                return aName.localeCompare(bName);
            });

            if (searchResults.length > 0) {
                setSuggestions(searchResults);
                setIsFallback(false);
            } else {
                // Fallback: If no matches, suggest "Dhaba Special" items
                const dhabaSpecials = allItems.filter(
                    item => item.category === 'Dhaba Special'
                ).slice(0, 5);
                setSuggestions(dhabaSpecials);
                setIsFallback(true);
            }
        } else {
            setSuggestions([]);
            setIsFallback(false);
        }
    }, [query, allItems]);
    
    // 3. Handle clicks outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (itemId) => {
        navigate(`/items/${itemId}`);
        setQuery("");
        setShowSuggestions(false);
    };

    return (
        <div
            className="relative h-[322px] sm:h-80 flex items-center justify-center text-center px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10 w-full max-w-2xl">
                <div className="relative max-w-md mx-auto" ref={searchContainerRef}>
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-white/80 backdrop-blur border-2 border-gray-200 placeholder-[#e6002b] text-sm rounded-full focus:ring-2 focus:ring-red-400 focus:border-red-500 block w-full ps-10 p-3 transition-all duration-300 font-['Nunito']"
                                placeholder="Search Dishes..."
                                required
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => {
                                    console.log("6. Input focused, setting showSuggestions to true."); // DEBUG
                                    setShowSuggestions(true);
                                }}
                                autoComplete="off"
                            />
                        </div>
                    </form>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && query.trim() && (
                        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-20 text-left">
                            {isFallback && (
                                <div className="p-2 text-xs font-bold text-gray-500 border-b bg-gray-50">
                                    No results found. Try a Dhaba Special?
                                </div>
                            )}
                            {suggestions.length > 0 ? (
                                <ul className="max-h-60 overflow-y-auto">
                                    {suggestions.map((item) => (
                                        <li
                                            key={item._id}
                                            className="p-3 text-gray-800 hover:bg-gray-100 cursor-pointer text-sm transition-colors flex items-center gap-3"
                                            onClick={() => handleSuggestionClick(item._id)}
                                        >
                                            <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                                            <span>{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-gray-500 p-3 text-sm">No results found for "{query}".</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner;