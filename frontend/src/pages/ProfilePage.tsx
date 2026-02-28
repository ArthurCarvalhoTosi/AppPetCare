import { useState } from 'react'
import { useAuthStore, UserType } from '../stores/authStore'
import { Camera, Save, MapPin, Star, Clock } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore()
  const isCaregiver = user?.userType === UserType.Caregiver

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: '',
    hourlyRate: 50,
    serviceArea: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Enviar para API
    updateUser({ name: formData.name, phone: formData.phone })
    alert('Perfil atualizado!')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-display text-3xl font-bold text-gray-900">
        Meu Perfil
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-gray-900">
                {user?.name}
              </h2>
              <p className="text-gray-500">
                {isCaregiver ? 'Cuidador de Pets' : 'Tutor de Pets'}
              </p>
              {isCaregiver && (
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">32 visitas</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-display text-lg font-semibold text-gray-900">
            Informações Básicas
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Caregiver Specific */}
        {isCaregiver && (
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display text-lg font-semibold text-gray-900">
              Perfil de Cuidador
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sobre você
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Conte um pouco sobre sua experiência com pets..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor por hora (R$)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  min={0}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área de atendimento
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleChange}
                    placeholder="Ex: Zona Sul - São Paulo"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipos de pets que aceita
              </label>
              <div className="flex flex-wrap gap-2">
                {['Cachorro', 'Gato', 'Pássaro', 'Peixe', 'Roedor', 'Réptil'].map((pet) => (
                  <button
                    key={pet}
                    type="button"
                    className="px-4 py-2 bg-gray-100 hover:bg-primary-100 hover:text-primary-700 rounded-full text-sm font-medium transition-colors"
                  >
                    {pet}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-primary-500/25"
        >
          <Save className="w-5 h-5" />
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
