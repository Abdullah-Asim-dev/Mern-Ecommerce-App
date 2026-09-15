import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div className="min-h-screen bg-[#050816]">
      <Navbar />

      <main className="lg:ml-64">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route
            path="/updateProduct/:id"
            element={<UpdateProduct />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;