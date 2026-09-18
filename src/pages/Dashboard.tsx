import { DollarSign, CircleUser, Package, } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";
import SalesChart from "../components/SalesChart";
import OrderChart from "../components/OrdersChart";
import { useState } from "react";

export default function Dashboard() {

    const totalUsers = useQuery(
        api.dashboard.getTotalUsers
    );

    const monthlyUsers = useQuery(
        api.dashboard.getMonthlyUserComparison
    );
    const notifications = useQuery(api.notification.getAllNotifications);
    const brandData = useQuery(api.product.getBrandProductCount);
    const finishedOrders = useQuery(api.orders.getFinishedOrders);
    const totalRevenue = useQuery(api.orders.getTotalRevenue);
    const totalProductsSold = useQuery(api.orders.getTotalProductsSold);

    type Period = "day" | "week" | "month" | "year";
    const [period, setPeriod] = useState<Period>("month");

    const salesData = useQuery(
        api.orders.getSalesChart,
        {
            period,
        }
    );

    const monthlyComparison = useQuery(
        api.dashboard.getMonthlyComparison
    );


    const admin = JSON.parse(localStorage.getItem("admin") || "{}");

    return (
        <div className="flex-1 min-h-screen bg-[#E3DFD3] p-4 pt-22 sm:p-6 lg:p-8 lg:pt-4">

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Hello Admin 👋
                    </h1>

                    <p className="text-gray-500 mt-1 capitalize">
                        Awali hari dengan penjualan hari ini dan beberapa informasi lainnya.
                    </p>
                </div>

                <div className="flex w-full items-center gap-4 rounded-2xl bg-white px-5 py-3 shadow lg:w-auto">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92A390] text-white font-semibold text-lg">
                        {admin.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <p className="font-semibold">
                            {admin.name}
                        </p>

                        <p className="text-xs text-gray-500">
                            {admin.email}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 rounded-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 rounded-xl bg-[#92A390] p-3 xl:col-span-5">
                    <Card
                        icon={
                            <DollarSign className="w-5 h-5" />
                        }
                        title="Pendapatan / Bln"
                        value={`Rp ${(totalRevenue ?? 0).toLocaleString("id-ID")}`}
                        description={`Rp ${(monthlyComparison?.revenue.previous ?? 0).toLocaleString("id-ID")} bulan sebelumnya`}
                    />

                    <Card
                        icon={<CircleUser className="w-5 h-5" />}
                        title="Total Pengguna"
                        value={totalUsers?.toString() ?? "0"}
                        description={`+${monthlyUsers?.current ?? 0} pengguna bulan ini`}
                    />

                    <Card
                        icon={
                            <Package className="w-5 h-5" />
                        }
                        title="Produk Terjual / Bln"
                        value={totalProductsSold?.toString() ?? "0"}
                        description={`${monthlyComparison?.productsSold.previous ?? 0} produk bulan sebelumnya`}
                    />
                </div>
                <div className="bg-[#92A390] rounded-2xl xl:col-span-4 h-[42vh] p-4 flex flex-col">

                    <h2 className="text-lg font-semibold text-white text-center mb-1 shrink-0">
                        Order Finished
                    </h2>

                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {finishedOrders?.map((order) => (
                            <DeliveryCard
                                key={order._id}
                                orderId={order.globalOrderNumber?.toString() ?? "-"}
                                address={order.address}
                                customer={order.receiverName}
                                totalProduct={order.totalItems}
                                date={formatDate(order.createdAt)}
                                status={order.status}
                            />
                        ))}
                    </div>

                </div>

                <div className="rounded-2xl bg-[#92a390] text-white p-4 xl:col-span-3 h-[42vh] flex flex-col">

                    <h2 className="text-lg font-semibold text-center mb-4 shrink-0">
                        Notifications
                    </h2>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin">

                        {notifications?.map((item) => (
                            <NotificationItem
                                key={item._id}
                                title={item.title}
                                message={item.message}
                                time={formatDate(item.createdAt)}
                            />
                        ))}

                    </div>

                </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                <OrderChart />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

                <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">
                            Sales Overview
                        </h2>

                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value as Period)}
                            className="rounded-lg border px-3 py-2 bg-[#92A390] text-white"
                        >
                            <option value="day">Today</option>
                            <option value="week">Weekly</option>
                            <option value="month">Monthly</option>
                            <option value="year">Yearly</option>
                        </select>
                    </div>

                    <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-gray-300">
                        <SalesChart data={salesData ?? []} />
                    </div>

                </div>

                <div className="rounded-2xl bg-[#92A390] text-white p-6 flex flex-col items-center h-100">

                    <h2 className="text-lg font-semibold mb-5 shrink-0">
                        Brand and Total Product
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 overflow-y-auto scrollbar-thumb-[#E3DFD3] w-full">

                        {brandData?.map((item) => (
                            <BrandItems
                                key={item.brand}
                                brand={item.brand}
                                totalProducts={item.totalProducts}
                            />
                        ))}

                    </div>

                </div>


            </div>

        </div>
    );
}

type CardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
    percent?: string;
    description?: string;
};

function Card({ icon, title, value, percent, description }: CardProps) {
    return (
        <div className="flex justify-between h-full min-h-42.5 flex-col rounded-xl bg-white p-4 relative">
            <div className="mb-4 flex justify-end">
                {icon}
            </div>

            <h2 className="text-sm font-medium text-black">
                {value}
            </h2>

            <p className="text-gray-700 text-sm">
                {title}
            </p>

            {percent && (
                <p className="text-sm text-gray-500">
                    {percent}
                </p>
            )}

            {description && (
                <p className="text-sm text-gray-500 mt-8">
                    {description}
                </p>
            )}
        </div>
    );
}

function NotificationItem({ title, message, time, }: { title: string; message: string; time: string; }) {
    return (
        <div className="rounded-xl bg-white/10 p-3">

            <h3 className="font-medium mb-1">
                {title}
            </h3>

            <h3 className="font-xs text-xs">
                {message}
            </h3>

            <p className="text-sm text-gray-400">
                {time}
            </p>

        </div>
    );
}

function BrandItems({ brand, totalProducts, }: { brand: string; totalProducts: number; }) {
    return (
        <div className="flex items-center justify-between gap-2 rounded-xl bg-white/10 p-3 text-xs">

            <span className="truncate">{brand}</span>

            <span className="font-semibold text-white">
                {totalProducts}
            </span>

        </div>
    );
}

type DeliveryCardProps = {
    orderId: string;
    address: string;
    customer: string;
    totalProduct: number;
    date: string;
    status: string;
};

function DeliveryCard({ orderId, address, customer, totalProduct, date, status, }: DeliveryCardProps) {
    return (
        <div className="bg-[#E3DFD3] text-black rounded-xl p-4 m-3">

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">

                <div>
                    <h3 className="font-semibold text-sm">
                        Order #{orderId}
                    </h3>

                    <p className="text-xs mt-2">
                        {address}
                    </p>

                    <p className="text-xs my-2">
                        {customer}
                    </p>
                </div>

                <span className="text-blue-700 text-sm">
                    {status}
                </span>

            </div>

            <hr className="my-3 border-white/40" />

            <div className="flex justify-between text-sm">

                <span>{totalProduct} Product</span>

                <span>{date}</span>

            </div>

        </div>
    );
}

function formatDate(time: number) {
    return new Date(time).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}