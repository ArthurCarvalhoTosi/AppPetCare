import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore, UserType } from '../../stores/authStore'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'

export default function RegisterPage() {
  const [searchParams] = useSearchParams()
  const isCaregiver = searchParams.get('type') === 'caregiver'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: isCaregiver ? UserType.Caregiver : UserType.PetOwner,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUserTypeChange = (type: UserType) => {
    setFormData({ ...formData, userType: type })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    
    setIsLoading(true)
    
    try {
      // TODO: Integrar com API real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: '1',
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        userType: formData.userType,
      }
      
      login(mockUser, 'mock-jwt-token')
      navigate('/dashboard')
    } catch {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
        Criar conta
      </h2>
      <p className="text-gray-600 mb-6">
        Preencha os dados para começar
      </p>
      
      {/* User Type Selector */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleUserTypeChange(UserType.PetOwner)}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            formData.userType === UserType.PetOwner
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Sou Tutor
        </button>
        <button
          type="button"
          onClick={() => handleUserTypeChange(UserType.Caregiver)}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            formData.userType === UserType.Caregiver
              ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Sou Cuidador
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar senha
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
              minLength={6}
            />
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-colors shadow-lg ${
              formData.userType === UserType.Caregiver
                ? 'bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-300 shadow-secondary-500/25'
                : 'bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 shadow-primary-500/25'
            } text-white`}
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </div>
      </form>
      
      <p className="text-center mt-6 text-gray-600">
        Já tem uma conta?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Entrar
        </Link>
      </p>
    </div>
  )
}
