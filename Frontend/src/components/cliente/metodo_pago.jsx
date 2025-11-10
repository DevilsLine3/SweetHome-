
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CheckoutSimulator() {
const navigate = useNavigate()
const [cartItems, setCartItems] = useState([
    {
    id: 1,
    name: "Zapatilla Deportiva X-Run",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    quantity: 1,
    },
    {
    id: 2,
    name: "Camiseta Deportiva Performance",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    quantity: 1,
    },
    {
    id: 3,
    name: "Pantalón Deportivo Flex",
    price: 85.0,
    image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=200&h=200&fit=crop",
    quantity: 1,
    },
])

const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
})

const [errors, setErrors] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
})

const [orderCompleted, setOrderCompleted] = useState(false)

const validateFullName = (value) => {
    if (!value.trim()) return "El nombre completo es obligatorio"
    if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres"
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "El nombre solo debe contener letras"
    return ""
}

const validateAddress = (value) => {
    if (!value.trim()) return "La dirección es obligatoria"
    if (value.trim().length < 5) return "La dirección debe tener al menos 5 caracteres"
    return ""
}

const validateCity = (value) => {
    if (!value.trim()) return "La ciudad es obligatoria"
    if (value.trim().length < 2) return "La ciudad debe tener al menos 2 caracteres"
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "La ciudad solo debe contener letras"
    return ""
}

const validatePostalCode = (value) => {
    if (!value.trim()) return "El código postal es obligatorio"
    if (!/^\d{4,6}$/.test(value)) return "El código postal debe tener entre 4 y 6 dígitos"
    return ""
}

const validatePhone = (value) => {
    if (!value.trim()) return "El teléfono es obligatorio"
    const cleanPhone = value.replace(/[\s\-+$$$$]/g, "")
    if (!/^\d{9,15}$/.test(cleanPhone)) return "El teléfono debe tener entre 9 y 15 dígitos"
    return ""
}

const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    let error = ""
    switch (name) {
    case "fullName":
        error = validateFullName(value)
        break
    case "address":
        error = validateAddress(value)
        break
    case "city":
        error = validateCity(value)
        break
    case "postalCode":
        error = validatePostalCode(value)
        break
    case "phone":
        error = validatePhone(value)
        break
    }
    setErrors((prev) => ({ ...prev, [name]: error }))
}

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shippingCost = 8.0
const tax = subtotal * 0.09
const total = subtotal + shippingCost + tax
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

const handleCompleteOrder = () => {
    const newErrors = {
    fullName: validateFullName(formData.fullName),
    address: validateAddress(formData.address),
    city: validateCity(formData.city),
    postalCode: validatePostalCode(formData.postalCode),
    phone: validatePhone(formData.phone),
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some((error) => error !== "")

    if (!hasErrors && cartItems.length > 0) {
    setOrderCompleted(true)
    }
}

if (orderCompleted) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 max-w-lg w-full text-center border border-gray-100 dark:border-gray-800 shadow-2xl">
        <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">¡Pedido Confirmado!</h2>
            <p className="text-gray-500 dark:text-gray-400">Tu orden ha sido recibida exitosamente</p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-6 mb-8 text-left border border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Número de Orden</span>
                <span className="font-bold text-gray-900 dark:text-white">
                #ORD{Math.random().toString().slice(2, 8)}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Destinatario</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formData.fullName}</span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
            <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Total a Pagar</span>
                <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Forma de Pago</span>
                <span className="font-semibold text-gray-900 dark:text-white">Contra Entrega</span>
            </div>
            </div>
        </div>

        <div className="space-y-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                📍 Entrega en:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                {formData.address}, {formData.city}
                </span>
            </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
            Te contactaremos al{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{formData.phone}</span> para confirmar la
            entrega
            </p>
        </div>

        <button
            onClick={() => {
            setOrderCompleted(false)
            setFormData({ fullName: "", address: "", city: "", postalCode: "", phone: "" })
            setCartItems([
                {
                id: 1,
                name: "Zapatilla Deportiva X-Run",
                price: 120.0,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
                quantity: 1,
                },
                {
                id: 2,
                name: "Camiseta Deportiva Performance",
                price: 45.0,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
                quantity: 1,
                },
                {
                id: 3,
                name: "Pantalón Deportivo Flex",
                price: 85.0,
                image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=200&h=200&fit=crop",
                quantity: 1,
                },
            ])
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
            Hacer otra compra
        </button>
        </div>
    </div>
    )
}

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">


    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

        <button
        onClick={() => window.history.back()}
        className="flex items-center justify-center p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
        >
            <span className="ml-2 text-gray-700 dark:text-gray-300">🡠 Volver al Carrito</span>
        </button>


        <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight text-balance">
            Finalizar Compra
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Completa tu pedido con pago contra entrega</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dirección de Envío</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Nombre Completo
                </label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Juan Pérez"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.fullName ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                />
                {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                        />
                    </svg>
                    {errors.fullName}
                    </p>
                )}
                </div>
                <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Dirección</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Calle Principal 123, Apto 4B"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.address ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                />
                {errors.address && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                        />
                    </svg>
                    {errors.address}
                    </p>
                )}
                </div>
                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ciudad</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Madrid"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.city ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                />
                {errors.city && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                        />
                    </svg>
                    {errors.city}
                    </p>
                )}
                </div>
                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Código Postal
                </label>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="28001"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.postalCode ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                />
                {errors.postalCode && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                        />
                    </svg>
                    {errors.postalCode}
                    </p>
                )}
                </div>
            </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Información de Contacto</h2>
            </div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
            <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+34 612 345 678"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.phone ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            />
            {errors.phone && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                    />
                </svg>
                {errors.phone}
                </p>
            )}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Método de Pago</h2>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                </div>
                <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">Pago Contra Entrega</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Paga cuando recibas tu pedido en efectivo</p>
                </div>
            </div>
            </div>
        </div>

        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-lg sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Resumen del Pedido</h2>

            <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Productos en carrito</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
                    </p>
                    </div>
                </div>
                </div>
            </div>

            <div className="space-y-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Envío</span>
                <span className="font-semibold text-gray-900 dark:text-white">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">IVA (9%)</span>
                <span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="pt-6 mb-6">
                <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                </span>
                </div>
            </div>

            <button
                onClick={handleCompleteOrder}
                disabled={cartItems.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
                Completar Compra
            </button>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Recibirás tu pedido y pagarás en la entrega
                </p>
            </div>
            </div>
        </div>
        </div>
    </main>
    </div>
)
}
