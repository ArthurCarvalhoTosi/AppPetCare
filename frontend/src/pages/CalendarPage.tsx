import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// TODO: Integrar com react-big-calendar para funcionalidade completa
// TODO: Buscar visitas reais da API

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Preencher dias do mês anterior para começar na segunda-feira
  const startDay = monthStart.getDay()
  const paddingDays = startDay === 0 ? 6 : startDay - 1

  // Mock de eventos
  const events = [
    { date: '2026-01-17', title: 'Luna - 14:00', color: 'bg-primary-500' },
    { date: '2026-01-18', title: 'Thor - 10:00', color: 'bg-blue-500' },
    { date: '2026-01-20', title: 'Mel - 16:00', color: 'bg-green-500' },
    { date: '2026-01-22', title: 'Luna - 14:00', color: 'bg-primary-500' },
  ]

  const getEventsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return events.filter(event => event.date === dateStr)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-gray-900">
          Calendário
        </h1>
        <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Nova Visita
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h2 className="font-display text-xl font-semibold text-gray-900 capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
            <div key={day} className="p-4 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Padding days */}
          {Array.from({ length: paddingDays }).map((_, index) => (
            <div key={`padding-${index}`} className="p-4 min-h-[120px] bg-gray-50" />
          ))}
          
          {/* Month days */}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day)
            
            return (
              <div
                key={day.toISOString()}
                className={`p-2 min-h-[120px] border-t border-l border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  <span
                    className={`w-8 h-8 flex items-center justify-center text-sm rounded-full ${
                      isToday(day)
                        ? 'bg-primary-500 text-white font-bold'
                        : 'text-gray-700'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div
                      key={idx}
                      className={`${event.color} text-white text-xs px-2 py-1 rounded truncate`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 2} mais
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Upcoming Events Sidebar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">
          Próximos Eventos
        </h3>
        <div className="space-y-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div className={`w-3 h-3 rounded-full ${event.color}`} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info sobre integração futura */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-blue-800 text-sm">
          <strong>Em breve:</strong> Integração com Google Calendar para sincronizar suas visitas automaticamente!
        </p>
      </div>
    </div>
  )
}
