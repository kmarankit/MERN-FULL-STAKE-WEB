import React, { useState, useRef } from "react";
import axios from "axios";
import { FiUpload, FiHeart, FiStar } from "react-icons/fi";
import AdminNavbar from "../Navbar/Navbar";
import "./AddItems.css"; // external css file

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: 0,
    hearts: 0,
    total: 0,
    isVeg: true, // 1. ADD isVeg to the state, defaulting to Veg
    image: null,
    preview: "",
  });
  const [categories] = useState([
    
    "Indo-Chinese",
    "Roti & Paratha",
    "Biryani & Rice",
    "Main Courses",
    "Dhaba Special",
  ]);
  const [hoverRating, setHoverRating] = useState(0);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleRating = (rating) =>
    setFormData((prev) => ({ ...prev, rating }));
  
  const handleHearts = () =>
    setFormData((prev) => ({ ...prev, hearts: prev.hearts + 1 }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === "preview") return;
        payload.append(key, val);
      });
      const res = await axios.post(
        "http://localhost:4000/api/items",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Created Item:", res.data);
      // Reset the form after successful submission
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        rating: 0,
        hearts: 0,
        total: 0,
        isVeg: true, // Also reset the isVeg state
        image: null,
        preview: "",
      });
    } catch (err) {
      console.error("Error uploading item:", err.response || err.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="additems-container">
        <div className="additems-card">
          <h2 className="additems-title">➕ Add New Menu Item</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ... Upload and other inputs remain the same ... */}
            <div>
                 <label className="additems-label">Product Image</label>
                 <div
                   className="upload-box"
                   onClick={() => fileInputRef.current.click()}
                 >
                   {formData.preview ? (
                     <img
                       src={formData.preview}
                       alt="Preview"
                       className="upload-preview"
                     />
                   ) : (
                     <div className="upload-placeholder">
                       <FiUpload className="text-3xl mb-2" />
                       <span>Click to upload image</span>
                     </div>
                   )}
                   <input
                     type="file"
                     accept="image/*"
                     ref={fileInputRef}
                     onChange={handleImageUpload}
                     className="hidden"
                     required
                   />
                 </div>
               </div>

               {/* Product Name */}
               <div>
                 <label className="additems-label">Product Name</label>
                 <input
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   className="additems-input"
                   placeholder="Enter product name"
                   required
                 />
               </div>

               {/* Description */}
               <div>
                 <label className="additems-label">Description</label>
                 <textarea
                   name="description"
                   value={formData.description}
                   onChange={handleInputChange}
                   className="additems-textarea"
                   placeholder="Enter product description"
                   required
                 />
               </div>


            {/* 2. UPDATE grid layout and ADD the new toggle */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="additems-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="additems-input"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="additems-label">Price (₹)</label>
                <div className="relative font-bold">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="additems-input pl-10"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* --- NEW: Food Type Toggle --- */}
              <div>
                <label className="additems-label">Food Type</label>
                <div className="flex items-center space-x-1 rounded-lg p-1 bg-gray-200/60">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isVeg: true }))}
                    className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                      formData.isVeg
                        ? 'bg-green-500 text-white shadow'
                        : 'bg-transparent text-gray-700'
                    }`}
                  >
                    Veg
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isVeg: false }))}
                    className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                      !formData.isVeg
                        ? 'bg-red-500 text-white shadow'
                        : 'bg-transparent text-gray-700'
                    }`}
                  >
                    Non-Veg
                  </button>
                </div>
              </div>
            </div>

            {/* ... Rating, Popularity, and Submit button remain the same ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {/* Rating */}
                   <div>
                     <label className="additems-label">Rating</label>
                     <div className="flex gap-2">
                       {[1, 2, 3, 4, 5].map((star) => (
                         <button
                           key={star}
                           type="button"
                           onClick={() => handleRating(star)}
                           onMouseEnter={() => setHoverRating(star)}
                           onMouseLeave={() => setHoverRating(0)}
                           className="text-2xl transition-transform hover:scale-110"
                         >
                           <FiStar
                             className={
                               star <= (hoverRating || formData.rating)
                                 ? "text-yellow-400 fill-current"
                                 : "text-gray-300"
                             }
                           />
                         </button>
                       ))}
                     </div>
                   </div>

                   {/* Popularity */}
                   <div>
                     <label className="additems-label">Popularity</label>
                     <div className="flex items-center gap-4">
                       <button
                         type="button"
                         onClick={handleHearts}
                         className="text-2xl text-red-400 hover:text-red-500 transition-transform hover:scale-110"
                       >
                         <FiHeart />
                       </button>
                       <input
                         type="number"
                         name="hearts"
                         value={formData.hearts}
                         onChange={handleInputChange}
                         className="additems-input w-24"
                         placeholder="Likes"
                         min="0"
                         required
                       />
                     </div>
                   </div>
                 </div>

                 {/* Submit */}
                 <button type="submit" className="additems-submit">
                   Add to Menu
                 </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddItems;