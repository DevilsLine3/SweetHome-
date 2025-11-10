
import { useState } from "react"
import ProductList from "./productos.jsx"
import { Package, Plus } from "lucide-react"

export default function ProductManagement() {
const [products, setProducts] = useState([
    {
    id: 1,
    name: "Camiseta de Algodón Orgánico",
    description: "Camiseta cómoda y sostenible hecha de algodón 100% orgánico",
    category: "Ropa",
    price: 19.99,
    stock: 50,
    status: "active",
    image: "/camiseta-algod-n-blanca.jpg",
    },
    {
    id: 2,
    name: "Auriculares Inalámbricos Pro",
    description: "Auriculares premium con cancelación de ruido activa y batería de 30 horas",
    category: "Electrónica",
    price: 129.99,
    stock: 0,
    status: "active",
    image: "/auriculares-negros-inal-mbricos.jpg",
    },
    {
    id: 3,
    name: "Taza de Cerámica Artesanal",
    description: "Taza hecha a mano con diseño minimalista y acabado brillante",
    category: "Hogar",
    price: 24.5,
    stock: 120,
    status: "active",
    image: "/taza-cer-mica-blanca.jpg",
    },
])

const [showForm, setShowForm] = useState(false)
const [editingId, setEditingId] = useState(null)
const [search, setSearch] = useState("")
const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Electrónica",
    price: "",
    stock: "",
    status: "active",
})

const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

const handleEdit = (product) => {
    setFormData(product)
    setEditingId(product.id)
    setShowForm(true)
}

const handleSave = (e) => {
    e.preventDefault()

    if (editingId) {
    setProducts(products.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p)))
    } else {
    const newProduct = {
        ...formData,
        id: Date.now(),
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
    }
    setProducts([...products, newProduct])
    }

    setShowForm(false)
    setEditingId(null)
    resetForm()
}

const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
}

const handleToggleStatus = (id) => {
    setProducts(
    products.map((p) => (p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p)),
    )
}

const resetForm = () => {
    setFormData({
    name: "",
    description: "",
    category: "Electrónica",
    price: "",
    stock: "",
    status: "active",
    })
}

const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    resetForm()
}

return (
    <div className="dark:bg-slate-900 min-h-screen">
    <div className="max-w-7xl mx-auto px-6 py-10 dark:text-white dark:bg-slate-900 dark:min-h-screen ">
    {/* Header con búsqueda y botón crear */}
    <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

            <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Productos</h1>
            <p className="text-slate-600 dark:text-slate-400">Gestiona todos tus productos</p>
            </div>
            
        </div>
        <button
            onClick={() => {
            setShowForm(true)
            setEditingId(null)
            resetForm()
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 active:scale-95"
        >
            <Plus className="w-5 h-5" />
            Crear Producto
        </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative">
        <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
        />
        <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
        </div>
    </div>

    {/* Formulario */}
    {showForm && (
        <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-blue-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
            {editingId ? "Editar Producto" : "Nuevo Producto"}
        </h3>

        <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Nombre del Producto
                </span>
                <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Camiseta Premium"
                required
                className="px-4 py-2.5 rounded-lg border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
            </label>

            <label className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Categoría</span>
                <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2.5 rounded-lg border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                >
                <option>Electrónica</option>
                <option>Ropa</option>
                <option>Hogar</option>
                <option>Deportes</option>
                </select>
            </label>
            </div>

            <label className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Descripción</span>
            <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe las características del producto..."
                rows={3}
                className="px-4 py-2.5 rounded-lg border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none"
            />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <label className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Precio</span>
                <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
                className="px-4 py-2.5 rounded-lg border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
            </label>

            <label className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Stock</span>
                <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                required
                className="px-4 py-2.5 rounded-lg border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
            </label>

            <label className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Estado</span>
                <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="px-4 py-2.5 rounded-lg border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                </select>
            </label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
            <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300"
            >
                Cancelar
            </button>
            <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 active:scale-95"
            >
                {editingId ? "Actualizar" : "Crear"}
            </button>
            </div>
        </form>
        </div>
    )}

    {/* Lista de productos */}
    <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
    />
    </div>
    </div>
)
}
