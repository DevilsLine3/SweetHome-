
import { useState } from "react"
import { X, Minus, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CartModal({ isOpen, onClose }) {
const [cartItems, setCartItems] = useState([
    {
    id: 1,
    name: "Classic T-Shirt",
    details: "Size: M, Color: Black",
    price: 24.0,
    quantity: 1,
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ46dNpBQQWuje0Ax5F1Q78cYJLXdQbacQeg2fxcC5q4N4SofWC5PkebQa_vASB_rZ07Ds2SxYHbN7LUGmDPiJBSKeCSGADnBOoEcQWMaaXk8_qliAsIfj3Cc2E0MBdxWwMBp6pu0DviF4wXmaob8my6Q46rNsmZgLem4wGMTlLUqGwz1ukWOYwjG5l4mUAvrSwfe4LyQKTpMKDY5eL7a2sRNhNV4c1yEwiT51haWWtfivfGytxvzfU8hMKLvzoHbmAX7l48EGTjlC",
    },
    {
    id: 2,
    name: "Leather Sneakers",
    details: "Size: 10, Color: White",
    price: 120.0,
    quantity: 1,
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbz9DV5m7LUyUSHS1Bvp3E3c6coF0lavqvm8jmFP5pz47ntIhh3bw-J4pkDS5sRzU02tBa80vagqWr295Ur_ZZ8ya93zl68AGP9PVr8GoCOOgkhpRLsePFYPdnEc8DeNX3G0947PU0BoEmpHgQCCqY5hMCoCHp6alx2IfyMq64NF0hj895D4BtfnzmfmVFrUy1R0hl4vuvHZrh58nEtiJl6MNJFbByMdEUSCp1Ka_-LfaH0io7oqm6NbwALfbR9Hitzrcz3X9ClQH1",
    },
    {
    id: 3,
    name: "Denim Jeans",
    details: "Size: 32/32, Color: Blue",
    price: 89.0,
    quantity: 1,
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAM1svW3gvhgBwhMnzK5hsCl2eJiurYmxt5haUf9ogjPuxSwkJptgmdLxMtISIpvnKuWwS7vJgxxKZU4yodCdAejsvP-euwMTjykupI9KQLMYwPHgnpjKf6TqmEaNGr0F2dpXwIgzy7r-F6trgBbgdLnZBY-5owCp3UuwAl42djtY-g3IJ8aVyGKO37M70ZtdFlN8xXa11KU18c4JjhNRzsIOfcCs9fClf2cvIF9qL3c4kNh1pC-RV5gQ1M6Jo1haQkGeZjOFGx0XHq",
    },
])

const navigate = useNavigate() // ✅ CAMBIO PARA VITE

const goToCartPage = () => {
    onClose()
    navigate("/pagecarrito") // ✅ CAMBIO PARA VITE
}

const shippingCost = 5.0

const updateQuantity = (id, delta) => {
    setCartItems((items) =>
    items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)),
    )
}

const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
}

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const total = subtotal + shippingCost
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

if (!isOpen) return null

return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 dark:bg-black/60">
    <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

    <div className="relative flex flex-col h-[60vh] max-h-[85vh] w-full max-w-2xl rounded-t-xl bg-white shadow-2xl dark:bg-[#1C2433]">

        {/* Handle */}
        <button className="flex h-5 w-full items-center justify-center pt-3" onClick={onClose} aria-label="Close cart">
        <div className="h-1 w-9 rounded-full bg-[#dbdfe6] dark:bg-slate-700" />
        </button>

        {/* Header */}
        <div className="flex items-center p-4 pb-2">
   
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-foreground">
            My Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h2>
        <div className="flex w-12 items-center justify-end">
            <button
            onClick={onClose}
            className="flex size-12 cursor-pointer items-center justify-center rounded-lg bg-transparent text-foreground transition-colors hover:bg-muted"
            aria-label="Close cart"
            >
            <X className="size-6" />
            </button>
        </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-white max-h-[55vh] dark:bg-[#1C2433]">

        <div className="flex flex-col gap-4 ">
            {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
                <div className="flex flex-1 items-center gap-4">
                <div
                    className="size-16 shrink-0 rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${item.image}")` }}
                    role="img"
                    aria-label={item.name}
                />
                <div className="flex flex-col justify-center">
                    <p className="line-clamp-1 text-base font-medium leading-normal text-foreground">{item.name}</p>
                    <p className="line-clamp-2 text-sm font-normal leading-normal text-muted-foreground">
                    {item.details}
                    </p>
                    <p className="pt-1 text-base font-semibold text-[#256af4]">${item.price.toFixed(2)}</p>
                </div>
                </div>
                <div className="shrink-0">
                <div className="flex items-center gap-2 text-foreground">
                    <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-muted text-base font-medium leading-normal transition-colors hover:bg-muted/80"
                    aria-label="Decrease quantity"
                    >
                    <Minus className="size-4" />
                    </button>
                    <span className="w-4 text-center text-base font-medium leading-normal">{item.quantity}</span>
                    <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-muted text-base font-medium leading-normal transition-colors hover:bg-muted/80"
                    aria-label="Increase quantity"
                    >
                    <Plus className="size-4" />
                    </button>
                </div>
                </div>
                <button
                onClick={() => removeItem(item.id)}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                aria-label="Remove item"
                >
                <X className="size-5" />
                </button>
            </div>
            ))}
        </div>
        </div>

        {/* Summary & Actions */}
        <div className="mt-auto border-t border-border bg-white p-4 dark:bg-[#1C2433]">
        <div className="flex flex-col gap-3">
            <div className="flex justify-between text-base">
            <p className="font-medium text-muted-foreground">Subtotal</p>
            <p className="font-medium text-foreground">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base">
            <p className="font-medium text-muted-foreground">Shipping</p>
            <p className="font-medium text-foreground">${shippingCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-bold">
            <p className="text-foreground">Total</p>
            <p className="text-[#256af4]">${total.toFixed(2)}</p>
            </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">

            {/* ✅ BOTÓN YA FUNCIONA EN VITE */}
            <button
            onClick={goToCartPage}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#256af4] px-5 text-base font-bold leading-normal tracking-wide text-white transition-colors hover:bg-[#1e56d1]"
            >
            Proceda al carrito
            </button>

            <button
            onClick={onClose}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#256af4]/20 px-5 text-base font-bold leading-normal tracking-wide text-[#256af4] transition-colors hover:bg-[#256af4]/30 dark:bg-[#256af4]/30"
            >
            Continue Shopping
            </button>
        </div>
        </div>
    </div>
    </div>
)
}
