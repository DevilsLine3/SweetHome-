"use client"

import { useState, useEffect } from "react"
import api from "../../api/axiosConfig"
import UserList from "./usuarios"
import UserForm from "./form_usuario"

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get("/usuarios/")
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
      alert("Error al cargar los usuarios")
    }
  }

  const handleAddUser = () => {
    setEditingUser(null)
    setShowForm(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDeleteUser = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return

    try {
      await api.delete(`/usuarios/${id}`)
      setUsers(users.filter(u => u._id !== id))
      alert("Usuario eliminado correctamente")
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("Error al eliminar el usuario")
    }
  }

  const handleSubmitUser = async (data) => {
    try {
      if (editingUser && editingUser._id) {
        // Actualizar usuario existente
        const response = await api.put(`/usuarios/${editingUser._id}`, data)
        const updatedUser = response.data.data;
        setUsers(users.map(user => (user._id === editingUser._id ? updatedUser : user)))
        alert("Usuario actualizado correctamente")
      } else {
        // Crear nuevo usuario
        const response = await api.post("/usuarios/register", data)
        setUsers([...users, response.data])
        alert("Usuario creado correctamente")
      }
      setShowForm(false)
      setEditingUser(null)
    } catch (error) {
      console.error("Error saving user:", error)
      alert("Error al guardar el usuario")
    }
  }

  const filteredUsers = users.filter(u => {
    const fullName = `${u.Nombre ?? ""} ${u.Apellidos ?? ""}`
    return fullName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <>
      {showForm ? (
        <UserForm
          initialData={editingUser}
          onSubmit={handleSubmitUser}
          onCancel={() => { setShowForm(false); setEditingUser(null) }}
        />
      ) : (
        <UserList
          users={filteredUsers}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </>
  )
}
