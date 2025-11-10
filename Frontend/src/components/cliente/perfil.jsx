

import { useState } from "react"
import { ArrowLeft, Settings, Edit, ChevronDown, ChevronRight, LogOut } from "lucide-react"

export function UserProfile({ onBack, onSettings }) {
const [formData, setFormData] = useState({
    fullName: "Alex Martinez",
    email: "alex.martinez@email.com",
    address: "Calle Falsa 123, Springfield",
    phone: "+1 (555) 123-4567",
})

const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
}

const handleSaveChanges = () => {
    console.log("Guardando cambios:", formData)
    // Aquí puedes agregar tu lógica para guardar
}

const handleLogout = () => {
    console.log("Cerrando sesión...")
    // Aquí puedes agregar tu lógica de logout
}

const orders = [
    { id: "789123", date: "15 de Oct, 2023", amount: "$125.50", status: "Entregado" },
    { id: "789122", date: "02 de Sep, 2023", amount: "$89.99", status: "Entregado" },
]

const accountSettings = [
    { label: "Cambiar Contraseña", href: "#" },
    { label: "Gestionar Métodos de Pago", href: "#" },
    { label: "Preferencias de Notificación", href: "#" },
]

return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f5f6f8] dark:bg-[#101622]">
    <div className="mx-auto w-full max-w-2xl">
        {/* Top App Bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-[#f5f6f8] p-3 pb-2 backdrop-blur-sm dark:border-gray-800 dark:bg-[#101622]/80">
        <button
            onClick={onBack}
            className="flex size-10 shrink-0 items-center justify-start text-gray-800 dark:text-gray-200"
        >
            <ArrowLeft className="size-6" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-gray-100">
            Perfil
        </h1>
        <button
            onClick={onSettings}
            className="flex size-10 items-center justify-end overflow-hidden rounded-lg bg-transparent text-gray-800 dark:text-gray-200"
        >
            <Settings className="size-6" />
        </button>
        </header>

        <main className="flex-grow">
        {/* Profile Header */}
        <div className="bg-white p-3 dark:bg-gray-900/50">
            <div className="flex w-full flex-col gap-3">
            <div className="flex items-center gap-3">
                <div className="relative">
                <div
                    className="aspect-square h-20 w-20 rounded-full bg-cover bg-center bg-no-repeat"
                    style={{
                    backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiR1xV3xMEPrd8jcQRd9JIVcrSNUvNOorhGdORZYLde1MKCJPp3oUui9w9xFWlmEADvTq2czQiroJtViqEIyjoqRhvmsbJw6UAmoCLKEaRcH0HLlhS-7qFhKcY4qa5CUy_hhiw1TbNwlIynjL_-yhezbowEaIrAJceOMpMuRqXk_xCL91iz1G_uPjThw2Kccajux77m_5ygAHvtfbfKT6cTI18TBKCw-reiP-zMX1oPEZBzo1Le1R6e_pCwbEUY8QPmWkT_oRwmKTw")',
                    }}
                />
                <button className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#256af4] text-white dark:border-gray-900">
                    <Edit className="size-3.5" />
                </button>
                </div>
                <div className="flex flex-col justify-center">
                <p className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-gray-100">
                    Alex Martinez
                </p>
                <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">
                    alex.martinez@email.com
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* Accordions Section */}
        <div className="flex flex-col gap-3 p-3">
            {/* Información Personal */}
            <details
            className="group flex flex-col rounded-xl border border-gray-200 bg-white px-[15px] dark:border-gray-700 dark:bg-gray-900/50"
            open
            >
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-2.5">
                <p className="text-base font-medium leading-normal text-gray-900 dark:text-gray-100">
                Información Personal
                </p>
                <ChevronDown className="size-6 text-gray-800 transition-transform duration-300 group-open:rotate-180 dark:text-gray-200" />
            </summary>
            <div className="flex flex-col gap-3 pb-3">
                <label className="flex w-full flex-col">
                <p className="pb-1.5 text-sm font-medium leading-normal text-gray-800 dark:text-gray-200">
                    Nombre Completo
                </p>
                <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#256af4]/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                </label>
                <label className="flex w-full flex-col">
                <p className="pb-1.5 text-sm font-medium leading-normal text-gray-800 dark:text-gray-200">
                    Correo Electrónico
                </p>
                <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="h-10 w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-base font-normal leading-normal text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400"
                />
                </label>
                <label className="flex w-full flex-col">
                <p className="pb-1.5 text-sm font-medium leading-normal text-gray-800 dark:text-gray-200">
                    Dirección de Envío
                </p>
                <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#256af4]/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                </label>
                <label className="flex w-full flex-col">
                <p className="pb-1.5 text-sm font-medium leading-normal text-gray-800 dark:text-gray-200">
                    Número de Teléfono
                </p>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#256af4]/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                </label>
                <button
                onClick={handleSaveChanges}
                className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#256af4] px-4 text-base font-bold leading-normal tracking-[0.015em] text-white"
                >
                <span className="truncate">Guardar Cambios</span>
                </button>
            </div>
            </details>

            {/* Historial de Compras */}
            <details className="group flex flex-col rounded-xl border border-gray-200 bg-white px-[15px] dark:border-gray-700 dark:bg-gray-900/50">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-2.5">
                <p className="text-base font-medium leading-normal text-gray-900 dark:text-gray-100">
                Historial de Compras
                </p>
                <ChevronDown className="size-6 text-gray-800 transition-transform duration-300 group-open:rotate-180 dark:text-gray-200" />
            </summary>
            <div className="space-y-2 pb-3">
                {orders.map((order) => (
                <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg bg-[#f5f6f8] p-2.5 dark:bg-gray-800"
                >
                    <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Pedido #{order.id}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {order.date} - {order.amount}
                    </p>
                    </div>
                    <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{order.status}</span>
                    <ChevronRight className="size-5 text-gray-500 dark:text-gray-400" />
                    </div>
                </div>
                ))}
                <a href="#" className="block pt-1 text-center text-sm font-semibold text-[#256af4]">
                Ver Todo
                </a>
            </div>
            </details>

            {/* Configuración de Cuenta */}
            <details className="group flex flex-col rounded-xl border border-gray-200 bg-white px-[15px] dark:border-gray-700 dark:bg-gray-900/50">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-2.5">
                <p className="text-base font-medium leading-normal text-gray-900 dark:text-gray-100">
                Configuración de Cuenta
                </p>
                <ChevronDown className="size-6 text-gray-800 transition-transform duration-300 group-open:rotate-180 dark:text-gray-200" />
            </summary>
            <div className="divide-y divide-gray-200 pb-3 dark:divide-gray-700">
                {accountSettings.map((setting, index) => (
                <a key={index} href={setting.href} className="flex items-center justify-between py-2.5">
                    <span className="text-gray-700 dark:text-gray-300">{setting.label}</span>
                    <ChevronRight className="size-5 text-gray-500 dark:text-gray-400" />
                </a>
                ))}
            </div>
            </details>
        </div>

        {/* Log Out Button */}
        <div className="mt-2 p-3">
            <button
            onClick={handleLogout}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-red-200 bg-transparent px-4 text-base font-bold leading-normal tracking-[0.015em] text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:text-red-500 dark:hover:bg-red-500/10"
            >
            <LogOut className="size-5" />
            <span className="truncate">Cerrar Sesión</span>
            </button>
        </div>
        </main>
    </div>
    </div>
)
}
