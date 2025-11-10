

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function ProductForm() {
const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "Electrónica",
    status: "Nuevo",
    stock: "",
    price: "",
    image: null,
    imagePreview: null,
})

const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
    ...prev,
    [name]: value,
    }))
}

const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
        setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
        }))
    }
    reader.readAsDataURL(file)
    }
}

const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
}

const handleGoBack = () => {
    console.log("Volver atrás")
    window.history.back()
}

return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-200">
    {/* Top App Bar */}
    <div className="sticky top-0 z-10 flex h-16 items-center bg-white dark:bg-slate-800 px-4 justify-between border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <button
        onClick={handleGoBack}
        className="flex size-10 shrink-0 items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        aria-label="Volver atrás"
        >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Publicar Producto</h2>
        <div className="w-10"></div>
    </div>

    {/* Main Content */}
    <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Image Uploader */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-8 shadow-sm hover:shadow-md transition-shadow">
            {formData.imagePreview ? (
            <div className="flex flex-col items-center gap-4">
                <img
                src={formData.imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full max-w-xs h-48 object-cover rounded-lg"
                />
                <label className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
                <span className="truncate">Cambiar Imagen</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    aria-label="Cambiar imagen"
                />
                </label>
            </div>
            ) : (
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg
                    className="w-8 h-8 text-blue-600 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                </div>
                <div className="text-center">
                <p className="text-lg font-semibold mb-1">Añadir Imagen del Producto</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sube una imagen clara y atractiva de tu producto
                </p>
                </div>
                <label className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
                <span className="truncate">Seleccionar Imagen</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    aria-label="Seleccionar imagen"
                />
                </label>
            </div>
            )}
        </div>

        {/* Product Name */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <label className="flex flex-col w-full">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 pb-2 mb-2">Nombre del Producto</p>
            <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Ej: Camiseta de algodón premium"
                maxLength="100"
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 h-12 placeholder:text-slate-500 dark:placeholder:text-slate-400 px-3 py-2 text-base font-normal"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {formData.productName.length}/100 caracteres
            </p>
            </label>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <label className="flex flex-col w-full">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 pb-2 mb-2">Descripción</p>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe los detalles, características y condición del producto..."
                maxLength="500"
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 min-h-32 placeholder:text-slate-500 dark:placeholder:text-slate-400 px-3 py-2 text-base font-normal"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {formData.description.length}/500 caracteres
            </p>
            </label>
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <label className="flex flex-col min-w-40 flex-1 relative">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 pb-2 mb-2">Categoría</p>
                <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="appearance-none w-full rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 h-12 px-3 py-2 text-base font-normal pr-10"
                >
                <option>Electrónica</option>
                <option>Ropa</option>
                <option>Hogar</option>
                <option>Jardín</option>
                <option>Juguetes</option>
                <option>Deportes</option>
                <option>Libros</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 translate-y-1 w-5 h-5 text-slate-500 pointer-events-none" />
            </label>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <label className="flex flex-col min-w-40 flex-1 relative">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 pb-2 mb-2">Estado</p>
                <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="appearance-none w-full rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 h-12 px-3 py-2 text-base font-normal pr-10"
                >
                <option>Nuevo</option>
                <option>Usado - Como nuevo</option>
                <option>Usado - Buen estado</option>
                <option>Usado - Aceptable</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 translate-y-1 w-5 h-5 text-slate-500 pointer-events-none" />
            </label>
            </div>
        </div>

        {/* Stock & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 pb-2 mb-2">Stock</p>
                <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 h-12 placeholder:text-slate-500 dark:placeholder:text-slate-400 px-3 py-2 text-base font-normal"
                />
            </label>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 pb-2 mb-2">Precio ($)</p>
                <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 h-12 placeholder:text-slate-500 dark:placeholder:text-slate-400 px-3 py-2 text-base font-normal"
                />
            </label>
            </div>
        </div>
        </form>
    </main>

    {/* Bottom Action Bar */}
    <div className="sticky bottom-0 bg-white dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="max-w-2xl mx-auto w-full">
        <button
            onClick={handleSubmit}
            className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-bold transition-all shadow-md hover:shadow-lg"
        >
            <span className="truncate">Publicar Producto</span>
        </button>
        </div>
    </div>
    </div>
)
}
