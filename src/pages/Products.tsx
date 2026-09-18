import { Plus, Trash2, ChevronDown } from "lucide-react";
import ProductRow from "../components/ProductRow";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";
import { useState } from "react";
import AddProductCard from "../components/AddProductCard";
import type { Id } from "../../../../viora-app/convex/_generated/dataModel";


export default function Products() {
    const products = useQuery(api.product.getDataProducts);
    const brands = useQuery(api.product.getBrands);

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const [selectedBrand, setSelectedBrand] = useState<string>("All");
    const [showBrandMenu, setShowBrandMenu] = useState(false);

    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);

    const [selectedStatus, setSelectedStatus] =
        useState<"All" | "New" | "Old">("All");



    const filteredProducts =
        products?.filter((product) => {
            const statusMatch =
                selectedStatus === "All" ||
                product.status === selectedStatus;

            const brandMatch =
                selectedBrand === "All" ||
                product.brand === selectedBrand;

            return statusMatch && brandMatch;
        }) ?? [];

    const [selectedProducts, setSelectedProducts] = useState<Id<"products">[]>([]);

    const deleteProduct = useMutation(api.product.deleteProduct);

    const handleDelete = async () => {

        if (selectedProducts.length === 0) {
            alert("Pilih produk terlebih dahulu");
            return;
        }

        if (!confirm("Yakin ingin menghapus produk?")) {
            return;
        }

        for (const id of selectedProducts) {
            await deleteProduct({ id });
        }

        setSelectedProducts([]);
    };

    return (
        <div className="min-h-screen bg-[#E3DFD3] p-3 md:p-8 pt-20 lg:pt-4">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <h1 className="text-3xl font-bold">
                    Product
                </h1>

                <div className="flex flex-wrap gap-3">

                    <div className="flex justify-center">
                        <div className="relative">

                            <button
                                onClick={() => setShowBrandMenu(!showBrandMenu)}
                                className="flex items-center gap-2 rounded-xl bg-[#92A390] px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-lg text-white transition hover:bg-neutral-800 cursor-pointer"
                            >
                                <span>{selectedBrand}</span>

                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${showBrandMenu ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {showBrandMenu && (
                                <div className="absolute left-1/2 top-12 -translate-x-1/2 w-40 rounded-xl bg-white shadow-xl overflow-hidden z-50">

                                    <button
                                        onClick={() => {
                                            setSelectedBrand("All");
                                            setShowBrandMenu(false);
                                        }}
                                        className={`w-full px-4 py-3 text-left transition hover:bg-neutral-100 ${selectedBrand === "All"
                                                ? "bg-neutral-200 font-semibold"
                                                : ""
                                            }`}
                                    >
                                        All
                                    </button>

                                    {brands?.map((brand) => (
                                        <button
                                            key={brand}
                                            onClick={() => {
                                                setSelectedBrand(brand);
                                                setShowBrandMenu(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left transition hover:bg-neutral-100 ${selectedBrand === brand
                                                    ? "bg-neutral-200 font-semibold"
                                                    : ""
                                                }`}
                                        >
                                            {brand}
                                        </button>
                                    ))}

                                </div>
                            )}

                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative">

                            <button
                                onClick={() => setShowStatusMenu(!showStatusMenu)}
                                className="flex items-center gap-2 rounded-xl bg-[#92A390] px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-lg text-white transition hover:bg-neutral-800 cursor-pointer"
                            >
                                <span>{selectedStatus}</span>

                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${showStatusMenu ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {showStatusMenu && (
                                <div
                                    className="absolute left-1/2 top-12 -translate-x-1/2 w-32 rounded-xl bg-white shadow-xl overflow-hidden z-50"
                                >

                                    {["All", "New", "Old"].map((item) => (

                                        <button
                                            key={item}
                                            onClick={() => {
                                                setSelectedStatus(
                                                    item as "All" | "New" | "Old"
                                                );
                                                setShowStatusMenu(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left transition hover:bg-neutral-100 ${selectedStatus === item ? "bg-neutral-200 font-semibold" : ""
                                                }`}
                                        >
                                            {item}
                                        </button>

                                    ))}

                                </div>
                            )}

                        </div>
                    </div>

                    <button
                        onClick={() => setShowAddProduct(true)}
                        className="flex items-center gap-2 rounded-xl bg-[#92A390] px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-lg text-white transition hover:bg-neutral-800 cursor-pointer"
                    >
                        <Plus size={20} />
                        New
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 rounded-xl bg-[#92A390] px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-lg text-white transition hover:bg-red-600 cursor-pointer">
                        <Trash2 size={20} />
                        Delete
                    </button>

                </div>

            </div>

            {showAddProduct && (
                <AddProductCard
                    onClose={() => setShowAddProduct(false)}
                />
            )}

            {/* Container */}
            <div className="rounded-[28px] bg-[#92A390] p-4 md:p-6 xl:p-8">

                {/* Header Table */}
                <div
                    className="
                        hidden
                        xl:grid
                        mb-8
                        grid-cols-[60px_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_60px]
                        items-center
                        text-center
                        text-white
                        font-medium
                    "
                >

                    <div></div>

                    <div className="text-left">
                        Product
                    </div>

                    <div>Status</div>

                    <div>Brand</div>

                    <div>Price</div>

                    <div>Stock</div>

                    <div>Sold</div>

                    <div>Rating</div>

                    <div></div>

                </div>

                {/* Tempat Product Card */}
                <div className="space-y-6">

                    {filteredProducts?.map((product) => (

                        <ProductRow
                            key={product._id}
                            id={product._id}
                            checked={selectedProducts.includes(product._id)}

                            onCheck={(checked) => {
                                if (checked) {
                                    setSelectedProducts((prev) => [...prev, product._id]);
                                } else {
                                    setSelectedProducts((prev) =>
                                        prev.filter((id) => id !== product._id)
                                    );
                                }
                            }}
                            image={product.image}
                            name={product.name}
                            description={product.description}
                            brand={product.brand}
                            price={product.price}
                            stock={product.stock}
                            rating={product.rating}
                            status={product.status}
                            sold={product.sold ?? 0}

                            detailImage={product.detailImage}

                            expanded={expandedId === product._id}

                            onToggle={() =>
                                setExpandedId(
                                    expandedId === product._id
                                        ? null
                                        : product._id
                                )
                            }
                        />

                    ))}

                </div>

            </div>

        </div>
    );
}