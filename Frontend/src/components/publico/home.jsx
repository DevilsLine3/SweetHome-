import React from 'react'
import Publicitario from './publicitario'
import Productos from './productos'
import { useTheme } from "../thema";
const Home = () => {
const { isDark } = useTheme();

return (
    <div>
    <Publicitario />
        <div className={`${isDark ? "bg-slate-900" : "bg-50"} text-center my-0 py-2`}>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground dark:text-slate-400">
            Productos Destacados
        </h2>
        <p className="mt-2 text-lg text-muted-foreground dark:text-slate-400">
            Explora nuestra selección de productos más populares
        </p>
        </div>
    <Productos />
    </div>
)
}

export default Home;
