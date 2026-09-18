import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ChartArea,
    Package,
    ShoppingBag,
    Bell,
    LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/login", { replace: true });
    };
    return (
        <aside
            className="hidden lg:flex group min-h-dvh w-20 hover:w-64 flex-col bg-black text-white transition-all duration-300 overflow-hidden"
        >
            {/* Logo */}
            <div className="flex h-20 items-center justify-center border-b border-white/10">
                <h1 className="text-3xl font-light tracking-widest whitespace-nowrap">
                    <span className="group-hover:hidden">V</span>

                    <span className="hidden group-hover:block">
                        Viora
                    </span>
                </h1>
            </div>

            {/* Menu */}
            <nav className="mt-6 flex-1 px-3">
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <NavLink
                            key={menu.name}
                            to={menu.path}
                            end={menu.path === "/"}
                            className={({ isActive }) =>
                                `mb-2 flex h-12 items-center rounded-xl transition-all duration-300
                                ${isActive
                                    ? "bg-[#A7B39A] text-black"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <div className="flex pl-4 w-20 justify-center ">
                                <Icon size={22} />
                            </div>

                            <span
                                className="
                                whitespace-nowrap
                                opacity-0
                                group-hover:opacity-100
                                transition-all
                                duration-300"
                            >
                                {menu.name}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-white/10 p-3">
                <button
                    onClick={handleLogout}
                    className="flex h-12 w-full items-center rounded-xl text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                    <div className="flex pl-4 w-20 justify-center">
                        <LogOut size={22} />
                    </div>

                    <span
                        className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
}