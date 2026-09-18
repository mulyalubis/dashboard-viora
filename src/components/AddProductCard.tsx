import { useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";
import { uploadImage } from "../../utils/uploadImage";

type Props = {
    onClose: () => void;
};

export default function AddProductCard({
    onClose,
}: Props) {

    const [imagePreview, setImagePreview] = useState<string>();
    const [detailPreview, setDetailPreview] = useState<string>();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [detailFile, setDetailFile] = useState<File | null>(null);

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");

    const createProduct = useMutation(api.product.createProduct);

    const [loading, setLoading] = useState(false);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDetailImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setDetailFile(file);
        setDetailPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        try {
            if (!imageFile || !detailFile) {
                alert("Silakan pilih kedua gambar.");
                return;
            }

            if (
                !name.trim() ||
                !brand.trim() ||
                !description.trim() ||
                price <= 0 ||
                stock < 0
            ) {
                alert("Semua data harus diisi.");
                return;
            }

            setLoading(true);

            // Upload ke Cloudinary
            const imageUrl = await uploadImage(imageFile);
            const detailImageUrl = await uploadImage(detailFile);

            // Simpan ke Convex
            await createProduct({
                name: name.trim(),
                brand: brand.trim(),
                description: description.trim(),
                price,
                stock,
                sold: 0,
                image: imageUrl,
                detailImage: detailImageUrl,
            });

            alert("Product berhasil ditambahkan.");

            // Reset Form
            setImageFile(null);
            setDetailFile(null);

            setImagePreview(undefined);
            setDetailPreview(undefined);

            setName("");
            setBrand("");
            setPrice(0);
            setStock(0);
            setDescription("");

            onClose();

        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan product.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="mb-8 rounded-3xl bg-[#92A390] p-8 text-white">

            <div className="mb-8 flex items-center justify-between gap-4">

                <h2 className="text-3xl font-bold">
                    Add Product
                </h2>

                <button
                    onClick={onClose}
                    className="rounded-lg p-2 hover:bg-neutral-800"
                >
                    <X size={22} />
                </button>

            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                {/* LEFT */}

                <div className="space-y-6">

                    <div>

                        <p className="mb-2 font-semibold">
                            Product Image
                        </p>

                        <div className="flex h-64 items-center justify-center rounded-2xl bg-neutral-800">

                            {
                                imagePreview ?

                                    <img
                                        src={imagePreview}
                                        className="h-full w-full rounded-2xl object-cover"
                                    />

                                    :

                                    <span className="text-neutral-500">
                                        No Image
                                    </span>

                            }

                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="mt-3 cursor-pointer"
                        />

                    </div>

                    <div>

                        <p className="mb-2 font-semibold">
                            Detail Image
                        </p>

                        <div className="flex h-64 items-center justify-center rounded-2xl bg-neutral-800">

                            {
                                detailPreview ?

                                    <img
                                        src={detailPreview}
                                        className="h-full w-full rounded-2xl object-cover"
                                    />

                                    :

                                    <span className="text-neutral-500">
                                        No Image
                                    </span>

                            }

                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleDetailImage}
                            className="mt-3 cursor-pointer"
                        />

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-5">

                    <div>

                        <label className="mb-2 block">
                            Product Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full rounded-xl bg-neutral-800 px-4 py-3 outline-none"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block">
                            Brand
                        </label>

                        <input
                            value={brand}
                            onChange={(e) =>
                                setBrand(e.target.value)
                            }
                            className="w-full rounded-xl bg-neutral-800 px-4 py-3 outline-none"
                        />

                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>

                            <label className="mb-2 block">
                                Price
                            </label>

                            <input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(Number(e.target.value))
                                }
                                className="w-full rounded-xl bg-neutral-800 px-4 py-3 outline-none"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block">
                                Stock
                            </label>

                            <input
                                type="number"
                                value={stock}
                                onChange={(e) =>
                                    setStock(Number(e.target.value))
                                }
                                className="w-full rounded-xl bg-neutral-800 px-4 py-3 outline-none"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            className="w-full rounded-xl bg-neutral-800 px-4 py-3 outline-none"
                        />

                    </div>

                    <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-end">

                        <button
                            onClick={onClose}
                            className="w-full rounded-xl bg-neutral-700 px-6 py-3 sm:w-auto"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black sm:w-auto"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}