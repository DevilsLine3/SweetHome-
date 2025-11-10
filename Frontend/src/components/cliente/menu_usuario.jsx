

import { useState, useRef, useEffect } from "react"
import { User, ShoppingCart, Receipt, LogOut, ChevronRight, Package } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export function UserDropdownMenu({
userName = "Ana García",
userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuB_slKxIcinJu24ofUbe6g0IRSHpilYTkukFLfhu2xa9wV9ghN8CmRBPLHJwF5YCyVgQLvrkDLQgJTjOZPxvs78IPNA2J-QtFsH8TYtJXeUIN-yukRUTIfZIAZVcCEzYLGzW2Q-FK5bBRkx2jBUdrmKZYYMY98ww7QGEj5s6xMHlJSKncCGggFO2UHDFQ9_GkpcThv7E6OcKxrXcJU6KSv7pLtIUSS3ZbHZvOkd1gaBBSiEsjqxqJG3PFQo7OieV37AT531zFnaT6t6",
onLogout,
onNavigate,
}) {
const [isOpen, setIsOpen] = useState(false)
const dropdownRef = useRef(null)
const buttonRef = useRef(null)

useEffect(() => {
    function handleClickOutside(event) {
    if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
    ) {
        setIsOpen(false)
    }
    }

    if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
    document.removeEventListener("mousedown", handleClickOutside)
    }
}, [isOpen])

const navigate = useNavigate()

const handleNavigation = (section) => {
  if (section === "transacciones") navigate("/transacciones")
  if (section === "productos") navigate("/productoscliente")
  setIsOpen(false)
}


const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
    };


return (
    <div className="relative">
    <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 rounded-full bg-cover bg-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        style={{ backgroundImage: `url('${userAvatar}')` }}
        aria-label="Menú de usuario"
        aria-expanded={isOpen}
    />

    {isOpen && (
        <div
        ref={dropdownRef}
        className="absolute right-0 top-full mt-2 w-80 animate-in fade-in slide-in-from-top-2 duration-200"
        >
        <div className="rounded-xl bg-card shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            <div className="p-2">
            {/* User Info Header */}
            <div className="flex items-center gap-3 px-3 py-3">
                <div
                className="aspect-square h-10 w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url("${userAvatar}")` }}
                aria-label={userName}
                />
                <p className="flex-1 truncate text-base font-semibold leading-normal text-foreground">{userName}</p>
            </div>

            {/* Divider */}
            <hr className="mx-3 my-1 border-border" />

            {/* Navigation List */}
           <nav className="flex flex-col gap-1 p-1">
  {/* Mis Transacciones */}
  <button
    onClick={() => handleNavigation("transacciones")}
    className="flex min-h-11 items-center gap-3 rounded-lg bg-card px-3 transition-colors hover:bg-accent"
  >
    <div className="flex size-8 shrink-0 items-center justify-center text-muted-foreground">
      <Receipt className="h-5 w-5" />
    </div>
    <p className="flex-1 truncate text-left text-sm font-medium leading-normal text-foreground">
      Mis transacciones
    </p>
  </button>

  {/* Mis Productos */}
  <button
    onClick={() => handleNavigation("productos")}
    className="flex min-h-11 items-center gap-3 rounded-lg bg-card px-3 transition-colors hover:bg-accent"
  >
    <div className="flex size-8 shrink-0 items-center justify-center text-muted-foreground">
      <Package className="h-5 w-5" />
    </div>
    <p className="flex-1 truncate text-left text-sm font-medium leading-normal text-foreground">
      Mis productos
    </p>
  </button>

  {/* Mi Perfil */}
  <Link to="/perfil">
    <button className="flex min-h-11 items-center gap-3 rounded-lg bg-primary/10 px-3 transition-colors hover:bg-primary/20">
      <div className="flex size-8 shrink-0 items-center justify-center text-primary">
        <User className="h-5 w-5" />
      </div>
      <p className="flex-1 truncate text-left text-sm font-semibold leading-normal text-primary">
        Mi perfil
      </p>
      <div className="shrink-0">
        <div className="flex size-7 items-center justify-center text-primary">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </button>
  </Link>
</nav>


            {/* Divider */}
            <hr className="mx-3 my-1 border-border" />

            {/* Logout Button */}
            <div className="p-1">
                <button
                onClick={handleLogout}
                className="flex w-full min-h-11 items-center gap-3 rounded-lg px-3 transition-colors hover:bg-destructive/10"
                >
                <div className="flex size-8 shrink-0 items-center justify-center text-destructive">
                    <LogOut className="h-5 w-5" />
                </div>
                <p className="flex-1 truncate text-left text-sm font-medium leading-normal text-destructive">
                    Cerrar Sesión
                </p>
                </button>
            </div>
            </div>
        </div>
        </div>
    )}
    </div>
)
}
