import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import shopImage from "../assets/screen.jpeg";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../viora-app/convex/_generated/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const products = useQuery(api.product.getRandomProducts);

    const positions = [
        "top-4 left-3",
        "top-50 right-3",
        "bottom-4 left-3",
    ];

    const navigate = useNavigate();
    const loginAdmin = useMutation(api.users.loginAdmin);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const admin = await loginAdmin({
                email,
                password,
            });

            localStorage.setItem("admin", JSON.stringify(admin));

            navigate("/", {
                replace: true,
            });
        } catch {
            setError("Email atau password salah");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-dvh items-center justify-center bg-[#92A390] p-4 sm:p-6">

            {/* Login Container */}
            <div
                className="
                    flex
                    w-full
                    max-w-md
                    overflow-hidden
                    rounded-3xl
                    bg-[#E3DFD3]
                    shadow-2xl

                    lg:max-w-2xl
                    lg:min-h-100
                    lg:flex-row
                "
            >

                {/* ========================= */}
                {/* LEFT - IMAGE */}
                {/* ========================= */}

                <div
                    className="
                        relative
                        hidden
                        overflow-hidden
                        lg:block
                        lg:w-1/2
                    "
                >

                    {/* Background */}
                    <img
                        src={shopImage}
                        alt="Viora"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/25" />

                    {/* Product Cards */}
                    {products?.slice(0, 3).map((product, index) => (
                        <ProductCard
                            key={product._id}
                            className={positions[index]}
                            title={product.name}
                            price={`Rp ${product.price.toLocaleString("id-ID")}`}
                            image={product.image}
                        />
                    ))}

                </div>


                {/* ========================= */}
                {/* RIGHT - LOGIN */}
                {/* ========================= */}

                <div
                    className="
                        flex
                        w-full
                        flex-col
                        justify-center
                        bg-[#E3DFD3]
                        px-6
                        py-10

                        sm:px-10
                        sm:py-12

                        lg:w-1/2
                        lg:px-12
                        xl:px-16
                    "
                >

                    {/* Header */}
                    <div className="mb-8 text-center">

                        {/* Logo mobile */}
                        <h1 className="text-4xl font-light tracking-widest text-[#596A56] lg:hidden">
                            Viora
                        </h1>

                        <h2 className="mt-3 text-2xl font-bold text-black sm:text-3xl">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-sm text-gray-600 sm:text-base">
                            Sign in to manage your Viora store
                        </p>

                    </div>


                    {/* Form */}
                    <div className="w-full">

                        {/* Email */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-medium">
                                Email Address
                            </label>

                            <div
                                className="
                                    flex
                                    h-12
                                    w-full
                                    items-center
                                    rounded-xl
                                    bg-white
                                    px-3
                                    shadow-sm
                                "
                            >

                                <Mail
                                    className="shrink-0 text-gray-500"
                                    size={20}
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Masukkan email"
                                    className="
                                        ml-3
                                        min-w-0
                                        flex-1
                                        bg-transparent
                                        text-sm
                                        outline-none
                                    "
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Password
                            </label>

                            <div
                                className="
                                    flex
                                    h-12
                                    w-full
                                    items-center
                                    rounded-xl
                                    bg-white
                                    px-3
                                    shadow-sm
                                "
                            >

                                <Lock
                                    className="shrink-0 text-gray-500"
                                    size={20}
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Masukkan password..."
                                    className="
                                        ml-3
                                        min-w-0
                                        flex-1
                                        bg-transparent
                                        text-sm
                                        outline-none
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="ml-2 shrink-0 text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* Error */}
                        {error && (
                            <p className="mt-3 text-center text-sm text-red-500">
                                {error}
                            </p>
                        )}


                        {/* Forgot Password */}
                        <div className="mt-3 flex justify-end">

                            <button
                                type="button"
                                className="text-xs text-red-500 hover:underline sm:text-sm"
                            >
                                Forgot Password?
                            </button>

                        </div>


                        {/* Login */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="
                                mt-7
                                h-12
                                w-full
                                rounded-xl
                                bg-[#596A56]
                                text-base
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#4d5c4a]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}


type ProductCardProps = {
    className: string;
    title: string;
    price: string;
    image: string;
};


function ProductCard({
    className,
    title,
    price,
    image,
}: ProductCardProps) {

    return (
        <div
            className={`
                absolute
                ${className}
                z-20
                w-32
                rounded-xl
                bg-white/30
                p-2
                shadow-2xl
                backdrop-blur-lg
            `}
        >

            <img
                src={image}
                alt={title}
                className="h-20 w-full rounded-lg object-cover"
            />

            <h3 className="mt-2 truncate text-xs font-semibold text-white">
                {title}
            </h3>

            <p className="text-xs text-white">
                {price}
            </p>

        </div>
    );
}