import { useState } from 'react'
import { Plus, PawPrint, Edit2, Trash2, X } from 'lucide-react'
import { PetType } from '../types'

// TODO: Buscar pets reais da API

const mockPets = [
  {
    id: '1',
    name: 'Luna',
    type: PetType.Dog,
    breed: 'Golden Retriever',
    ageInMonths: 36,
    description: 'Muito dócil e brincalhona, adora correr no parque.',
    specialNeeds: 'Precisa de medicação para alergia',
  },
  {
    id: '2',
    name: 'Thor',
    type: PetType.Cat,
    breed: 'Persa',
    ageInMonths: 24,
    description: 'Gato calmo, gosta de ficar no sol.',
    specialNeeds: null,
  },
]

const petTypeLabels: Record<PetType, string> = {
  [PetType.Dog]: 'Cachorro',
  [PetType.Cat]: 'Gato',
  [PetType.Bird]: 'Pássaro',
  [PetType.Fish]: 'Peixe',
  [PetType.Rodent]: 'Roedor',
  [PetType.Reptile]: 'Réptil',
  [PetType.Other]: 'Outro',
}

export default function PetsPage() {
  const [showModal, setShowModal] = useState(false)
  const [editingPet, setEditingPet] = useState<typeof mockPets[0] | null>(null)

  const formatAge = (months: number) => {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (years === 0) return `${remainingMonths} meses`
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`
    return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} meses`
  }

  const openModal = (pet?: typeof mockPets[0]) => {
    setEditingPet(pet || null)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-gray-900">
          Meus Pets
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Adicionar Pet
        </button>
      </div>

      {/* Pets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Pet Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <PawPrint className="w-20 h-20 text-primary-400" />
            </div>

            {/* Pet Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display text-xl font-semibold text-gray-900">
                    {pet.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {petTypeLabels[pet.type]} {pet.breed && `• ${pet.breed}`}
                  </p>
                </div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                  {formatAge(pet.ageInMonths)}
                </span>
              </div>

              {pet.description && (
                <p className="text-gray-600 text-sm mb-4">
                  {pet.description}
                </p>
              )}

              {pet.specialNeeds && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                  <p className="text-yellow-800 text-xs font-medium">
                    ⚠️ {pet.specialNeeds}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => openModal(pet)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
                <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Pet Card */}
        <button
          onClick={() => openModal()}
          className="h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
        >
          <Plus className="w-12 h-12" />
          <span className="font-medium">Adicionar novo pet</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-gray-900">
                {editingPet ? 'Editar Pet' : 'Novo Pet'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do pet
                </label>
                <input
                  type="text"
                  defaultValue={editingPet?.name}
                  placeholder="Ex: Luna"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    defaultValue={editingPet?.type}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {Object.entries(petTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Raça
                  </label>
                  <input
                    type="text"
                    defaultValue={editingPet?.breed || ''}
                    placeholder="Ex: Golden"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade (meses)
                </label>
                <input
                  type="number"
                  defaultValue={editingPet?.ageInMonths}
                  min={0}
                  placeholder="Ex: 24"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  defaultValue={editingPet?.description || ''}
                  rows={3}
                  placeholder="Conte sobre o comportamento do seu pet..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Necessidades especiais
                </label>
                <input
                  type="text"
                  defaultValue={editingPet?.specialNeeds || ''}
                  placeholder="Medicações, dietas especiais, etc."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
                >
                  {editingPet ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
