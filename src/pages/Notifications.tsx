import { Plus } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../viora-app/convex/_generated/api";
import type { Id } from "../../../../viora-app/convex/_generated/dataModel";
import NotificationRow from "../components/NotificationRows";
import AddNotificationCard from "../components/AddNotificationCard";

export default function Notification() {
    const notifications = useQuery(api.notification.getAllNotifications);

    const createDraft = useMutation(
        api.notification.createDraftNotification
    );

    const deleteNotification = useMutation(
        api.notification.deleteNotification
    );

    const [editingId, setEditingId] =
        useState<Id<"notifications"> | null>(null);

    const [showAddNotification, setShowAddNotification] = useState(false);

    const [draftId, setDraftId] = useState<
        Id<"notifications"> | null
    >(null);

    const [selectedIds, setSelectedIds] = useState<
        Id<"notifications">[]
    >([]);

    const toggleSelect = (id: Id<"notifications">) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-[#E3DFD3] p-4 sm:p-6 lg:p-10 pt-20 lg:pt-4">

            {showAddNotification && (
                <AddNotificationCard
                    id={editingId ?? draftId!}
                    onClose={() => {
                        setShowAddNotification(false);
                        setDraftId(null);
                        setEditingId(null);
                    }}
                />
            )}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="">

                    <h1 className="text-3xl font-bold">
                        Notifications
                    </h1>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={async () => {

                            const id = await createDraft();

                            setDraftId(id);

                            setShowAddNotification(true);

                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#92A390] transition hover:bg-[#7f927d]"
                    >
                        <Plus size={20} />
                    </button>

                    <button
                        onClick={async () => {

                            if (selectedIds.length === 0) return;

                            for (const id of selectedIds) {
                                await deleteNotification({ id });
                            }

                            setSelectedIds([]);

                        }}
                        className="rounded-xl bg-[#92A390] px-5 py-3 text-white transition hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>
            </div>


            <div className="space-y-4 lg:space-y-6">
                {notifications?.map((notification) => (
                    <NotificationRow
                        key={notification._id}
                        id={notification._id}
                        title={notification.title}
                        message={notification.message}
                        createdAt={notification.createdAt}

                        startDate={notification.startDate}
                        endDate={notification.endDate}

                        isSent={notification.isSent}

                        selected={selectedIds.includes(notification._id)}
                        onSelect={toggleSelect}
                        onEdit={(id) => {
                            setEditingId(id);
                            setShowAddNotification(true);
                        }}

                    />
                ))}
            </div>

        </div>
    );
}