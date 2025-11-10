"use client"

import { Edit, Plus, Search, Trash2 } from "lucide-react"

export default function UserList({ users, searchTerm, onSearchChange, onAddUser, onEditUser, onDeleteUser }) {
return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
    <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Usuarios</h1>
            <p className="text-slate-600 dark:text-slate-400">Gestiona todos tus usuarios del sistema</p>
        </div>
        <button
            onClick={onAddUser}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full md:w-auto"
        >
            <Plus size={20} />
            Nuevo Usuario
        </button>
        </div>

        <div className="mb-8">
        <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
        </div>
        </div>

        {/* Users Grid */}
        {users && users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
            <div
                key={user._id} 
                className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700"
            >
                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                {/* Avatar and User Info */}
                <div className="flex items-start gap-4 mb-4">
                    <img
                    src={user.Foto || "/placeholder.svg?height=48&width=48&query=user+avatar"}
                    alt={user.Nombre}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border-2 border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{user.Nombre}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-1 mt-1">{user.Email}</p>
                    </div>
                </div>

                {/* Role Badge */}
                <div className="mb-4">
                    <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        user.Rol === "Admin"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        : user.Rol === "Cliente"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                    >
                    {user.Rol === "Admin" && "Admin"}
                    {user.Rol=== "Cliente" && "Cliente"}
      
                    </span>
                </div>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <button
                    onClick={() => onEditUser(user)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-medium transition-all text-sm"
                    >
                    <Edit size={16} />
                    Editar
                    </button>
                    {/* <button
                    onClick={() => onDeleteUser(user._id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-medium transition-all text-sm"
                    >
                    <Trash2 size={16} />
                    Eliminar
                    </button> */}
                </div>
                </div>
            </div>
            ))}
        </div>
        ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
            <div className="mb-4 text-6xl">👥</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No hay usuarios</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                {searchTerm
                ? "No se encontraron usuarios que coincidan con tu búsqueda."
                : "Comienza creando tu primer usuario."}
            </p>
            {!searchTerm && (
                <button
                onClick={onAddUser}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                <Plus size={20} />
                Crear Usuario
                </button>
            )}
            </div>
        </div>
        )}
    </div>
    </div>
)
}
