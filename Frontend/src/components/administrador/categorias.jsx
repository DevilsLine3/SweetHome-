
import { Edit, Plus, Search } from "lucide-react"

export default function CategoryList({ categories = [], searchTerm, onSearchChange, onEdit, onToggleStatus, onAdd }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Categorías</h1>
            <p className="text-slate-600 dark:text-slate-400">Gestiona todas tus categorías de productos</p>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full md:w-auto"
          >
            <Plus size={20} />
            Nueva Categoría
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700"
              >
                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category Name and Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex-grow line-clamp-2">
                      {category.name}
                    </h3>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        category.status
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {category.status ? "Activa" : "Inactiva"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {category.description}
                  </p>

                  {/* Status Toggle and Actions */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                    {/* Toggle Status Button */}
                    <button
                      onClick={() => onToggleStatus(category.id)}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        category.status
                          ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
                          : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40"
                      }`}
                    >
                      {category.status ? "Desactivar" : "Activar"}
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(category)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-medium transition-all text-sm"
                    >
                      <Edit size={16} />
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
              <div className="mb-4 text-6xl">📦</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No hay categorías</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {searchTerm
                  ? "No se encontraron categorías que coincidan con tu búsqueda."
                  : "Comienza creando tu primera categoría."}
              </p>
              {!searchTerm && (
                <button
                  onClick={onAdd}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Plus size={20} />
                  Crear Categoría
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
