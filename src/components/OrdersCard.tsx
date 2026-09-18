import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../viora-app/convex/_generated/api";
import type { Id } from "../../../../viora-app/convex/_generated/dataModel";

type Props = {
    order: {
        _id: Id<"orders">;
        globalOrderNumber: number;
        totalItems: number;
        deliveryMethod: string;
        paymentStatus: string;
        driverName?: string;
        status: string;
        createdAt: number;
    };
};

export default function OrderCard({ order }: Props) {
    const updateOrder = useAction(api.orders.updateAdminOrder);

    const [driverName, setDriverName] = useState(order.driverName ?? "");
    const [status, setStatus] = useState(order.status);
    useEffect(() => {
        setStatus(order.status);
    }, [order.status]);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);

            await updateOrder({
                id: order._id,
                driverName,
                status,
            });

            alert("Data berhasil diperbarui");
        } finally {
            setLoading(false);
        }
    };

    const statusOptions = [
        "Packaging",
        "Delivery",
        "Take In",
        "Finished",
    ];

    return (
        <>
            <div className="hidden lg:block rounded-2xl bg-[#92A390] p-5">
                <div className="grid grid-cols-5 items-start gap-5">

                    <div>
                        <h2 className="text-xl font-medium text-white">
                            Pesanan #{order.globalOrderNumber}
                        </h2>

                        <p className="mt-4 text-lg text-white">
                            {order.totalItems} Product
                        </p>

                        <p className="mt-2 text-lg text-white">
                            {order.deliveryMethod}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-white text-xl">
                            tanggal pesan
                        </p>

                        <p className="mt-4 text-white">
                            {new Date(order.createdAt).toLocaleDateString("id-ID")}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-white text-xl">
                            status pembayaran
                        </p>

                        <p
                            className={`mt-4 text-lg ${order.paymentStatus === "Sudah Bayar"
                                ? "text-blue-300"
                                : "text-red-500"
                                }`}
                        >
                            {order.paymentStatus}
                        </p>
                    </div>

                    {/* Driver */}
                    <div className="text-center">
                        <p className="text-white text-xl mb-3">
                            Nama Pengantar
                        </p>

                        <input
                            value={driverName}
                            onChange={(e) => setDriverName(e.target.value)}
                            className="w-full rounded-lg px-3 py-2 bg-white"
                        />
                    </div>

                    {/* Status */}
                    <div className="text-center">
                        <p className="text-white text-xl mb-3">
                            Status Barang
                        </p>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-lg px-3 py-2 bg-white"
                        >
                            {!statusOptions.includes(status) && (
                                <option value={status} hidden>
                                    {status}
                                </option>
                            )}

                            {statusOptions.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="mt-4 w-full rounded-lg bg-black py-2 text-white hover:bg-neutral-800"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>

                </div>
            </div>

            {/* mobile view */}
            <div className="lg:hidden rounded-2xl bg-[#92A390] p-5">

                <div className="space-y-5">

                    <div className="border-b border-white/20 pb-4">

                        <h2 className="text-xl font-bold text-white">
                            Pesanan #{order.globalOrderNumber}
                        </h2>

                        <p className="mt-2 text-white">
                            {order.totalItems} Product
                        </p>

                        <p className="text-white">
                            {order.deliveryMethod}
                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <p className="text-sm text-white/70">
                                Tanggal
                            </p>

                            <p className="font-medium text-white">
                                {new Date(order.createdAt).toLocaleDateString("id-ID")}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-white/70">
                                Pembayaran
                            </p>

                            <p
                                className={`mt-4 text-lg ${order.paymentStatus === "Sudah Bayar"
                                    ? "text-blue-300"
                                    : "text-red-500"
                                    }`}
                            >
                                {order.paymentStatus}
                            </p>
                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-white">
                            Nama Pengantar
                        </label>

                        <input
                            value={driverName}
                            onChange={(e) => setDriverName(e.target.value)}
                            className="w-full rounded-lg bg-white px-3 py-2 text-black"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-white">
                            Status Barang
                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-lg px-3 py-2 bg-white"
                        >
                            {!statusOptions.includes(status) && (
                                <option value={status} hidden>
                                    {status}
                                </option>
                            )}

                            {statusOptions.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full rounded-xl bg-black py-3 text-white"
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>

                </div>

            </div>
        </>
    );
}