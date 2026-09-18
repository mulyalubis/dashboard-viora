import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    ChartArea,
    Package,
    ShoppingBag,
    Bell,
    LogOut,
    Menu,
    X,
} from "lucide-react";

const menus = [
    {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Sales Analytics",
        path: "/SalesAnalytics",
        icon: ChartArea,
    },
    {
        name: "Products",
        path: "/products",
        icon: Package,
    },
    {
        name: "Orders",
        path: "/orders",
        icon: ShoppingBag,
    },
    {
        name: "Notifications",
        path: "/notifications",
        icon: Bell,
    },
];

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/login", { replace: true });
    };

    return (
        <>
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-[#92a390] px-5 text-black lg:hidden">

                <h1 className="text-2xl font-light">
                    Viora
                </h1>

                <button
                    onClick={() => setOpen(true)}
                >
                    <Menu size={28} />
                </button>

            </div>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50"
                />
            )}

            {/* Drawer */}
            <aside
                className={`
                    fixed
                    top-0
                    left-0
                    z-50
                    h-dvh
                    w-72
                    bg-black
                    text-white
                    transition-transform
                    duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex items-center justify-between border-b border-white/10 p-5">

                    <h1 className="text-3xl font-light">
                        Viora
                    </h1>

                    <button
                        onClick={() => setOpen(false)}
                    >
                        <X size={24} />
                    </button>

                </div>

                <nav className="mt-6 px-4">

                    {menus.map((menu) => {

                        const Icon = menu.icon;

                        return (
                            <NavLink
                                key={menu.name}
                                to={menu.path}
                                onClick={() => setOpen(false)}
                                end={menu.path === "/"}
                                className={({ isActive }) =>
                                    `mb-3 flex items-center gap-4 rounded-xl px-4 py-3 transition
                                    ${isActive
                                        ? "bg-[#A7B39A] text-black"
                                        : "hover:bg-white/10"
                                    }`
                                }
                            >
                                <Icon size={22} />
                                {menu.name}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full border-t border-white/10 p-4">

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3 hover:bg-red-500"
                    >
                        <LogOut size={22} />
                        Logout
                    </button>

                </div>
            </aside>
        </>
    );
}