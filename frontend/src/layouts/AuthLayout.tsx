import { Outlet, Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react'

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 border-4 border-white rounded-full"></div>
                    <div className="absolute bottom-32 right-16 w-64 h-64 border-4 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <div className="animate-float">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8">
                            <PawPrint className="w-14 h-14 text-white" />
                        </div>
                    </div>

                    <h1 className="font-display text-5xl font-bold mb-4 text-center">
                        PetCare
                    </h1>
                    <p className="text-xl text-white/80 text-center max-w-md">
                        Conectando tutores e cuidadores para o melhor cuidado do seu pet
                    </p>

                    <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold">500+</div>
                            <div className="text-white/70 text-sm">Cuidadores</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">2k+</div>
                            <div className="text-white/70 text-sm">Pets felizes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">4.9</div>
                            <div className="text-white/70 text-sm">Avaliação</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link to="/" className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <PawPrint className="w-7 h-7 text-white" />
                        </div>
                        <span className="font-display text-2xl font-semibold text-gray-800">PetCare</span>
                    </Link>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}
