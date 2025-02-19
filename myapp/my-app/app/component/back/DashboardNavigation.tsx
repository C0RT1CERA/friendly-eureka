import { link } from "fs"
import Link from "next/link"

const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Orders",
        href: "/dashboard/orders",
    },
    {
        name: "Products",
        href: "/dashboard/products",
    },
    
];

export function DashboardNavigation(){
    return (
        <>
           {navigation.map((link) => (
                <Link key={link.href} href={link.href}>
                    {link.name}
                </Link>
           ))} 
        </>
    )
}