// src/components/ListItems.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2, FiStar, FiHeart } from "react-icons/fi";
import AdminNavbar from "../Navbar/Navbar";
import item from "../../../../backend/modals/item";

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get("https://mern-full-stake-web.onrender.com/api/items");
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Delete handler
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`https://mern-full-stake-web.onrender.com/api/items/${itemId}`);
      setItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="flex items-center justify-center h-screen text-gray-500 font-medium">
          Loading menu…
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">
              Manage Menu Items
            </h2>
<h3>
  Total Items: {items.length}
</h3>
            
           
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Price (₹)</th>
                    <th className="py-3 px-4 text-left">Rating</th>
                    <th className="py-3 px-4 text-left">Hearts</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-gray-50 transition ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/70"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <img
                          src={item.imageUrl  }
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover shadow"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.category}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        ₹{item.price}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex">{renderStars(item.rating)}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <FiHeart className="text-xl text-pink-500" />
                          <span>{item.hearts}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                        >
                          <FiTrash2 className="text-xl text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {items.length === 0 && (
              <div className="text-center py-8 text-gray-500 font-medium">
                No items found in the menu
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItems;
