import { useState } from "react";

export default function OrderManagement() {
const [searchQuery, setSearchQuery] = useState("");
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editingOrder, setEditingOrder] = useState(null);

const [orders, setOrders] = useState([
    { id: "#ORD-001", customer: "Ana Pérez", date: "15 Oct, 2023", status: "Entregado", total: "$125.50", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
    { id: "#ORD-002", customer: "Carlos Gómez", date: "14 Oct, 2023", status: "Enviado", total: "$89.99", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
    { id: "#ORD-003", customer: "Luisa Fernández", date: "13 Oct, 2023", status: "Pendiente", total: "$250.00", statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
    { id: "#ORD-004", customer: "Juan Martínez", date: "12 Oct, 2023", status: "Cancelado", total: "$45.20", statusColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
    { id: "#ORD-005", customer: "María Rodríguez", date: "11 Oct, 2023", status: "Entregado", total: "$310.75", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
]);

const handleEditClick = (order) => {
    setEditingOrder({ ...order });
    setIsEditModalOpen(true);
};

const handleSaveOrder = () => {
    const statusColorMap = {
    Entregado: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    Enviado: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Pendiente: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Cancelado: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    };

    const updatedOrder = {
    ...editingOrder,
    statusColor: statusColorMap[editingOrder.status],
    };

    setOrders((prev) =>
    prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );

    setIsEditModalOpen(false);
    setEditingOrder(null);
};

const filteredOrders = orders.filter(
    (o) =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-black dark:text-gray-200">

    {/* CONTENIDO */}
    <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Pedidos</h1>

            <button className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#4ea8de] to-[#3b8cc4] dark:from-[#1b5f8a] dark:to-[#164a6a]">
            Exportar Pedidos
            </button>
        </div>

        {/* BUSCAR */}
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-2xl border p-6 mb-6">
            <span className="block mb-3 text-sm font-semibold">Buscar pedido</span>
            <input
            type="text"
            placeholder="Buscar por ID o cliente"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* TABLA */}
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-2xl border overflow-hidden">
            <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                <tr>
                <th className="px-6 py-4 text-left font-bold">ID Pedido</th>
                <th className="px-6 py-4 text-left font-bold">Cliente</th>
                <th className="px-6 py-4 text-left font-bold">Fecha</th>
                <th className="px-6 py-4 text-left font-bold">Estado</th>
                <th className="px-6 py-4 text-right font-bold">Total</th>
                <th className="px-6 py-4 text-center font-bold">Acciones</th>
                </tr>
            </thead>

            <tbody>
                {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-semibold">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">{order.total}</td>
                    <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => handleEditClick(order)}
                        className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-[#4ea8de] to-[#3b8cc4] dark:from-[#1b5f8a] dark:to-[#164a6a]"
                    >
                        Editar
                    </button>
                    </td>
                </tr>
                ))}

                {filteredOrders.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No se encontraron pedidos
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    </main>

    {/* MODAL */}
    {isEditModalOpen && editingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-2xl p-6 max-w-lg w-full">

            <h2 className="text-xl font-bold mb-4">Editar Pedido</h2>

            <div className="space-y-3">
            <div>
                <label className="text-sm font-semibold">ID</label>
                <input disabled value={editingOrder.id} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600" />
            </div>

            <div>
                <label className="text-sm font-semibold">Cliente</label>
                <input
                value={editingOrder.customer}
                onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div>
                <label className="text-sm font-semibold">Fecha</label>
                <input
                value={editingOrder.date}
                onChange={(e) => setEditingOrder({ ...editingOrder, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div>
                <label className="text-sm font-semibold">Estado</label>
                <select
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={editingOrder.status}
                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                >
                <option>Pendiente</option>
                <option>Enviado</option>
                <option>Entregado</option>
                <option>Cancelado</option>
                </select>
            </div>

            <div>
                <label className="text-sm font-semibold">Total</label>
                <input
                value={editingOrder.total}
                onChange={(e) => setEditingOrder({ ...editingOrder, total: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
            <button
                onClick={() => {
                setIsEditModalOpen(false);
                setEditingOrder(null);
                }}
                className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:text-white"
            >
                Cancelar
            </button>

            <button
                onClick={handleSaveOrder}
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#4ea8de] to-[#3b8cc4] dark:from-[#1b5f8a] dark:to-[#164a6a]"
            >
                Guardar Cambios
            </button>
            </div>

        </div>
        </div>
    )}
    </div>
);
}
