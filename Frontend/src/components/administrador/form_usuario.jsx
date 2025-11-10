import { useState, useEffect } from "react";

export default function UserForm({ onSubmit, onCancel, initialData }) {
const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    photo: null,
});

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [error, setError] = useState("");
const [photoPreview, setPhotoPreview] = useState(null);

useEffect(() => {
    if (initialData) {
    setFormData({
        name: initialData.Nombre || "",
        lastName: initialData.Apellidos || "",
        phone: initialData.Telefono || "",
        email: initialData.Email || "",
        role: initialData.Rol || "",
        password: "",
        confirmPassword: "",
        photo: initialData.Foto || null,
    });
    setPhotoPreview(initialData.Foto || null);
    }
}, [initialData]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
};

const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
    }
    setError("");
};

const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData((prev) => ({ ...prev, photo: null }));
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
    setError("Por favor completa todos los campos obligatorios");
    return;
    }

    // Solo validar contraseña si es un nuevo usuario
    if (!initialData && (!formData.password || !formData.confirmPassword)) {
    setError("Las contraseñas son requeridas para usuarios nuevos");
    return;
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    setError("Las contraseñas no coinciden");
    return;
    }

    const submitData = {
    Nombre: formData.name,
    Apellidos: formData.lastName,
    Email: formData.email,
    Rol: formData.role,
    Foto: formData.photo,
    Telefono: formData.phone,
    Contraseña: formData.password || undefined,
    };

    console.log("Submit data:", submitData);

    onSubmit(submitData);
};

return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    {/* Header */}
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
        <button onClick={onCancel} className="inline-flex items-center justify-center size-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200" aria-label="Volver">
            ←
        </button>
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {initialData ? "Editar Usuario" : "Crear Nuevo Usuario"}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {initialData ? "Actualiza la información del usuario" : "Completa los datos del nuevo usuario"}
            </p>
        </div>
        </div>
    </header>

    {/* Form Content */}
    <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Foto */}
            <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Foto de Perfil</label>
            <div className="flex flex-col gap-4 items-center">
                <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 flex items-center justify-center border-4 border-slate-200 dark:border-slate-700">
                    {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                    <span className="text-4xl">👤</span>
                    )}
                </div>
                {photoPreview && (
                    <button type="button" onClick={handleRemovePhoto} className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold transition-colors duration-200" aria-label="Eliminar foto">
                    ✕
                    </button>
                )}
                </div>
                <label className="cursor-pointer px-6 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-600 text-blue-600 dark:text-blue-400 font-semibold transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                Seleccionar Foto
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" aria-label="Subir foto" />
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG o GIF (máx. 5MB)</p>
            </div>
            </div>

            {/* Nombre y Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2.5">
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Nombre</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Juan" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>
            <div className="space-y-2.5">
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Apellidos</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Pérez" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>
            </div>

            {/* Email */}
            <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Correo Electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="juan@ejemplo.com" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>

            {/* Rol */}
            <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Rol del Usuario</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer">
                <option value="">Seleccionar rol</option>
                <option value="Admin">Administrador</option>
                <option value="Cliente">Vendedor-Comprador</option>
            </select>
            </div>

            {/* Teléfono */}
            <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Teléfono</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="555-1234" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>

            {/* Contraseña - solo si es creación */}
            {!initialData && (
            <>
                <div className="space-y-2.5">
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Contraseña</label>
                <div className="flex gap-2">
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="inline-flex items-center justify-center px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                    {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
                </div>

                <div className="space-y-2.5">
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">Confirmar Contraseña</label>
                <div className="flex gap-2">
                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="inline-flex items-center justify-center px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                    {showConfirmPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
                </div>
            </>
            )}

            {/* Error Message */}
            {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex gap-3 animate-in fade-in slide-in-from-top-2">
                <span className="text-red-600 dark:text-red-400 text-sm font-medium">⚠️ {error}</span>
            </div>
            )}
        </form>
        </div>
    </main>

    {/* Actions Footer */}
    <footer className="sticky bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
        <button onClick={handleSubmit} className="flex-1 h-12 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/20 active:scale-95">
            {initialData ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
        <button onClick={onCancel} className="flex-1 h-12 px-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200">
            Cancelar
        </button>
        </div>
    </footer>
    </div>
);
}
