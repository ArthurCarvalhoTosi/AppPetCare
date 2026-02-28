import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore, UserType } from '../stores/authStore'
import {
    Home,
    Calendar,
    MessageCircle,
    User,
    LogOut,
    PawPrint,
    ClipboardList,
    Users
} from 'lucide-react'

export default function MainLayout() {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const navItems = [
        { to: '/dashboard', icon: Home, label: 'Início' },
        { to: '/calendar', icon: Calendar, label: 'Calendário' },
        { to: '/visits', icon: ClipboardList, label: 'Visitas' },
        ...(user?.userType === UserType.PetOwner ? [
            { to: '/pets', icon: PawPrint, label: 'Meus Pets' },
            { to: '/caregivers', icon: Users, label: 'Cuidadores' },
        ] : []),
        { to: '/chat', icon: MessageCircle, label: 'Mensagens' },
        { to: '/profile', icon: User, label: 'Perfil' },
    ]

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <PawPrint className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display text-xl font-semibold text-gray-800">PetCare</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center text-white font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500">
                                {user?.userType === UserType.Caregiver ? 'Cuidador' : 'Tutor'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
