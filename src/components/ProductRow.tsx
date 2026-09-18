import { MoreHorizontal, } from "lucide-react";
import { useState, useEffect } from "react";
import { uploadImage } from "../../utils/uploadImage";
import { useMutation } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";
import type { Id } from "../../../../viora-app/convex/_generated/dataModel";


type ProductRowProps = {
    id: Id<"products">;
    image: string;
    name: string;
    description: string;
    status: string;
    brand: string;
    price: number;
    stock: number;
    sold: number;
    rating: number;
    detailImage?: string;
    expanded: boolean;
    onToggle: () => void;
    checked: boolean;
    onCheck: (checked: boolean) => void;
};

export default function ProductRow({
    id,
    image,
    name,
    description,
    status,
    brand,
    price,
    stock,
    sold,
    rating,
    expanded,
    onToggle,
    detailImage,
    checked,
    onCheck,
}: ProductRowProps) {

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [detailImageFile, setDetailImageFile] = useState<File | null>(null);
    const [productImage, setProductImage] = useState(image);
    const [productDetailImage, setProductDetailImage] = useState(detailImage);

    const [productName, setProductName] = useState(name);
    const [productBrand, setProductBrand] = useState(brand);
    const [productPrice, setProductPrice] = useState(price);
    const [stockToAdd, setStockToAdd] = useState(0);
    const [productStock, setProductStock] = useState(stock);
    const [productDescription, setProductDescription] = useState(description);
    const user = JSON.parse(localStorage.getItem("admin") || "{}");

    const [loading, setLoading] = useState(false);

    const updateProduct = useMutation(
        api.product.updateProduct
    );

    const fullDescription = description ?? "";

    const shortDescription =
        fullDescription.length > 50
            ? fullDescription.substring(0, 50) + "..."
            : fullDescription;

    const addStock = useMutation(api.stock.addStock);

    useEffect(() => {
        setProductImage(image);
        setProductDetailImage(detailImage);

        setProductName(name);
        setProductBrand(brand);
        setProductPrice(price);
        setProductStock(stock);
        setProductDescription(description);
    }, [
        image,
        detailImage,
        name,
        brand,
        price,
        stock,
        description,
    ]);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);

        setImageFile(file);
        setProductImage(preview);
    };

    const handleDetailImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);

        setDetailImageFile(file);
        setProductDetailImage(preview);
    };


    const handleSave = async () => {

        try {

            setLoading(true);

            let imageUrl = image;
            let detailUrl = detailImage ?? "";

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            if (detailImageFile) {
                detailUrl = await uploadImage(detailImageFile);
            }

            await updateProduct({
                id,
                image: imageUrl,
                detailImage: detailUrl,
                name: productName,
                brand: productBrand,
                description: productDescription,
                price: productPrice,
            });

            if (stockToAdd > 0) {
                await addStock({
                    productId: id,
                    quantity: stockToAdd,
                    adminName: user?.name,
                });

                setProductStock((prev) => prev + stockToAdd);
            }

            alert("Produk berhasil diupdate");

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="
                hidden 
                xl:grid
                grid-cols-[60px_2.8fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_45px]
                items-center
                rounded-2xl
                bg-[#E3DFD3]
                px-5
                py-6
                transition
                hover:shadow-xl
            "
            >
                {/* Checkbox */}
                <div className="flex justify-center">
                    <input
                        checked={checked}
                        onChange={(e) => onCheck(e.target.checked)}
                        type="checkbox"
                        className="h-5 w-5"
                    />
                </div>

                {/* Product */}
                <div className="flex items-center gap-5">

                    <img
                        src={image}
                        alt={name}
                        className="h-20 w-20 object-contain"
                    />

                    <div>

                        <h2 className="font-semibold">
                            {name}
                        </h2>

                        <p className="text-sm text-gray-600">
                            {shortDescription}
                        </p>

                    </div>

                </div>

                {/* Status */}
                <div className="text-center font-medium">
                    {status}
                </div>

                {/* Brand */}
                <div className="text-center font-medium">
                    {brand}
                </div>

                {/* Price */}
                <div className="text-center font-medium">
                    Rp {price.toLocaleString("id-ID")}
                </div>

                {/* Stock */}
                <div className="text-center w-10 ml-7">
                    {stock} In Stock
                </div>

                {/* Sold */}
                <div className="text-center">
                    {sold}
                </div>

                {/* Rating */}
                <div className="text-center">
                    {rating}/5
                </div>

                {/* Action */}
                <div className="flex justify-end">

                    <button onClick={onToggle} className=" cursor-pointer">
                        <MoreHorizontal size={18} />
                    </button>

                </div>

            </div>

            <div className="xl:hidden rounded-2xl bg-[#E3DFD3] p-5 shadow-md">

                <div className="flex flex-col gap-4 sm:flex-row">

                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onCheck(e.target.checked)}
                        className="mt-2 h-5 w-5"
                    />

                    <img
                        src={image}
                        alt={name}
                        className="h-24 w-24 rounded-xl object-contain bg-white"
                    />

                    <div className="flex-1">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                            <h2 className="text-lg font-semibold">
                                {name}
                            </h2>

                            <button onClick={onToggle}>
                                <MoreHorizontal size={20} />
                            </button>

                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            {shortDescription}
                        </p>

                    </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-y-3 text-sm">

                    <div>
                        <span className="text-gray-500">Status</span>
                        <p className="font-medium">{status}</p>
                    </div>

                    <div>
                        <span className="text-gray-500">Brand</span>
                        <p className="font-medium">{brand}</p>
                    </div>

                    <div>
                        <span className="text-gray-500">Price</span>
                        <p className="font-medium">
                            Rp {price.toLocaleString("id-ID")}
                        </p>
                    </div>

                    <div>
                        <span className="text-gray-500">Stock</span>
                        <p className="font-medium">
                            {stock} pcs
                        </p>
                    </div>

                    <div>
                        <span className="text-gray-500">Sold</span>
                        <p className="font-medium">
                            {sold}
                        </p>
                    </div>

                    <div>
                        <span className="text-gray-500">Rating</span>
                        <p className="font-medium">
                            ⭐ {rating}/5
                        </p>
                    </div>

                </div>

            </div>

            {
                expanded && (
                    <div className="mt-4 rounded-3xl bg-[#ECECEC] p-6">

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                            <img
                                src={productImage}
                                className="w-full max-w-xs h-56 object-cover rounded-xl justify-self-center"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border-2 border-black"
                            />

                            <img
                                src={productDetailImage}
                                className="w-full max-w-xs h-56 object-cover rounded-xl justify-self-center"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleDetailImageChange}
                                className="border-2 border-black"
                            />

                            <div className="space-y-4 text-white">

                                <div>
                                    <p className="text-neutral-400">
                                        Nama Produk
                                    </p>

                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        className="w-full rounded-lg bg-neutral-800 px-4 py-2 mt-2"
                                    />
                                </div>

                                <div>
                                    <p className="text-neutral-400">
                                        Brand
                                    </p>

                                    <input
                                        type="text"
                                        value={productBrand}
                                        onChange={(e) => setProductBrand(e.target.value)}
                                        className="w-full rounded-lg bg-neutral-800 px-4 py-2 mt-2"
                                    />
                                </div>

                                <div>
                                    <p className="text-neutral-400">
                                        Harga
                                    </p>

                                    <input
                                        type="text"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(Number(e.target.value))}
                                        className="w-full rounded-lg bg-neutral-800 px-4 py-2 mt-2"
                                    />
                                </div>

                                <div>
                                    <p className="text-neutral-400">
                                        Stock
                                    </p>

                                    <div>
                                        <p className="text-neutral-400">
                                            Stock Saat Ini
                                        </p>

                                        <div className="mt-2 rounded-lg bg-neutral-800 px-4 py-2">
                                            {productStock} pcs
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-neutral-400">
                                            Tambah Stock
                                        </p>

                                        <input
                                            type="number"
                                            min={0}
                                            value={stockToAdd}
                                            onChange={(e) =>
                                                setStockToAdd(Number(e.target.value))
                                            }
                                            className="w-full rounded-lg bg-neutral-800 px-4 py-2 mt-2"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-neutral-400">
                                            Stock Setelah Ditambah
                                        </p>

                                        <div className="mt-2 rounded-lg bg-neutral-800 px-4 py-2">
                                            {productStock + stockToAdd} pcs
                                        </div>
                                    </div>
                                </div>

                                <div className="text-black">
                                    <p className="text-neutral-400">
                                        Sold
                                    </p>

                                    <p>{sold}</p>
                                </div>

                                <div>
                                    <p className="text-neutral-400">
                                        Deskripsi
                                    </p>

                                    <textarea
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        className="w-full rounded-lg bg-neutral-400 px-4 py-2 mt-2"
                                    />
                                </div>

                            </div>

                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="mt-6 w-full rounded-xl bg-white py-4 font-semibold xl:col-span-2"
                            >
                                {loading ? "Menyimpan..." : "Simpan"}
                            </button>

                        </div>

                    </div>
                )
            }

        </>
    )
}