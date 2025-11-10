
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ModalInicio } from "../login/inicio"

export default function CartPage() {
const navigate = useNavigate()
const [cartItems, setCartItems] = useState([
    {
    id: 1,
    name: "Classic Tee",
    color: "White",
    size: "M",
    price: 25.0,
    quantity: 1,
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCFheKV4yg5H_9tnwpObggJCPWdipdx-NHYuKviB9vWMkM5PnO1sVneX8x3U8imV8dOutUAu7-clb8DoE5Ws5QWvptTiqSghFpBw7VMYnKfMGz8FoOFjbBFUzNVl2EEasE8Y2Ikq3oaWzmOeBHvtJgOVXuZ6PHbhEWmnsCHBx7IlMeVWRlsKotTNyA9gJeQ3vEd30r4ZyamBFelqnIl_XMGPN6I8UsfrFLyZLuaP8KMiTMEuBrv6D6l-UaFQyzJwHjvGzeo6lpqPs3y",
    },
    {
    id: 2,
    name: "Slim-Fit Jeans",
    color: "Dark Wash",
    size: "32/30",
    price: 75.0,
    quantity: 1,
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCA11hHciz_33Do4rfNFrEG1PVE9rbR7myG3CwBuvn72hfgo7q7gvJ7sV00ofFEQCmfHdf9rLfaT6wuG50fzNkeEGwksmEmIvizmaSH7a_V64d4EIWFtMw43KNRZuh33j-zFKuQz1ED9KxGLFrvS_KMv6LJxmq_KAUuIMuzr9a8-h1HBTti_TMdJ9hnn-o6TfJeiKeYhfpAihb5cUM9j1fcu0-gA8WFX7xhRt4FlYnQemmAAIWjx-slPsyokzcQ2rTHptqQ99BSHkR7",
    },
])

const [promoCode, setPromoCode] = useState("")
const [isPromoOpen, setIsPromoOpen] = useState(false)

const shipping = 5.0
const taxRate = 0.084

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const taxes = subtotal * taxRate
const total = subtotal + shipping + taxes

const updateQuantity = (id, delta) => {
    setCartItems((items) =>
    items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)),
    )
}

const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
}

const clearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
    setCartItems([])
    }
}

const applyPromoCode = () => {
    // Implementar lógica de código promocional
    alert(`Promo code "${promoCode}" applied!`)
}

const [openModal, setOpenModal] = useState(false);

return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0e1a] dark:to-[#101622] text-gray-900 dark:text-gray-100">
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 shadow-sm">
        <button
        onClick={() => window.history.back()}
        className="flex items-center justify-center p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
        >
        <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-gray-300">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Shopping Cart
        </h1>
        <button
        onClick={clearCart}
        className="flex items-center justify-center p-2 -mr-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
        >
        <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400">
            delete
        </span>
        </button>
    </header>

    <main className="flex-grow px-6 py-8">
        {cartItems.length === 0 ? (
        <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 mb-6">
            <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-600">shopping_cart</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">Your cart is empty</p>
            <button
            onClick={() => window.history.back()}
            className="mt-6 px-8 py-3 bg-[#256af4] hover:bg-[#1e56d4] text-white font-semibold rounded-xl transition-colors"
            >
            Start Shopping
            </button>
        </div>
        ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Products */}
            <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cart Items ({cartItems.length})</h2>
            </div>

            {/* Product List */}
            <div className="space-y-4">
                {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="flex gap-5 bg-white dark:bg-gray-800/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700/50"
                >
                    <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-28 shrink-0 ring-1 ring-gray-200 dark:ring-gray-700"
                    style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <div className="flex flex-1 flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                        <p className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                            {item.name}
                        </p>
                        <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400 mt-1">
                            {item.color} • Size {item.size}
                        </p>
                        </div>
                        <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-lg transition-all duration-200"
                        >
                        <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3">
                        <p className="text-xl font-bold leading-normal text-[#256af4] dark:text-[#4d8fff]">
                        ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3">
                        <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-lg font-bold transition-all duration-200 hover:scale-105"
                        >
                            -
                        </button>
                        <span className="text-lg font-semibold w-8 text-center text-gray-900 dark:text-white">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-lg font-bold transition-all duration-200 hover:scale-105"
                        >
                            +
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Continue Shopping Button */}
            <button
                onClick={() => window.history.back()}
                className="w-full h-12 flex items-center justify-center gap-2 text-[#256af4] dark:text-[#4d8fff] font-semibold hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                Continue Shopping
            </button>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                {/* Promo Code */}
                <div className="bg-white dark:bg-gray-800/60 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700/50">
                <button
                    onClick={() => setIsPromoOpen(!isPromoOpen)}
                    className="w-full flex cursor-pointer items-center justify-between gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                >
                    <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#256af4] dark:text-[#4d8fff]">local_offer</span>
                    <p className="text-base font-semibold leading-normal text-gray-900 dark:text-white">Promo Code</p>
                    </div>
                    <span
                    className={`material-symbols-outlined text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isPromoOpen ? "rotate-180" : ""}`}
                    >
                    expand_more
                    </span>
                </button>
                {isPromoOpen && (
                    <div className="px-5 pb-5">
                    <div className="flex gap-2">
                        <input
                        className="flex-grow rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-[#256af4] focus:border-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-2.5 transition-all"
                        placeholder="Enter code"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button
                        onClick={applyPromoCode}
                        className="px-5 py-2.5 bg-[#256af4] hover:bg-[#1e56d4] text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                        >
                        Apply
                        </button>
                    </div>
                    </div>
                )}
                </div>

                {/* Order Summary */}
                <div className="bg-white dark:bg-gray-800/60 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-5">
                    Order Summary
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-base">
                    <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                    <p className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center text-base">
                    <p className="text-gray-600 dark:text-gray-400">Shipping</p>
                    <p className="font-semibold text-gray-900 dark:text-white">${shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center text-base">
                    <p className="text-gray-600 dark:text-gray-400">Taxes (8.4%)</p>
                    <p className="font-semibold text-gray-900 dark:text-white">${taxes.toFixed(2)}</p>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4"></div>
                    <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Total</p>
                    <p className="text-2xl font-bold text-[#256af4] dark:text-[#4d8fff]">${total.toFixed(2)}</p>
                    </div>
                </div>

                {/* Checkout Button */}
<button
  onClick={() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setOpenModal(true); // ✅ abrir modal
      return;             // ✅ detener navegación
    }

    navigate("/metodo-pago"); // ✅ navegar si hay token
  }}
  className="w-full mt-6 h-14 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#256af4] to-[#1e56d4] hover:from-[#1e56d4] hover:to-[#1648b8] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[#256af4]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#256af4]/40"
>
  Terminar Compra
  <span className="material-symbols-outlined">arrow_forward</span>
</button>

<ModalInicio 
  open={openModal} 
  onOpenChange={setOpenModal}
  onLoginSuccess={(role) => {
    // ✅ Guardar login y cerrar modal
    setOpenModal(false);

    // ✅ Si el usuario inicia sesión como cliente,
    // se mantiene en la página y puede continuar la compra
    if (role === "cliente") {
      navigate("/metodo-pago");
    }

    // ✅ Si es admin, redirigir al inicio
    if (role === "administrador") {
      navigate("/");
    }
  }}
/>



                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-lg">lock</span>
                    <span>Secure Checkout</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        )}
    </main>

    {/* Material Symbols Font */}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    </div>
)
}
