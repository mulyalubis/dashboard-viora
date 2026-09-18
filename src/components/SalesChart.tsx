import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type SalesChartProps = {
    data: {
        label: string;
        sales: number;
    }[];
};

export default function SalesChart({
    data,
}: SalesChartProps) {
    return (
        <div className="w-full overflow-x-auto md:overflow-visible">
            <div className="h-80 w-162.5 md:w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 5,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="sales"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#92A390"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#92A390"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            width={45}
                            tickFormatter={(value) => {
                                if (value >= 1000000000) {
                                    return `${value / 1000000000}B`;
                                }

                                if (value >= 1000000) {
                                    return `${value / 1000000}M`;
                                }

                                if (value >= 1000) {
                                    return `${value / 1000}K`;
                                }

                                return value;
                            }}
                        />

                        <Tooltip
                            formatter={(value) =>
                                `Rp ${Number(value).toLocaleString("id-ID")}`
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#92A390"
                            fill="url(#sales)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}