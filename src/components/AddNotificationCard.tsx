import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";
import type { Id } from "../../../../viora-app/convex/_generated/dataModel";

type Props = {
    id: Id<"notifications">;
    onClose: () => void;
    isEdit?: boolean;
};

export default function AddNotificationCard({
    id,
    onClose,
}: Props) {

    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [usePeriod, setUsePeriod] = useState(false);

    if (startDate && endDate) {
        if (new Date(startDate) > new Date(endDate)) {
            alert("Tanggal mulai tidak boleh lebih besar dari tanggal berakhir.");
            return;
        }
    }

    const updateNotification = useMutation(
        api.notification.updateNotification
    );

    const notification = useQuery(
        api.notification.getNotificationById,
        { id }
    );

    const handleSave = async () => {

        try {

            setLoading(true);

            await updateNotification({
                id,
                title,
                message,
                startDate: usePeriod && startDate
                    ? new Date(startDate).getTime()
                    : undefined,

                endDate: usePeriod && endDate
                    ? new Date(endDate).getTime()
                    : undefined,
            });

            alert("Notification berhasil disimpan.");

            onClose();

        } catch (err) {

            console.error(err);
            alert("Gagal menyimpan notification.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        if (!notification) return;

        setTitle(notification.title ?? "");
        setMessage(notification.message ?? "");

        setUsePeriod(
            !!notification.startDate || !!notification.endDate
        );

        setStartDate(
            notification.startDate
                ? new Date(notification.startDate)
                    .toISOString()
                    .split("T")[0]
                : ""
        );

        setEndDate(
            notification.endDate
                ? new Date(notification.endDate)
                    .toISOString()
                    .split("T")[0]
                : ""
        );
    }, [notification]);


    useEffect(() => {
        if (!notification) {
            setTitle("");
            setMessage("");
            setStartDate("");
            setEndDate("");
        }
    }, [id]);

    return (

        <div className="mb-8 rounded-3xl bg-black p-8">

            <h2 className="mb-8 text-2xl font-bold text-white">
                {notification ? "Edit Notification" : "Add Notification"}
            </h2>

            <div className="space-y-6">

                <div>

                    <p className="mb-2 text-neutral-300">
                        Title
                    </p>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="w-full rounded-xl bg-neutral-700 px-4 py-3 text-white outline-none"
                        placeholder="Notification title..."
                    />

                </div>

                <div>

                    <p className="mb-2 text-neutral-300">
                        Message
                    </p>

                    <textarea
                        rows={6}
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        className="w-full rounded-xl bg-neutral-700 px-4 py-3 text-white outline-none resize-none"
                        placeholder="Notification message..."
                    />

                </div>

                <div className="mt-4">
                    <label className="flex items-center gap-3 text-neutral-300">
                        <input
                            type="checkbox"
                            checked={usePeriod}
                            onChange={(e) => setUsePeriod(e.target.checked)}
                        />

                        Gunakan Periode Promo
                    </label>
                </div>

                {usePeriod && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        <div>
                            <p className="mb-2 text-neutral-300">
                                Mulai Berlaku
                            </p>

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                                className="w-full rounded-xl bg-neutral-700 px-4 py-3 text-white outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-2 text-neutral-300">
                                Berakhir Pada
                            </p>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    setEndDate(e.target.value)
                                }
                                className="w-full rounded-xl bg-neutral-700 px-4 py-3 text-white outline-none"
                            />
                        </div>

                    </div>
                )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <button
                    onClick={onClose}
                    className="rounded-xl bg-neutral-700 px-6 py-3 text-white"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className=" rounded-xl bg-[#92A390] px-6 py-3 font-semibold text-white hover:bg-[#7d907a] disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : notification
                            ? "Update Notification"
                            : "Save Notification"}
                </button>

            </div>

        </div>

    );

}