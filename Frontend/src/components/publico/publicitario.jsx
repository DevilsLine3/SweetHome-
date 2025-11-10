import { useTheme } from "../thema" // 🔹 hook global
import { ArrowRight, Truck, Shield, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Publicitario = () => {
const { isDark } = useTheme(); // 🔹 usamos el estado global

return (
    <div className={isDark ? "dark bg-slate-900" : "bg-white"}>
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 dark:from-teal-900/40 dark:via-cyan-900/40 dark:to-blue-900/30 py-24 sm:py-32 lg:py-40">

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900 dark:text-white">
            Descubre una nueva forma de{" "}
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                comprar online
            </span>

        </h1>

        <p className="mt-6 text-pretty text-lg leading-8 text-slate-600 dark:text-slate-400 sm:text-xl">
            Explora como si estuvieras buscando tesoros con cada producto único que encontrarás en Sweet Home.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/explorar" >
            <button className="group min-w-[200px] text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center justify-center text-white">
            Explorar productos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            </Link>
        </div>
        </div>
    </section>

    {/* Features Section */}
    <section className="bg-slate-50 dark:bg-slate-900/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">¿Por qué elegirnos?</h2>
        <p className="mt-4 text-pretty text-lg text-slate-600 dark:text-slate-400">
            Ofrecemos la mejor experiencia de compra con beneficios exclusivos
        </p>

        <div className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 mx-auto">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl rounded-lg text-slate-900 dark:text-slate-100">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
                <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Envío Rápido</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Recibe tus productos en 24-48 horas. Envío gratis en compras superiores a $50.
            </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl rounded-lg text-slate-900 dark:text-slate-100">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
                <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Compra Segura</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Protección total en todas tus transacciones con encriptación de última generación.
            </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl rounded-lg text-slate-900 dark:text-slate-100">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
                <Package className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Gran Variedad</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Más de 10,000 productos de las mejores marcas para elegir.
            </p>
            </div>
        </div>
        </div>
    </section>
    </div>
);
};

export default Publicitario;
