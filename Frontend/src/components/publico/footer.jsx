import { useTheme } from "../thema"; // 🔹 hook global
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
empresa: [
    { name: "Acerca de Nosotros", href: "#" },
    { name: "Carreras", href: "#" },
    { name: "Prensa", href: "#" },
    { name: "Blog", href: "#" },
],
soporte: [
    { name: "Atención al Cliente", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Envíos y Devoluciones", href: "#" },
    { name: "Garantías", href: "#" },
],
legal: [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Cookies", href: "#" },
],
};

const socialLinks = [
{ name: "Facebook", href: "#", icon: Facebook, color: "hover:text-blue-600" },
{ name: "Instagram", href: "#", icon: Instagram, color: "hover:text-pink-600" },
{ name: "Twitter", href: "#", icon: Twitter, color: "hover:text-sky-500" },
];

export default function Footer() {
const { isDark } = useTheme();

return (
    <footer className={`${isDark ? "bg-slate-900" : "bg-blue-100"} relative border-t border-blue-200 dark:border-gray-700 overflow-hidden`}>
    <div className="absolute inset-0 opacity-20">
        <div
        className="h-full w-full"
        style={{
            backgroundImage: 'url("/Frontend/src/assets/light-blue-pattern.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        />
    </div>

    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100">
        <div className="mb-12 grid gap-8 lg:grid-cols-3">
        {/* Brand Section */}
        <div className="lg:col-span-1">
            <h2 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            Sweet Home
            </h2>
            <p className="mb-6 text-sm leading-relaxed">
            Tu destino para encontrar los mejores productos al mejor precio. Compra y vende con confianza en nuestra
            plataforma segura.
            </p>
            <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>contacto@marketplace.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Ciudad de México, México</span>
            </div>
            </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            {["empresa", "soporte", "legal"].map((section) => (
            <div key={section} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                <ul className="space-y-3">
                {footerLinks[section].map((link) => (
                    <li key={link.name}>
                    <a
                        href={link.href}
                        className={`text-sm transition-colors hover:text-blue-600 hover:translate-x-1 inline-block ${
                        isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                    >
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
        </div>

        <div className="border-t border-blue-200 dark:border-gray-700 pt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>2025 Sweet Home. Venta de Garage.</p>

        <div className="flex items-center gap-2">
            <span className={`mr-2 text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>Contáctanos:</span>
            {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
                <a
                key={social.name}
                href={social.href}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${isDark ? "bg-gray-800 text-slate-300" : "bg-white text-slate-600"} shadow-sm transition-all hover:scale-110 hover:shadow-lg hover:bg-blue-50 ${social.color}`}
                aria-label={social.name}
                >
                <Icon className="h-5 w-5" />
                </a>
            );
            })}
        </div>
        </div>
    </div>
    </footer>
);
}
