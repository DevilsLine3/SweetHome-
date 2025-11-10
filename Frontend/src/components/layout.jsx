// src/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./publico/barra_nav";
import Footer from "./publico/footer";

const Layout = () => {
return (
    <>
    <Header />
    <main style={{ minHeight: "80vh" }}>
        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
    </main>
    <Footer />
    </>
);
};

export default Layout;
