import { useState, useEffect } from "react"
import {
ShoppingCart,
Heart,
Share2,
Star,
MessageCircle,
Minus,
Plus,
} from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { useTheme } from "../thema.jsx"
import axios from "axios"

// Mapeo de IDs de categorías a nombres legibles (igual que en productos.jsx)
const categoryMap = {
"69003e7f7839b0d071d1ca8e": "Electrónica",
"69003e7f7839b0d071d1ca8f": "Accesorios",
}

export default function ProductDetail() {
const { id } = useParams()
const navigate = useNavigate()
const { isDark } = useTheme()

const [product, setProduct] = useState(null)
const [selectedImage, setSelectedImage] = useState(0)
const [quantity, setQuantity] = useState(1)
const [isFavorite, setIsFavorite] = useState(false)

useEffect(() => {
    const fetchProduct = async () => {
    try {
        const response = await axios.get(`http://localhost:5100/api/productos/${id}`)
        const p = response.data
        const normalizedProduct = {
        id: p._id,
        name: p.Nombre,
        description: p.Descripcion,
        price: p.Precio,
        image: p.Imagen,
        category: categoryMap[p.Categoria] || "Otros",
        stock: p.Stock,
        status: p.Estado,
        }
        setProduct(normalizedProduct)
    } catch (error) {
        console.error("Error cargando producto:", error)
    }
    }
    fetchProduct()
}, [id])

useEffect(() => {
    setSelectedImage(0)
    setQuantity(1)
    setIsFavorite(false)
}, [product])

if (!product) {
    return (
    <h1 className="text-red-600 dark:text-red-400 font-bold text-xl">
        Producto no encontrado
    </h1>
    )
}

const handleAddToCart = () => {
    alert(`Añadiste ${quantity} ${product.name} al carrito 🛒`)
}

const handleContactSeller = (method) => {
    alert(`Abriendo contacto por ${method}...`)
}

const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10))
const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

return (
    <div className={`${isDark ? "bg-slate-900" : "bg-white"} w-full min-h-screen transition-colors flex flex-col`}>
    <div className={`w-full container mx-auto px-4 py-8 max-w-7xl  transition-colors flex-1 ${isDark ? "bg-slate-900" : "bg-white"}`}>

        {/* Botón volver */}
        <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        >
        ← Volver a productos
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería */}
        <div className="space-y-4">
            <div className="overflow-hidden rounded-xl shadow bg-white dark:bg-slate-800 relative">
            <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-[450px] object-cover"
            />
            <button
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                onClick={() => setIsFavorite(!isFavorite)}
            >
                <Heart className="h-5 w-5" />
            </button>
            </div>

            {product.images?.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, i) => (
                <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border-2 rounded-lg overflow-hidden transition-colors ${selectedImage === i ? "border-blue-500" : "border-transparent hover:border-gray-300 dark:hover:border-gray-500"}`}
                >
                    <img
                    src={img}
                    alt={`Vista ${i + 1}`}
                    className="w-full h-24 object-cover"
                    />
                </button>
                ))}
            </div>
            )}
        </div>

        {/* Información producto */}
        <div className="space-y-6 text-gray-900 dark:text-gray-100">
            <div>
            <div className="flex items-start justify-between mb-3">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Share2 className="h-5 w-5" />
                </button>
            </div>

<div>

{/* Stock solo */}
<div className="flex items-center gap-2 mb-3">
<span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
    {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
</span>
</div>

</div>

            </div>

            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            €{product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {product.description}
            </p>

            {/* Cantidad */}
            <div className="flex items-center gap-3">
            <span className="font-medium">Cantidad:</span>
            <div className="flex items-center border rounded-lg dark:border-gray-600">
                <button onClick={decrementQuantity} disabled={quantity <= 1} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button onClick={incrementQuantity} disabled={quantity >= 10} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <Plus className="h-4 w-4" />
                </button>
            </div>
            </div>

            {/* Botón añadir al carrito */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
                disabled={product.stock === 0}
            >
                <ShoppingCart className="h-5 w-5" /> {product.stock === 0 ? "Agotado" : "Añadir al carrito"}
            </button>
            </div>

            {/* Botón contactar vendedor */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
                onClick={() => handleContactSeller("mensaje")}
                className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold py-3 rounded-lg transition-colors"
            >
                <MessageCircle className="h-5 w-5" /> Contactar
            </button>
            </div>
        </div>
        </div>
    </div>
    </div>
)
}
