import { useState } from 'react'
import { Calendar, Clock, MapPin, PawPrint, Filter, Plus } from 'lucide-react'
import { VisitStatus } from '../types'

// TODO: Buscar visitas reais da API

const mockVisits = [
  {
    id: '1',
    petName: 'Luna',
    petType: 'Cachorro',
    caregiverName: 'Maria Silva',
    date: '17/01/2026',
    time: '14:00 - 16:00',
    address: 'Rua das Flores, 123',
    status: VisitStatus.Confirmed,
    price: 80,
  },
  {
    id: '2',
    petName: 'Thor',
    petType: 'Gato',
    caregiverName: 'João Santos',
    date: '18/01/2026',
    time: '10:00 - 12:00',
    address: 'Av. Principal, 456',
    status: VisitStatus.Pending,
    price: 60,
  },
  {
    id: '3',
    petName: 'Mel',
    petType: 'Cachorro',
    caregiverName: 'Ana Costa',
    date: '15/01/2026',
    time: '16:00 - 18:00',
    address: 'Rua do Parque, 789',
    status: VisitStatus.Completed,
    price: 80,
  },
]

const statusConfig = {
  [VisitStatus.Pending]: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
  [VisitStatus.Confirmed]: { label: 'Confirmada', color: 'bg-green-100 text-green-700' },
  [VisitStatus.InProgress]: { label: 'Em Andamento', color: 'bg-blue-100 text-blue-700' },
  [VisitStatus.Completed]: { label: 'Concluída', color: 'bg-gray-100 text-gray-700' },
  [VisitStatus.Cancelled]: { label: 'Cancelada', color: 'bg-red-100 text-red-700' },
}

export default function VisitsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  const filteredVisits = mockVisits.filter((visit) => {
    if (filter === 'upcoming') return visit.status !== VisitStatus.Completed && visit.status !== VisitStatus.Cancelled
    if (filter === 'past') return visit.status === VisitStatus.Completed || visit.status === VisitStatus.Cancelled
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-gray-900">
          Minhas Visitas
        </h1>
        <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Agendar Visita
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Filter className="w-5 h-5" />
          <span className="text-sm font-medium">Filtrar:</span>
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Todas' },
            { value: 'upcoming', label: 'Próximas' },
            { value: 'past', label: 'Anteriores' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as typeof filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visits List */}
      <div className="space-y-4">
        {filteredVisits.map((visit) => (
          <div
            key={visit.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* Pet Icon */}
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <PawPrint className="w-8 h-8 text-primary-600" />
              </div>

              {/* Visit Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900">
                      {visit.petName}
                    </h3>
                    <p className="text-gray-500 text-sm">{visit.petType} • Cuidador: {visit.caregiverName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusConfig[visit.status].color}`}>
                    {statusConfig[visit.status].label}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{visit.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{visit.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm truncate">{visit.address}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">R$ {visit.price}</p>
                <p className="text-xs text-gray-500">por visita</p>
              </div>
            </div>

            {/* Actions */}
            {visit.status === VisitStatus.Pending && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                <button className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors">
                  Confirmar
                </button>
                <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors">
                  Recusar
                </button>
              </div>
            )}

            {visit.status === VisitStatus.Completed && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Ver relatório da visita →
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredVisits.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl">
            <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma visita encontrada</h3>
            <p className="text-gray-500">Agende sua primeira visita!</p>
          </div>
        )}
      </div>
    </div>
  )
}
