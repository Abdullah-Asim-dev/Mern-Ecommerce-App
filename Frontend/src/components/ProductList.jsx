import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch Products
  
 const fetchProducts = async () => {
  try {
    setLoading(true);

  const response = await fetch(
  "https://mern-ecommerce-app-1v8u.onrender.com/getProducts"
);
    const data = await response.json();

    setProducts(data.result);
  } catch (error) {
    console.log("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchProducts();
}, []);

  // Delete Product
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Delete product?",
      text: "This product will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#ffffff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#334155",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        "https://mern-ecommerce-app-1v8u.onrender.com/delete/" + id,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts((previousProducts) =>
          previousProducts.filter(
            (product) => product._id !== id
          )
        );

        Swal.fire({
          title: "Deleted",
          text: "Product has been removed.",
          icon: "success",
          background: "#0f172a",
          color: "#ffffff",
          confirmButtonColor: "#06b6d4",
        });
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Search
  const filteredProducts = products.filter((product) =>
    String(product.name)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Dashboard Stats
  const totalProducts = products.length;

  const totalSales = products.reduce(
    (total, product) =>
      total + Number(product.numberOfSales || 0),
    0
  );

  let averageRating = 0;

  if (products.length > 0) {
    const ratingTotal = products.reduce(
      (total, product) =>
        total + Number(product.rating || 0),
      0
    );

    averageRating = (ratingTotal / products.length).toFixed(1);
  }

  const freeShippingProducts = products.filter(
    (product) => product.freeShipping === "Yes"
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Products in inventory",
      icon: "▦",
    },
    {
      title: "Total Sales",
      value: totalSales.toLocaleString(),
      description: "Units sold",
      icon: "↗",
    },
    {
      title: "Average Rating",
      value: averageRating,
      description: "Across all products",
      icon: "★",
    },
    {
      title: "Free Shipping",
      value: freeShippingProducts,
      description: "Eligible products",
      icon: "⌁",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <main className="relative overflow-hidden px-5 py-8 sm:px-8 lg:px-10">

        {/* Background Effects */}
        <div className="pointer-events-none absolute left-1/3 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative">

          {/* Header */}
          <section className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            <div className="animate-[fadeIn_0.5s_ease-out]">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Product Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Dashboard
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Manage your product inventory, monitor sales,
                and keep your catalog organized.
              </p>

            </div>

            <Link
              to="/addProduct"
              className="flex w-fit items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <span className="text-lg">+</span>
              Add Product
            </Link>

          </section>

          {/* Stats */}
          <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat, index) => (
              <div
                key={stat.title}
                className="group animate-[fadeUp_0.5s_ease-out] rounded-2xl border border-white/5 bg-slate-900/60 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
                style={{
                  animationDelay: index * 80 + "ms",
                }}
              >

                <div className="mb-5 flex items-center justify-between">

                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {stat.title}
                  </p>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-cyan-300">
                    {stat.icon}
                  </div>

                </div>

                <p className="text-3xl font-bold text-white">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  {stat.description}
                </p>

              </div>
            ))}

          </section>

          {/* Products Section */}
          <section className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">

            {/* Products Header */}
            <div className="flex flex-col gap-4 border-b border-white/5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Products
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredProducts.length} products displayed
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/5 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                />

              </div>

            </div>

            {/* Loading */}
            {loading && (
              <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-2xl bg-slate-800/60"
                  />
                ))}

              </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
              <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-2xl text-slate-600">
                  ◫
                </div>

                <h3 className="text-base font-semibold text-slate-300">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {search
                    ? "Try another product name."
                    : "Your product catalog is empty."}
                </p>

                {!search && (
                  <Link
                    to="/addProduct"
                    className="mt-5 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Create Product
                  </Link>
                )}

              </div>
            )}

            {/* Product Cards */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">

                {filteredProducts.map((product, index) => (
                  <article
                    key={product._id}
                    className="group animate-[fadeUp_0.5s_ease-out] overflow-hidden rounded-2xl border border-white/5 bg-slate-950/70 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/20 hover:shadow-2xl hover:shadow-cyan-950/20"
                    style={{
                      animationDelay: index * 70 + "ms",
                    }}
                  >

                    {/* Product Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-900">

                      <img
                      src={
                      "https://mern-ecommerce-app-1v8u.onrender.com/uploads/" +
                         product.image
                         }
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                 <div className="absolute inset-0 bg-slate-950/40" />

                      {/* Shop */}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md">
                          {product.shopName}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-4 left-4">
                        <p className="text-xl font-bold text-white">
                          {product.currencyCode}{" "}
                          {product.price}
                        </p>
                      </div>

                      {/* Shipping */}
                      {product.freeShipping === "Yes" && (
                        <div className="absolute bottom-4 right-4 rounded-lg bg-emerald-400/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                          Free Shipping
                        </div>
                      )}

                    </div>

                    {/* Product Content */}
                    <div className="p-5">

                      <h3 className="truncate text-base font-semibold text-white">
                        {product.name}
                      </h3>

                      {/* Product Info */}
                      <div className="mt-4 grid grid-cols-3 border-b border-white/5 pb-4">

                        {/* Rating */}
                        <div>
                          <p className="text-[10px] uppercase text-slate-600">
                            Rating
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-300">
                            <span className="text-amber-400">
                              ★
                            </span>{" "}
                            {product.rating || "0.0"}
                          </p>
                        </div>

                        {/* Sales */}
                        <div className="border-l border-white/5 pl-4">
                          <p className="text-[10px] uppercase text-slate-600">
                            Sales
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-300">
                            {Number(
                              product.numberOfSales || 0
                            ).toLocaleString()}
                          </p>
                        </div>

                        {/* Shipping */}
                        <div className="border-l border-white/5 pl-4">
                          <p className="text-[10px] uppercase text-slate-600">
                            Shipping
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-300">
                            {product.freeShipping === "Yes"
                              ? "Free"
                              : "Paid"}
                          </p>
                        </div>

                      </div>

                      {/* Buttons */}
                      <div className="mt-4 flex gap-2">

                        <Link
                          to={`/updateProduct/${product._id}`}
                          className="flex-1 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-center text-xs font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
                        >
                          Edit Product
                        </Link>

                        <button
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                          className="rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-400/10"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>
                ))}

              </div>
            )}

          </section>

        </div>
      </main>
    </div>
  );
}

export default ProductList;