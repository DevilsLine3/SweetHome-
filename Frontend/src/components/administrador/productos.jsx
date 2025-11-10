import { Edit2, CheckCircle2, Circle, Trash2 } from "lucide-react";

export default function ProductList({ products, onEdit, onToggleStatus, onDelete }) { 
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16 px-6 rounded-xl bg-blue-50 dark:bg-slate-800 border-2 border-dashed border-blue-200 dark:border-slate-700">
                <svg
                    className="w-16 h-16 mx-auto mb-4 text-blue-300 dark:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 1 006.586 13H4"
                    />
                </svg>
                <p className="text-slate-500 dark:text-slate-400 text-lg">No hay productos disponibles</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {products.map((product) => {
                const isAvailable = product.status === "active"; 
                const statusColor = isAvailable ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
                const statusText = isAvailable ? "Disponible" : "Agotado";

                return (
                    <div
                        key={product.id}
                        className="group p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                    >
                        <div className="flex gap-5">
                            <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-700 dark:to-slate-800 border border-blue-200 dark:border-slate-600">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name || "Producto"}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                                            {product.name || "Sin nombre"}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                            {product.description || "Sin descripción"}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        {/* Botón de Editar */}
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2.5 rounded-lg bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-slate-600 transition-all duration-300 hover:scale-110"
                                            title="Editar"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        
                                    </div>
                                </div>

                                {/* Detalles (se mantienen) */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        {/* <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                                            Categoría
                                        </p>
                                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium">
                                            {/* 🛑 CAMBIO REALIZADO AQUÍ: Se cambió 'product.category' por 'product.Categoria' 
                                            {product.Categoria || "Otros"} 
                                        </span> */}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                                            Precio
                                        </p>
                                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            ${product.price != null ? product.price.toFixed(2) : "0.00"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                                            Stock
                                        </p>
                                        <p
                                            className={`text-lg font-bold ${
                                                product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                            }`}
                                        >
                                            {product.stock != null ? product.stock : 0} unidades
                                        </p>
                                    </div>
                                    
                                    {/* Estado */}
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                                            Estado
                                        </p>
                                        <div 
                                            // Llama a la función de cambio de estado
                                            onClick={() => onToggleStatus && onToggleStatus(product.id)}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer 
                                                ${isAvailable ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50"}`}
                                        >
                                            {isAvailable ? (
                                                <>
                                                    <CheckCircle2 className={`w-5 h-5 ${statusColor}`} />
                                                    <span className={`text-sm font-semibold ${statusColor}`}>
                                                        {statusText}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Circle className={`w-5 h-5 ${statusColor}`} />
                                                    <span className={`text-sm font-semibold ${statusColor}`}>
                                                        {statusText}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}