import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/");
    } else {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }
  }, [navigate]);

  const handleAddProduct = () => {
    if (!productName || !price) return;

    const newProduct = { name: productName, price: price };
    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProductName("");
    setPrice("");
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center pt-10">
      <div className="w-[700px] flex justify-between mb-6">
        <h2 className="text-2xl ml-8 font-bold text-[#234E4C]">Dashboard</h2>

        <button
          onClick={handleLogout}
          className="bg-[#234E4C] text-white px-3 py-1 mr-8 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4">
        <div className="w-[300px] bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Add Product</h3>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-lg mb-2 text-sm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded-lg mb-3 text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            onClick={handleAddProduct}
            className="w-full bg-[#234E4C] text-white py-2 rounded-lg text-sm"
          >
            Add
          </button>

          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-lg mt-4 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-[350px] bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Product List</h3>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-sm">No Product Found</p>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg text-sm"
                >
                  <span>
                    {product.name} - ₹{product.price}
                  </span>

                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
