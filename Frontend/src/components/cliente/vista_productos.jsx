"use client";

import { useState } from "react";
import { ShoppingCart, Search, X, ChevronDown, Filter ,ArrowLeft  } from "lucide-react";


import Productos from "../publico/productos.jsx";

const categories = ["Electrodomésticos", "Ropa", "Juguetes", "Tecnología", "Hogar"];

const FILTER_OPTIONS = [
  { id: "category", label: "Categoría", options: categories },
];

export default function ProductExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [expandedFilters, setExpandedFilters] = useState([]);

  const removeFilter = (filter) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const toggleFilterGroup = (filterId) => {
    setExpandedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleOption = (option) => {
    setActiveFilters((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#e7eef8] dark:bg-[#0f172a]">

      {/* ===== HEADER ===== */}
<header className="sticky top-0 z-20 bg-[#e7eef8] dark:bg-[#0f172a] border-b border-blue-200 dark:border-stone-800 px-8 py-6 flex items-center justify-between shadow-sm">

  {/* Botón Back */}
  <button
    onClick={() => window.history.back()}
    className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-stone-800 transition"
  >
    <ArrowLeft className="w-6 h-6 text-stone-800 dark:text-stone-200" />
  </button>

  {/* Título */}
  <h1 className="text-4xl font-bold dark:text-white text-center flex-1 tracking-wide">
    Productos
  </h1>

  {/* Espaciador para mantener centrado el título */}
  <div className="w-8"></div>
</header>




      <div className="flex flex-1 overflow-hidden">

        {/* ===== SIDEBAR MEJORADA ===== */}
        <aside className="w-64 bg-[#dce7fb] dark:bg-[#1a2337] border-r border-blue-200 dark:border-stone-800 
p-6 overflow-y-auto shadow-lg rounded-r-xl sticky top-[72px] h-[calc(100vh-72px)]">


          
          <div className="flex items-center gap-2 mb-4 text-lg font-bold dark:text-white">
            <Filter className="w-5 h-5" /> Filtros
          </div>

          {/* Filtros activos */}
          {activeFilters.length > 0 && (
            <div className="mb-6">
              <p className="text-xs uppercase text-stone-500 mb-2 font-semibold">Activos</p>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((f) => (
                  <span
                    key={f}
                    onClick={() => removeFilter(f)}
                    className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded-full shadow hover:bg-blue-700 cursor-pointer"
                  >
                    {f} <X className="w-3 h-3" />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Grupos colapsables */}
          {FILTER_OPTIONS.map((group) => (
            <div key={group.id} className="mb-5">
              <button
                onClick={() => toggleFilterGroup(group.id)}
                className="flex justify-between w-full text-sm font-semibold dark:text-white cursor-pointer py-2"
              >
                {group.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedFilters.includes(group.id) ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all overflow-hidden ${
                  expandedFilters.includes(group.id)
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-2 space-y-2 pt-2">
                  {group.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm dark:text-stone-200">
                      <input
                        type="checkbox"
                        checked={activeFilters.includes(opt)}
                        onChange={() => toggleOption(opt)}
                        className="accent-blue-600"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* PRODUCTOS */}
        <main className="flex-1 overflow-y-auto p-6">
          <Productos search={searchQuery} filter={activeFilters} />
        </main>
      </div>
    </div>
  );
}
