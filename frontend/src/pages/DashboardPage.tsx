import { useAuthStore, UserType } from '../stores/authStore'
import { Calendar, Clock, PawPrint, MessageCircle, TrendingUp, Users } from 'lucide-react'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const isCaregiver = user?.userType === UserType.Caregiver

  // TODO: Buscar dados reais da API
  const stats = isCaregiver
    ? [
        { label: 'Visitas Hoje', value: '3', icon: Calendar, color: 'from-blue-500 to-blue-600' },
        { label: 'Esta Semana', value: '12', icon: Clock, color: 'from-green-500 to-green-600' },
        { label: 'Avaliação', value: '4.9', icon: TrendingUp, color: 'from-yellow-500 to-yellow-600' },
        { label: 'Clientes', value: '28', icon: Users, color: 'from-purple-500 to-purple-600' },
      ]
    : [
        { label: 'Meus Pets', value: '2', icon: PawPrint, color: 'from-primary-500 to-primary-600' },
        { label: 'Visitas Agendadas', value: '3', icon: Calendar, color: 'from-blue-500 to-blue-600' },
        { label: 'Mensagens', value: '5', icon: MessageCircle, color: 'from-green-500 to-green-600' },
        { label: 'Visitas Realizadas', value: '15', icon: Clock, color: 'from-purple-500 to-purple-600' },
      ]

  // Mock de próximas visitas
  const upcomingVisits = [
    { id: '1', petName: 'Luna', date: 'Hoje, 14:00', status: 'Confirmada' },
    { id: '2', petName: 'Thor', date: 'Amanhã, 10:00', status: 'Pendente' },
    { id: '3', petName: 'Mel', date: '20/01, 16:00', status: 'Confirmada' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
        <h1 className="font-display text-3xl font-bold mb-2">
          Olá, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-white/80">
          {isCaregiver
            ? 'Aqui está o resumo das suas atividades'
            : 'Veja como estão seus pets e próximas visitas'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Visits */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-gray-900">
              Próximas Visitas
            </h2>
            <a href="/visits" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver todas
            </a>
          </div>
          
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <div
                key={visit.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{visit.petName}</p>
                  <p className="text-sm text-gray-500">{visit.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    visit.status === 'Confirmada'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {visit.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
            Ações Rápidas
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {isCaregiver ? (
              <>
                <QuickActionCard
                  icon={Calendar}
                  title="Ver Agenda"
                  description="Gerenciar disponibilidade"
                  href="/calendar"
                  color="blue"
                />
                <QuickActionCard
                  icon={MessageCircle}
                  title="Mensagens"
                  description="Conversar com clientes"
                  href="/chat"
                  color="green"
                />
              </>
            ) : (
              <>
                <QuickActionCard
                  icon={Users}
                  title="Buscar Cuidador"
                  description="Encontrar cuidadores"
                  href="/caregivers"
                  color="purple"
                />
                <QuickActionCard
                  icon={PawPrint}
                  title="Meus Pets"
                  description="Gerenciar pets"
                  href="/pets"
                  color="primary"
                />
                <QuickActionCard
                  icon={Calendar}
                  title="Agendar Visita"
                  description="Nova visita"
                  href="/visits"
                  color="blue"
                />
                <QuickActionCard
                  icon={MessageCircle}
                  title="Mensagens"
                  description="Ver conversas"
                  href="/chat"
                  color="green"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  color: 'primary' | 'blue' | 'green' | 'purple'
}) {
  const colors = {
    primary: 'bg-primary-50 text-primary-600 hover:bg-primary-100',
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
  }

  return (
    <a
      href={href}
      className={`p-4 rounded-xl ${colors[color]} transition-colors flex flex-col items-center text-center`}
    >
      <Icon className="w-8 h-8 mb-2" />
      <p className="font-medium">{title}</p>
      <p className="text-xs opacity-70">{description}</p>
    </a>
  )
}
