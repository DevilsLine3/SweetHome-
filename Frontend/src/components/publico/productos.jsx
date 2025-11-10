import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../thema.jsx";
import axios from "axios";

// URL de la API (es mejor declararla fuera del componente o en un archivo de configuración)
const API_CATEGORIAS_URL = "http://localhost:5100/api/categorias";
const API_PRODUCTOS_URL = "http://localhost:5100/api/productos";


export default function Productos() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [normalizedProducts, setNormalizedProducts] = useState([]);
    const [categories, setCategories] = useState([{ _id: "Todos", Nombre: "Todos" }]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [categoryMap, setCategoryMap] = useState({}); // _id -> Nombre
    const [products, setProducts] = useState([]);

    // --- SECCIÓN DE FETCHING DE DATOS ---

    // ## 1. Traer categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(API_CATEGORIAS_URL);
                const active = res.data.filter((c) => c.Activo);

                const map = {};
                active.forEach((c) => (map[c._id] = c.Nombre)); // La clave es el ID

                setCategoryMap(map);
                setCategories([{ _id: "Todos", Nombre: "Todos" }, ...active]);
            } catch (e) {
                console.log("Error cargando categorías:", e);
            }
        };
        fetchCategories();
    }, []);

    // ## 2. Traer productos (CONSOLIDADO Y CORREGIDO EL FILTRO DE VISIBILIDAD)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(API_PRODUCTOS_URL);
                
                // 🟢 FILTRO CONSOLIDADO: Solo si está 'Disponible' Y 'Visible: true'
                const availableAndVisible = res.data.filter(p => 
                    p.Estado === 'Disponible' && p.Visible === true
                );
                
                setProducts(availableAndVisible);
            } catch (e) {
                console.log("Error cargando productos:", e);
            }
        };
        fetchProducts();
    }, []);

    // --- LÓGICA DE NORMALIZACIÓN Y FILTRADO ---
    
    // ## 3. Normalización y Mapeo (Sincronización más estricta)
    useEffect(() => {
        if (products.length > 0 && Object.keys(categoryMap).length === 0) { 
             console.log("Esperando mapa de categorías...");
             return; 
        }

        const normalized = products.map((p) => {
            // Obtener la cadena del ID de categoría de forma segura. 
            const catIdString = p.Categoria ? p.Categoria.toString() : null; 
            
            return {
                id: p._id,
                name: p.Nombre,
                description: p.Descripcion,
                price: p.Precio,
                image: p.Imagen,
                
                categoryId: catIdString, 
                category: categoryMap[catIdString] || "Otros", 
                
                stock: p.Stock,
                status: p.Estado,
            };
        });
        setNormalizedProducts(normalized);

    }, [products, categoryMap]);
    
    // ---

    // 🟢 Filtrado (Opera sobre normalizedProducts)
    const filteredProducts = normalizedProducts.filter((p) => {
        // 1. Filtramos productos sin stock
        if (p.stock <= 0) {
            return false;
        }

        // 2. Si la categoría seleccionada es "Todos", mostramos
        if (selectedCategory === "Todos") {
            return true;
        }

        // 3. Filtramos por ID de categoría
        return p.categoryId === selectedCategory;
    });
              
    // Función de carrito (vacía, solo para que compile)
    const addToCart = (product) => {
        console.log("Añadiendo al carrito:", product.name);
    };

    return (
        <section>
        <div className={`bg-slate-50 py-16 dark:bg-slate-900 sm:py-20`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Filtros de categoría */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
                {categories.map((cat) => (
                <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)} 
                    className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    cat._id === selectedCategory
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105"
                        : "bg-white text-slate-700 shadow-sm hover:shadow-md hover:scale-105 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                >
                    {cat.Nombre}
                </button>
                ))}
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-800"
                    onClick={() => navigate(`/producto/${product.id}`)}
                >
                    <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    </div>
                    <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {product.category}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-blue-600 dark:text-blue-500">
                        ${product.price != null ? product.price.toFixed(2) : "0.00"}
                    </p>

                    <div className="flex items-center gap-2 mt-2 mb-3">
                        <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                        {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        }}
                        className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-2 font-semibold transition hover:bg-blue-700 active:scale-95"
                        disabled={product.stock === 0}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {product.stock === 0 ? "Agotado" : "Añadir al carrito"}
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    );
}