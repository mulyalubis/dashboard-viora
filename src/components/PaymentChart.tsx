import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { useQuery } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";

export default function PaymentChart() {
    const data = useQuery(api.dashboard.getPaymentMethodStats);

    if (!data) {
        return (
            <div className="flex h-64 items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                />

                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}