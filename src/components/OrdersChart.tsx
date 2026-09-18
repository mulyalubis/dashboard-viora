import { useState } from "react";
import { useQuery } from "convex/react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { api } from "../../../../viora-app/convex/_generated/api";

export default function OrderChart() {
    const currentYear = new Date().getFullYear();

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const monthlyOrders = useQuery(
        api.orders.getMonthlyOrders,
        {
            year: selectedYear,
        }
    );

    const handlePreviousYear = () => {
        setSelectedYear((year) => year - 1);
    };

    const handleNextYear = () => {
        if (selectedYear < currentYear) {
            setSelectedYear((year) => year + 1);
        }
    };

    if (monthlyOrders === undefined) {
        return (
            <div className="flex h-75 items-center justify-center">
                <p className="text-gray-500">
                    Memuat data...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* HEADER */}
            <div className="mb-4 flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-semibold">
                        Jumlah Order per Bulan
                    </h2>

                    <p className="text-sm text-gray-500">
                        Jumlah pesanan yang selesai pada tahun {selectedYear}
                    </p>
                </div>

                {/* YEAR NAVIGATION */}
                <div className="flex items-center gap-2">

                    <button
                        onClick={handlePreviousYear}
                        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100"
                    >
                        ←
                    </button>

                    <span className="min-w-15 text-center font-semibold">
                        {selectedYear}
                    </span>

                    <button
                        onClick={handleNextYear}
                        disabled={selectedYear >= currentYear}
                        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        →
                    </button>

                </div>
            </div>

            {/* CHART */}
            <div className="h-75 w-full overflow-x-auto md:overflow-visible">
                <div className="h-full w-162.5 md:w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={monthlyOrders}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 5,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                allowDecimals={false}
                                width={30}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    `${value} order`,
                                    "Order",
                                ]}
                            />

                            <Line
                                type="monotone"
                                dataKey="orders"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}