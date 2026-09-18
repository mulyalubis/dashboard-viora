import { useQuery } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";

export default function TopSellingBrands() {

    const brands = useQuery(
        api.dashboard.getTopSellingBrands
    );

    if (!brands) {
        return (
            <div className="flex h-60 items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {brands.map((brand, index) => (

                <div
                    key={brand.name}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                >
                    <div className="flex items-center gap-3">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#92A390] text-lg font-bold text-white">
                            {index + 1}
                        </div>

                        <div>

                            <h3 className="font-semibold">
                                {brand.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {brand.sold} sold
                            </p>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}