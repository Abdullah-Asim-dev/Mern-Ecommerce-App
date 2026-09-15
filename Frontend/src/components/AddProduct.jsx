import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [numberOfSales, setNumberOfSales] = useState("");
  const [rating, setRating] = useState("");
  const [freeShipping, setFreeShipping] = useState("Yes");
  const [shopName, setShopName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Image Selection
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  // Add Product
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      Swal.fire({
        title: "Image Required",
        text: "Please select a product image.",
        icon: "warning",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#06b6d4",
      });

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("currencyCode", currencyCode);
      formData.append("numberOfSales", numberOfSales);
      formData.append("rating", rating);
      formData.append("freeShipping", freeShipping);
      formData.append("shopName", shopName);
      formData.append("image", image);

      const response = await fetch(
        "http://localhost:3000/addProduct",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        await Swal.fire({
          title: "Product Added",
          text: "Your product has been added successfully.",
          icon: "success",
          background: "#0f172a",
          color: "#ffffff",
          confirmButtonColor: "#06b6d4",
        });

        navigate("/");
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          text: "Product could not be added.",
          icon: "error",
          background: "#0f172a",
          color: "#ffffff",
          confirmButtonColor: "#06b6d4",
        });
      }
    } catch (error) {
      console.log("Error adding product:", error);

      Swal.fire({
        title: "Server Error",
        text: "Unable to connect to the server.",
        icon: "error",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#06b6d4",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400";

  const labelClass =
    "mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500";

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <main className="relative overflow-hidden px-5 py-8 sm:px-8 lg:px-10">

        {/* Background Effects */}
        <div className="pointer-events-none absolute left-1/3 top-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"></div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl">

          {/* Header */}
          <section className="mb-8">

            <div className="mb-3 flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                Product Management
              </span>

            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Add Product
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Create a new product and add it to your inventory
                  catalog.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-fit rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-400 transition duration-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
              >
                Back to Products
              </button>

            </div>

          </section>

          {/* Main Card */}
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            {/* Card Header */}
            <div className="border-b border-slate-800 px-6 py-5 sm:px-8">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xl text-cyan-300">
                  +
                </div>

                <div>

                  <h2 className="text-base font-semibold text-white">
                    Product Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Enter the details for your new product.
                  </p>

                </div>

              </div>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">

                {/* LEFT COLUMN */}
                <div className="space-y-6">

                  {/* Product Name */}
                  <div>

                    <label className={labelClass}>
                      Product Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      className={inputClass}
                      required
                    />

                  </div>

                  {/* Price and Currency */}
                  <div className="grid gap-4 sm:grid-cols-2">

                    <div>

                      <label className={labelClass}>
                        Price
                      </label>

                      <input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(event) =>
                          setPrice(event.target.value)
                        }
                        className={inputClass}
                        required
                      />

                    </div>

                    <div>

                      <label className={labelClass}>
                        Currency
                      </label>

                      <input
                        type="text"
                        placeholder="USD"
                        value={currencyCode}
                        onChange={(event) =>
                          setCurrencyCode(event.target.value)
                        }
                        className={inputClass}
                        required
                      />

                    </div>

                  </div>

                  {/* Sales and Rating */}
                  <div className="grid gap-4 sm:grid-cols-2">

                    <div>

                      <label className={labelClass}>
                        Number of Sales
                      </label>

                      <input
                        type="number"
                        placeholder="0"
                        value={numberOfSales}
                        onChange={(event) =>
                          setNumberOfSales(event.target.value)
                        }
                        className={inputClass}
                      />

                    </div>

                    <div>

                      <label className={labelClass}>
                        Rating
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        placeholder="0.0 - 5.0"
                        value={rating}
                        onChange={(event) =>
                          setRating(event.target.value)
                        }
                        className={inputClass}
                      />

                    </div>

                  </div>

                  {/* Shop Name */}
                  <div>

                    <label className={labelClass}>
                      Shop Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter shop name"
                      value={shopName}
                      onChange={(event) =>
                        setShopName(event.target.value)
                      }
                      className={inputClass}
                      required
                    />

                  </div>

                  {/* Shipping */}
                  <div>

                    <label className={labelClass}>
                      Shipping
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() => setFreeShipping("Yes")}
                        className={
                          freeShipping === "Yes"
                            ? "rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-300"
                            : "rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-500 hover:border-slate-700 hover:text-slate-300"
                        }
                      >
                        Free Shipping
                      </button>

                      <button
                        type="button"
                        onClick={() => setFreeShipping("No")}
                        className={
                          freeShipping === "No"
                            ? "rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-300"
                            : "rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-500 hover:border-slate-700 hover:text-slate-300"
                        }
                      >
                        Paid Shipping
                      </button>

                    </div>

                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div>

                  <label className={labelClass}>
                    Product Image
                  </label>

                  {/* Upload Area */}
                  <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-6 text-center transition duration-300 hover:border-cyan-400 hover:bg-slate-900">

                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-2xl text-cyan-300">
                      ↑
                    </div>

                    <h3 className="text-sm font-semibold text-slate-300">
                      Upload Product Image
                    </h3>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-slate-600">
                      Choose a high-quality image for your
                      product. JPG, PNG or WebP recommended.
                    </p>

                    {/* File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-5 block w-full max-w-xs cursor-pointer rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-400"
                    />

                    {/* Selected Image */}
                    {image && (
                      <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">

                        <p className="max-w-xs truncate text-xs font-medium text-cyan-300">
                          {image.name}
                        </p>

                      </div>
                    )}

                  </div>

                  {/* Image Guidelines */}
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs text-slate-500">
                        i
                      </div>

                      <div>

                        <p className="text-xs font-medium text-slate-400">
                          Image Guidelines
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-600">
                          Use a clear product image with good
                          lighting and a suitable aspect ratio.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-800 bg-slate-950 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-medium text-slate-400 transition duration-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Adding Product..." : "Add Product"}
                </button>

              </div>

            </form>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AddProduct;