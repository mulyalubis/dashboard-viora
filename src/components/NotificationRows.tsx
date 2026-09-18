import type { Id } from "../../../../viora-app/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";

type NotificationRowProps = {
    id: Id<"notifications">;
    title?: string;
    message: string;
    createdAt: number;

    startDate?: number;
    endDate?: number;

    isSent: boolean;

    selected: boolean;
    onSelect: (id: Id<"notifications">) => void;
    onEdit: (id: Id<"notifications">) => void;
};

export default function NotificationRow({
    id,
    title,
    message,
    createdAt,
    startDate,
    endDate,
    selected,
    isSent,
    onSelect,
    onEdit,
}: NotificationRowProps) {

    const sendNotification = useMutation(
        api.notification.sendNotification
    );

    const now = Date.now();

    let status = "Active";

    if (startDate && now < startDate) {
        status = "Scheduled";
    }

    if (endDate && now > endDate) {
        status = "Expired";
    }

    const statusColor =
        status === "Active"
            ? "bg-green-600"
            : status === "Scheduled"
                ? "bg-yellow-500 text-black"
                : "bg-red-600";

    return (
        <div className="rounded-2xl bg-[#92A390] p-4 sm:p-5 shadow-lg text-white">

            <div className="flex gap-4">

                {/* Checkbox */}
                <div className="shrink-0 pt-1">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onSelect(id)}
                        className="h-5 w-5"
                    />
                </div>

                <div className="flex-1">

                    {/* Header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                            <p className="text-sm text-white/80">
                                {new Date(createdAt).toLocaleTimeString(
                                    "id-ID",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </p>

                            {title && (
                                <h2 className="mt-2 text-xl font-bold">
                                    {title}
                                </h2>
                            )}

                        </div>

                        <span
                            className={`rounded-full px-3 py-1 text-sm font-medium self-start ${statusColor}`}
                        >
                            {status}
                        </span>

                    </div>

                    {/* Message */}

                    <p className="mt-4 wrap-anywhere leading-7 text-white/95">
                        {message}
                    </p>

                    {/* Promo Date */}

                    {(startDate || endDate) && (

                        <div className="mt-5 rounded-xl bg-white/10 p-3">

                            <p className="font-semibold">
                                Periode Promo
                            </p>

                            {startDate && (
                                <p className="mt-1 text-sm text-white/80">
                                    Mulai :
                                    {" "}
                                    {new Date(startDate).toLocaleDateString("id-ID")}
                                </p>
                            )}

                            {endDate && (
                                <p className="text-sm text-white/80">
                                    Berakhir :
                                    {" "}
                                    {new Date(endDate).toLocaleDateString("id-ID")}
                                </p>
                            )}

                        </div>

                    )}

                    {/* Footer */}

                    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <p className="text-sm text-white/70">
                            Dibuat pada{" "}
                            {new Date(createdAt).toLocaleDateString(
                                "id-ID",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </p>

                        <div className="flex flex-col gap-2 sm:flex-row">

                            <button
                                onClick={() => onEdit(id)}
                                className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 sm:w-auto"
                            >
                                Edit
                            </button>

                            <button
                                disabled={isSent}
                                onClick={async () => {
                                    await sendNotification({
                                        id,
                                    });
                                }}
                                className={`w-full rounded-lg px-5 py-2 text-white transition sm:w-auto ${isSent
                                    ? "cursor-not-allowed bg-gray-500"
                                    : "bg-black hover:bg-neutral-800"
                                    }`}
                            >
                                {isSent
                                    ? "Sudah Terkirim"
                                    : "Kirim"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}