
import { useState } from "react"

export default function SalesTransactions() {
const [searchTerm, setSearchTerm] = useState("")

const salesData = [
    {
    id: 1,
    product: "Chaqueta de Cuero Vintage",
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBu_jvBYyTMP_WQufVO2xmavoJJ9O1BNX0RDeIuLICPX4fgIRDriIYj6WlPiim1SRoALUDh8nehc4Zmf5AGhwcj0clRYaBXJpwo882BFoNhNNZBYRzAGTf6t_BqX1CsNteS1ubHfFCAaJuxnb5FqOUIvVObJUtuC7kfqUZDhWteh5UVYHzSAmAgWN_bLH_n0RrPET81mBQC7OH0yXknnkAAGAEsqU_N1ojkjcdyjR_8MlIyYtSe3vqLwp40IYVAJE-ivL9SJLIvVEVf",
    buyer: "Carlos Ruiz",
    date: "26 Oct, 2023",
    price: "$120.00",
    status: "Entregado",
    statusColor: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    statusDot: "bg-green-500",
    },
    {
    id: 2,
    product: "Taza de Cerámica",
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCbGpkRta7VqEITJXj39VC0n4vTyYmQQDH73crnxWDhhX_gtP5u-FeLHFePHNsPCwsRTTkYKpwam5KF00VUHT3X0kZj5VzDcor_05amcknI1TWI5coQZA8DsP4Jrzr7pNDOG_zLzL8VSiwNhTtRB1tmav-Z2HO3A71FlW7y3gow_eDca5p07TnFiWf1vp9cBO43eer0VTivKMvI3GP8XpRQSax43CYeMyWUkIkRXIl32J9XGWO_dlDrSAL2BUph8vQSWC4yDx3OOnp1",
    buyer: "Laura Gómez",
    date: "24 Oct, 2023",
    price: "$25.50",
    status: "Enviado",
    statusColor: "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
    statusDot: "bg-blue-500",
    },
    {
    id: 3,
    product: "Auriculares Inalámbricos",
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2J5pyMJmozOCpjMyN0HUgEGFCBprPzD-D78q3tjBuYMN1ATQp0NCrKeZb_2rRp23N4111wQpVQzKmsz8rmEG49w4z-axHvkqXgfxOaSEjzFhFReFouo-JkseN13VxszoiFJOLSPd9w6K3hVPTdqmwwyLeQdcOZ5JsSNGHN1oIZhTMCwm7CglmBVVik-7Mhji5BKFKrAvICkQLbe19mY2fsP29pZLGQ0O6YMMcH8kSi1os1FTMC-UedOUaGpe5CIxAbSPFh4HC6Zw",
    buyer: "Javier Sanz",
    date: "23 Oct, 2023",
    price: "$89.99",
    status: "En camino",
    statusColor: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    statusDot: "bg-yellow-500",
    },
    {
    id: 4,
    product: "Pluma Estilográfica",
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJoPiISmv2vVQHt-jXF4YFQ7DZLpipKsFVaxzHxAwZuac3mKkcIkxu_7ACGzTLEA1oNJpwXfrUuCabBHJX2SGvt63NQ2DTmEBKCuwSbhMInsVuPb_HzknqrFKrsIqe3uOhzI0eCvsQLv_rQckCqycjRuVg129gJmPjn_gC2NMWEUWRdlxttkTC_4Ffrwokbj3nRkPRZIBHpqlF4xpHe1S9czBSMH561pAUUVSxIxHRimqeqovypI6S3bGeJBdumylCYLjq1mOcyMjO",
    buyer: "Marta Gil",
    date: "22 Oct, 2023",
    price: "$250.00",
    status: "Cancelado",
    statusColor: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300",
    statusDot: "bg-red-500",
    },
]

const filteredData = salesData.filter((item) => item.product.toLowerCase().includes(searchTerm.toLowerCase()))

return (
    <div className="mt-2 @container">
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50">
        <table className="w-full">
        <thead className="bg-gray-50 dark:bg-background-dark">
            <tr className="text-left">
            <th className="px-4 py-3 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-2/12">
                Producto
            </th>
            <th className="px-4 py-3 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-3/12">
                Comprador
            </th>
            <th className="px-4 py-3 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-2/12">
                Fecha
            </th>
            <th className="px-4 py-3 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-2/12">
                Precio
            </th>
            <th className="px-4 py-3 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-2/12">
                Estado
            </th>
            <th className="px-4 py-3 text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal w-1/12">
                Acciones
            </th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredData.map((item) => (
            <tr key={item.id}>
                <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                <div className="flex items-center gap-3">
                    <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 h-10 flex-shrink-0"
                    style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <span className="text-gray-900 dark:text-white font-medium">{item.product}</span>
                </div>
                </td>
                <td className="h-[72px] px-4 py-2 text-gray-800 dark:text-gray-200 text-sm font-normal leading-normal">
                {item.buyer}
                </td>
                <td className="h-[72px] px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                {item.date}
                </td>
                <td className="h-[72px] px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                {item.price}
                </td>
                <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                <div
                    className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium ${item.statusColor}`}
                >
                    <span className={`size-2 rounded-full ${item.statusDot}`}></span>
                    {item.status}
                </div>
                </td>
                <td className="h-[72px] px-4 py-2 text-sm font-medium leading-normal">
                <a className="text-primary hover:underline" href="#">
                    Ver detalles
                </a>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
)
}
