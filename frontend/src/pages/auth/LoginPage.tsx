import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore, UserType } from '../../stores/authStore'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      // TODO: Integrar com API real
      // Simulando login para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user - substituir por chamada real à API
      const mockUser = {
        id: '1',
        email,
        name: 'Usuário Demo',
        userType: UserType.PetOwner,
      }
      
      login(mockUser, 'mock-jwt-token')
      navigate('/dashboard')
    } catch {
      setError('Email ou senha inválidos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
        Bem-vindo de volta
      </h2>
      <p className="text-gray-600 mb-8">
        Entre na sua conta para continuar
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
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
        
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600">Lembrar de mim</span>
          </label>
          <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Esqueci a senha
          </a>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-primary-500/25"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
      <p className="text-center mt-8 text-gray-600">
        Não tem uma conta?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
