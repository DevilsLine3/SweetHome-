    import { useState } from "react"
    import SalesTransactions from "./ventas"
    import PurchaseTransactions from "./compras"

    export default function TransactionsPage() {
    const [activeTab, setActiveTab] = useState("sales")
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="min-h-screen font-display bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex min-w-72 flex-col gap-2">
                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">
                    Mis Transacciones
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-400">
                    Gestiona tus productos vendidos y comprados.
                </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300 dark:border-gray-700">
                <div className="flex gap-8">
                <button
                    onClick={() => setActiveTab("sales")}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-1 transition-all
                    ${
                        activeTab === "sales"
                        ? "border-b-primary text-primary font-bold"
                        : "border-b-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                >
                    <p className="text-sm font-semibold">Productos Vendidos</p>
                </button>

                <button
                    onClick={() => setActiveTab("purchases")}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-1 transition-all
                    ${
                        activeTab === "purchases"
                        ? "border-b-primary text-primary font-bold"
                        : "border-b-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                >
                    <p className="text-sm font-semibold">Productos Comprados</p>
                </button>
                </div>
            </div>



            {/* Toolbar */}
            <div className="flex justify-between items-center gap-4 py-6">
                <div className="relative flex-1 max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                    </svg>
                </div>

                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl shadow-sm transition-all
                    bg-white dark:bg-gray-800
                    border border-gray-300 dark:border-gray-700
                    text-gray-900 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                </div>

                <div className="flex gap-2">
                <button
                    className="p-3 rounded-lg border transition-colors
                    border-gray-300 dark:border-gray-700
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-200 dark:hover:bg-gray-800"
                    title="Filtrar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                    </svg>
                </button>

                <button
                    className="p-3 rounded-lg border transition-colors
                    border-gray-300 dark:border-gray-700
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-200 dark:hover:bg-gray-800"
                    title="Ordenar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                    </svg>
                </button>
                </div>
            </div>

            {/* Contenedor de datos */}


                          {/* ✅ Render dinámico de contenidos */}
      <div className="mt-4">
        {activeTab === "sales" && <SalesTransactions />}
        {activeTab === "purchases" && <PurchaseTransactions />}
      </div>

            </div>
        </main>
        </div>
    )
    }
