"use client";
import { useState } from "react";

export default function ProfilePage() {
const [profileImage, setProfileImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Juan");
const [formData, setFormData] = useState({
    fullName: "Juan Perez",
    email: "juan.perez@example.com",
    phone: "+52 (555) 123-4567",
    address: "Calle Principal 123, Ciudad, México",
});

const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
    }
};

const handlePhotoDelete = () => {
    setProfileImage("https://api.dicebear.com/7.x/avataaars/svg?seed=Default");
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
};

return (
    <div className="min-h-screen bg-[#e3f5ff] dark:from-gray-900 dark:via-blue-950 dark:to-cyan-950">
    <main className="flex justify-center py-8 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col max-w-4xl w-full gap-8">

        {/* -- HERO -- */}
        <div className="bg-gradient-to-br from-[#90d5ff] to-[#a8dfff] rounded-2xl p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col items-center text-center gap-6">
            
            {/* FOTO */}
            <div className="relative">
                <div
                className="w-32 h-32 rounded-full bg-cover bg-center ring-4 ring-white shadow-xl"
                style={{ backgroundImage: `url("${profileImage}")` }}
                />
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6 text-[#90d5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </div>
            </div>

            <h1 className="text-4xl font-bold text-black">Mi Perfil</h1>
            <p className="text-black text-lg">Gestiona tu información personal</p>

            <div className="flex flex-wrap gap-3 justify-center">
                <input type="file" id="photoInput" accept="image/*" onChange={handlePhotoChange} className="hidden" />

                {/* ✅ Botón Cambiar foto */}
                <button
                onClick={() => document.getElementById("photoInput").click()}
                className="bg-white/90 hover:bg-white text-black font-semibold px-5 py-2 rounded-lg shadow"
                >
                Cambiar Foto
                </button>

                {/* ✅ Botón Eliminar */}
                <button
                onClick={handlePhotoDelete}
                className="text-black border-2 border-black/50 hover:bg-white/10 px-5 py-2 rounded-lg"
                >
                Eliminar
                </button>
            </div>
            </div>
        </div>

        {/* -- FORMULARIO -- */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Información Personal</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* NOMBRE */}
                <div className="space-y-2">
                    <p className="text-black dark:text-gray-300 font-medium">Nombre Completo</p>
                    <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full h-12 pl-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:border-[#90d5ff] focus:ring-[#90d5ff]"
                    placeholder="Ingresa tu nombre completo"
                    />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                    <p className="text-black dark:text-gray-300 font-medium">Correo Electrónico</p>
                    <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full h-12 pl-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* TELÉFONO */}
                <div className="space-y-2">
                    <p className="text-black dark:text-gray-300 font-medium">Número de Teléfono</p>
                    <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 pl-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:border-[#90d5ff] focus:ring-[#90d5ff]"
                    placeholder="Ingresa tu número de teléfono"
                    />
                </div>

                {/* DIRECCIÓN */}
                <div className="space-y-2">
                    <p className="text-black dark:text-gray-300 font-medium">Dirección</p>
                    <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-12 pl-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:border-[#90d5ff] focus:ring-[#90d5ff]"
                    placeholder="Ingresa tu dirección"
                    />
                </div>
                </div>

                {/* BOTONES */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button
                    type="button"
                    className="w-full sm:w-auto h-12 px-8 border-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="w-full sm:w-auto h-12 px-8 rounded-lg bg-gradient-to-r from-[#90d5ff] to-[#a8dfff] hover:from-[#7dc9ff] hover:to-[#95d6ff] text-black font-semibold shadow-lg"
                >
                    Guardar Cambios
                </button>
                </div>
            </form>
            </div>
        </div>

        {/* INFO */}
        <div className="bg-gradient-to-r from-[#d4edff] to-[#e3f5ff] dark:from-gray-800 dark:to-blue-900/30 rounded-xl p-6 border border-[#90d5ff]/30 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Información de Cuenta</h3>
            <p className="text-black dark:text-gray-300 text-sm leading-relaxed">
            Tu correo electrónico no puede ser modificado una vez verificado. Si necesitas cambiarlo, contacta soporte.
            </p>
        </div>
        </div>
    </main>
    </div>
);
}
