import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../viora-app/convex/_generated/api";
import OrderCard from "../components/OrdersCard";

export default function Orders() {
    const orders = useQuery(
        api.orders.getAllOrdersForAdmin
    );

    const [searchOrder, setSearchOrder] = useState("");

    const filteredOrders = orders?.filter((order) => {
        if (!searchOrder) return true;

        return order.globalOrderNumber.toString() === searchOrder;
    });

    return (
        <div className="min-h-screen bg-[#E3DFD3] p-4 sm:p-6 lg:p-10 pt-20 lg:pt-4">

            <div className="space-y-5">

                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <h1 className="text-3xl font-bold">
                        Orders
                    </h1>

                    <div className="flex items-center gap-4">

                        {/* Search nomor order */}
                        <div className="flex items-center rounded-xl bg-white px-4 py-2">
                            <span className="text-gray-500 mr-1">
                                #
                            </span>

                            <input
                                type="number"
                                min="1"
                                value={searchOrder}
                                onChange={(e) =>
                                    setSearchOrder(e.target.value)
                                }
                                placeholder="Nomor order ..."
                                className="w-32 bg-transparent outline-none"
                            />
                        </div>

                        <p className="text-base text-gray-500">
                            Total Orders: {filteredOrders?.length ?? 0}
                        </p>

                    </div>

                </div>

                {/* Orders */}
                <div className="space-y-5">

                    {filteredOrders?.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={{
                                ...order,
                                createdAt: order._creationTime,
                            }}
                        />
                    ))}

                    {orders !== undefined &&
                        filteredOrders?.length === 0 && (
                            <div className="py-10 text-center text-gray-500">
                                Order #{searchOrder} tidak ditemukan.
                            </div>
                        )}

                </div>

            </div>

        </div>
    );
}