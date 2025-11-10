"use client"

import { useState, useEffect } from "react"
import api from "../../api/axiosConfig.js"
import CategoryList from "./categorias"

export default function CategoryManagement() {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "", status: true })

  // ✅ Cargar categorías al iniciar
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categorias")

      const mapped = res.data.map((cat) => ({
        id: cat._id,
        name: cat.Nombre,
        description: cat.Descripcion,
        status: cat.Activo,
      }))

      setCategories(mapped)
    } catch (error) {
      console.log("❌ Error cargando categorías", error)
      if (error.response?.status === 401) {
        alert("Tu sesión expiró. Vuelve a iniciar sesión.")
      }
    }
  }

  // ✅ Guardar o Editar
  const handleSave = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Nombre y descripción son obligatorios")
      return
    }

    try {
      if (editingId) {
        // ✅ Editar
        await api.put(`/categorias/${editingId}`, {
          Nombre: formData.name,
          Descripcion: formData.description,
        })
        alert("✅ Categoría actualizada correctamente")
      } else {
        // ✅ Crear nueva
        await api.post("/categorias", {
          Nombre: formData.name,
          Descripcion: formData.description,
          Activo: formData.status,
        })
        alert("✅ Categoría creada exitosamente")
      }

      fetchCategories()
      resetForm()
    } catch (error) {
      console.log("❌ Error guardando categoría", error)
      if (error.response?.status === 401) {
        alert("No autorizado, inicia sesión nuevamente")
      } else {
        alert("❌ Error al guardar la categoría")
      }
    }
  }

  // ✅ Cambiar estado (activar/desactivar)
const handleToggleStatus = async (id) => {
  try {
    const res = await api.patch(`/categorias/${id}/estado`);
    const updatedCategoria = res.data.categoria;

    // Actualiza localmente usando la respuesta del backend
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id
          ? { ...cat, status: updatedCategoria.Activo }
          : cat
      )
    );

  } catch (error) {
    console.log("❌ Error cambiando estado", error);
    if (error.response?.status === 401) {
      alert("No autorizado, inicia sesión nuevamente")
    } else {
      alert("❌ No se pudo cambiar el estado de la categoría")
    }
  }
}

  const handleEdit = (category) => {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    })
    setShowForm(true)
  }

  const handleAdd = () => {
    resetForm()
    setShowForm(true)
  }

  const handleCancel = () => resetForm()

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: "", description: "", status: true })
  }

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isEditing = !!editingId

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {showForm ? (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-4">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isEditing ? "Editar Categoría" : "Nueva Categoría"}
              </h1>
            </div>

            <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border bg-blue-50 dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border bg-blue-50 dark:bg-slate-700"
                />
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <button type="button" onClick={handleCancel} className="flex-1 px-6 py-3 rounded-lg border">
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                >
                  {isEditing ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <CategoryList
          categories={filteredCategories}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onAdd={handleAdd}
        />
      )}
    </div>
  )
}
