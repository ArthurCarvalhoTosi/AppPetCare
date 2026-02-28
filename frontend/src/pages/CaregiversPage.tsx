import { useState } from 'react'
import { Search, MapPin, Star, Filter, Heart } from 'lucide-react'

// TODO: Buscar cuidadores reais da API

const mockCaregivers = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'M',
    bio: 'Apaixonada por animais há mais de 10 anos. Especialista em cães de grande porte.',
    hourlyRate: 50,
    rating: 4.9,
    totalReviews: 48,
    serviceArea: 'Zona Sul - São Paulo',
    acceptedPets: ['Cachorro', 'Gato'],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'João Santos',
    avatar: 'J',
    bio: 'Veterinário aposentado, amo cuidar de todos os tipos de pets!',
    hourlyRate: 70,
    rating: 5.0,
    totalReviews: 32,
    serviceArea: 'Centro - São Paulo',
    acceptedPets: ['Cachorro', 'Gato', 'Pássaro', 'Roedor'],
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Ana Costa',
    avatar: 'A',
    bio: 'Certificada em primeiros socorros para pets. Experiência com gatos especiais.',
    hourlyRate: 45,
    rating: 4.8,
    totalReviews: 67,
    serviceArea: 'Zona Oeste - São Paulo',
    acceptedPets: ['Gato'],
    isAvailable: false,
  },
]

export default function CaregiversPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-gray-900">
          Encontrar Cuidadores
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou localização..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-600">Filtros</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Pet
              </label>
              <select className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todos</option>
                <option value="0">Cachorro</option>
                <option value="1">Gato</option>
                <option value="2">Pássaro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço máximo (R$/h)
              </label>
              <input
                type="number"
                placeholder="Ex: 80"
                className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilidade
              </label>
              <select className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Qualquer</option>
                <option value="available">Disponível agora</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Caregivers List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCaregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white text-xl font-bold">
                    {caregiver.avatar}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900">
                      {caregiver.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {caregiver.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({caregiver.totalReviews} avaliações)
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {caregiver.bio}
              </p>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{caregiver.serviceArea}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {caregiver.acceptedPets.map((pet) => (
                  <span
                    key={pet}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                  >
                    {pet}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {caregiver.hourlyRate}
                  </span>
                  <span className="text-gray-500 text-sm">/hora</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    caregiver.isAvailable
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {caregiver.isAvailable ? 'Disponível' : 'Indisponível'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button className="flex-1 py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-medium transition-colors">
                Agendar Visita
              </button>
              <button className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors">
                Ver Perfil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
