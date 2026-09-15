import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-cyan-500/10 text-cyan-300"
        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
    }`;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
      
      {/* Brand */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
            P
          </div>

          <div>
            <h1 className="text-base font-bold text-white">
              ProductHub
            </h1>

            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Workspace
            </p>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-7">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-600">
          Workspace
        </p>

        <nav className="space-y-1">

          {/* Dashboard */}
          <NavLink to="/" className={linkClass}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-lg">
              ⌂
            </span>

            <span>Dashboard</span>
          </NavLink>

          {/* Products */}
          <NavLink to="/" className={linkClass}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-lg">
              ◫
            </span>

            <span>Products</span>
          </NavLink>

          {/* Add Product */}
          <NavLink to="/addProduct" className={linkClass}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-lg">
              +
            </span>

            <span>Add Product</span>
          </NavLink>

        </nav>

        {/* System */}
        <p className="mb-3 mt-10 px-3 text-xs font-semibold uppercase tracking-widest text-slate-600">
          System
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-300">
                System Online
              </p>

              <p className="mt-1 text-[10px] text-slate-500">
                All services operational
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* User */}
      <div className="border-t border-slate-800 p-4">

        <div className="flex items-center gap-3 rounded-xl px-2 py-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-300">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-300">
              Admin
            </p>

            <p className="truncate text-[10px] text-slate-500">
              Product Manager
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Navbar;