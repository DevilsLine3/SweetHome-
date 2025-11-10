// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout";
import Home from "../components/publico/home";
import ProductDetail from "../components/publico/detalleProducto";
import CartPage from "../components/publico/carrito";
import { UserProfile } from "../components/cliente/perfil";
import { ModalInicio } from "../components/login/inicio";
import ProductForm from "../components/cliente/vender_producto";
import ProductExplorer from "../components/cliente/vista_productos";
import PrivateRoute from "./privateroutes";
import CategoryList from "../components/administrador/categorias";
import UserList from "../components/administrador/usuarios";
import ProductList from "../components/administrador/productos";
import CategoryManagement from "../components/administrador/form_categoria";
import ProductManagement from "../components/administrador/form_producto";
import ProductManagementciente from "../components/cliente/form_producto";

import UserManagement from "../components/administrador/usuariovisual";
import TransactionsPage from "../components/cliente/transacciones";
import CheckoutSimulator from "../components/cliente/metodo_pago";
import OrderManagement from "../components/administrador/pedidos";
import ProfilePage from "../components/cliente/perfil_edi";



const AppRoutes = () => {
return (
    <Routes>
    <Route element={<Layout />}>
        
        {/*  RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/pagecarrito" element={<CartPage />} />
        <Route path="/login" element={<ModalInicio />} />
        <Route path="/explorar" element={<ProductExplorer />} />

        {/*  PERMITIDO SOLO CLIENTE */}
        <Route
        path="/perfil"
        element={
            <PrivateRoute allowedRoles={["Cliente", "Admin"]}>
            <ProfilePage />
            </PrivateRoute>
        }
        />

        <Route
        path="/vender"
        element={
            <PrivateRoute allowedRoles={["Cliente"]}>
            <ProductForm />
            </PrivateRoute>
        }
        />

        
        <Route
        path="/transacciones"
        element={
            <PrivateRoute allowedRoles={["Cliente"]}>
            <TransactionsPage />
            </PrivateRoute>
        }
        />

        <Route
        path="/productoscliente"
        element={
            <PrivateRoute allowedRoles={["Cliente"]}>
            <ProductManagementciente  />
            </PrivateRoute>
        }
        />

        <Route
        path="/metodo-pago"
        element={
            <PrivateRoute allowedRoles={["Cliente"]}>
            <CheckoutSimulator />
            </PrivateRoute>
        }
        />

        {/*  PERMITIDO SOLO ADMIN */}

        <Route
        path="/categorias"
        element={
            <PrivateRoute allowedRoles={["Admin"]}>
            <CategoryManagement />
            </PrivateRoute>
        }
        />
        
        <Route
        path="/usuarios"
        element={
            <PrivateRoute allowedRoles={["Admin"]}>
            <UserManagement />
            </PrivateRoute>
        }
        />

        
        <Route
        path="/productos"
        element={
            <PrivateRoute allowedRoles={["Admin"]}>
            <ProductManagement />
            </PrivateRoute>
        }
        />

        
        <Route
        path="/pedidos"
        element={
            <PrivateRoute allowedRoles={["Admin"]}>
            <OrderManagement />
            </PrivateRoute>
        }
        />

        </Route>

    </Routes>
);
};

export default AppRoutes;
