import {
    ShoppingBag,
    Van,
    Star,
    Download,
} from "lucide-react";

import PaymentChart from "../components/PaymentChart";
import TopSellingBrands from "../components/TopSellingBrands";
import { useQuery } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";
import { useState } from "react";
import SalesChart from "../components/SalesChart";

export default function SalesAnalytics() {

    const totalOrders = useQuery(
        api.dashboard.getTotalOrders
    );

    const averageRating = useQuery(
        api.dashboard.getAverageRating
    );

    const totalDelivery = useQuery(
        api.dashboard.getTotalDelivery
    );

    const salesReport = useQuery(
        api.orders.getSalesReport
    );

    const handlePrint = () => {
        window.print();
    };

    type Period = "day" | "week" | "month" | "year";
    const [period, setPeriod] = useState<Period>("month");

    const salesData = useQuery(
        api.orders.getSalesChart,
        {
            period,
        }
    );

    const totalRevenue = useQuery(
        api.orders.getTotalRevenue
    );

    const totalProductsSold = useQuery(
        api.orders.getTotalProductsSold
    );

    const monthlyComparison = useQuery(
        api.dashboard.getDashboardMonthlyComparison
    );

    return (
        <div className="p-8 bg-[#E3DFD3] min-h-screen pt-20 lg:pt-4">

            {/* Header */}

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Sales Analytics
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Monitor sales performance and store insights.
                    </p>

                </div>

                <button className="flex items-center gap-2 rounded-xl bg-[#92A390] px-5 py-3 text-white transition hover:bg-[#7A8A78]" onClick={handlePrint}>

                    <Download size={18} />

                    Export Report

                </button>

            </div>

            {/* Summary */}

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">

                    <StatCard
                        icon={<ShoppingBag size={18} />}
                        title="Total Orders"
                        value={totalOrders?.toString() ?? "0"}
                        description={`+${monthlyComparison?.orders.current ?? 0} order bulan ini`}
                    />

                    <StatCard
                        icon={<Star size={18} />}
                        title="Total Rating"
                        value={averageRating?.toString() ?? "0"}
                        description="Rata-rata rating seluruh ulasan"
                    />

                    <StatCard
                        icon={<Van size={18} />}
                        title="Total Delivery"
                        value={totalDelivery?.toString() ?? "0"}
                        description={`+${monthlyComparison?.delivery.current ?? 0} delivery bulan ini`}
                    />

                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm h-full">
                    <h2 className="text-xl font-semibold mb-5">
                        Payment Method
                    </h2>

                    <PaymentChart />
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm h-full">
                    <h2 className="text-xl font-semibold mb-5">
                        Top Selling Brands
                    </h2>

                    <TopSellingBrands />
                </div>
            </div>


            {/* Chart */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-xl font-semibold">
                            Sales Overview
                        </h2>

                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Revenue
                                </p>

                                <h3 className="text-2xl font-bold text-[#596A56]">
                                    Rp {totalRevenue?.toLocaleString("id-ID") ?? "0"}
                                </h3>
                            </div>

                            <div className="hidden h-10 w-px bg-gray-300 sm:block" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Products Sold
                                </p>

                                <h3 className="text-2xl font-bold text-[#596A56]">
                                    {totalProductsSold ?? 0}
                                </h3>
                            </div>

                        </div>

                    </div>

                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as Period)}
                        className="w-full rounded-xl border border-gray-300 bg-[#92A390] px-4 py-2 text-white sm:w-48"
                    >
                        <option value="day">Today</option>
                        <option value="week">Weekly</option>
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                    </select>

                </div>

                <div className="h-75 sm:h-95 lg:h-105">
                    <SalesChart data={salesData ?? []} />
                </div>

            </div>

            <div className="print-report">
                <div className="report-header">
                    <h1>VIORA SALES REPORT</h1>

                    <p>
                        Laporan Penjualan
                    </p>

                    <p>
                        Dicetak:{" "}
                        {new Date().toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                {/* Ringkasan */}
                <div className="report-summary">

                    <div>
                        <span>Total Pendapatan</span>
                        <strong>
                            Rp{" "}
                            {salesReport?.totalRevenue?.toLocaleString(
                                "id-ID"
                            ) ?? "0"}
                        </strong>
                    </div>

                    <div>
                        <span>Total Order</span>
                        <strong>
                            {salesReport?.totalOrders ?? 0}
                        </strong>
                    </div>

                    <div>
                        <span>Produk Terjual</span>
                        <strong>
                            {salesReport?.totalProductsSold ?? 0}
                        </strong>
                    </div>

                </div>

                {/* Produk */}
                <h2>Detail Produk</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Produk</th>
                            <th>Brand</th>
                            <th>Harga</th>
                            <th>Terjual</th>
                            <th>Sisa Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {salesReport?.products.map((product) => (
                            <tr key={`${product.name}-${product.brand}`}>
                                <td>{product.name}</td>

                                <td>{product.brand}</td>

                                <td>
                                    Rp{" "}
                                    {product.price.toLocaleString(
                                        "id-ID"
                                    )}
                                </td>

                                <td>{product.sold}</td>

                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Payment */}
                <h2>Payment Method</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Payment Type</th>
                            <th>Jumlah Order</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(
                            salesReport?.paymentTypes ?? {}
                        ).map(([type, count]) => (
                            <tr key={type}>
                                <td>{type}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div >
    );
}

type StatCardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
    description: string;
};

function StatCard({
    icon,
    title,
    value,
    description,
}: StatCardProps) {

    return (
        <div className="rounded-2xl bg-white p-2 shadow-sm">

            <div className="flex items-start justify-between">

                <div className="rounded-xl bg-[#92A390]/15 p-2 text-[#596A56]">
                    {icon}
                </div>

                <div className="text-center">

                    <h3 className="text-sm text-gray-500">
                        {title}
                    </h3>

                    <h1 className="mt-1 text-md font-bold">
                        {value}
                    </h1>

                </div>

            </div>

            <span
                className="mt-2 inline-block text-sm font-semibold text-[#596A56]"
            >
                {description}
            </span>

            <p className="mt-2 text-xs text-gray-400">
                Informasi bulan ini
            </p>

        </div>
    );
}