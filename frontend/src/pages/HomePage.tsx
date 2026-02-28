import { Link } from 'react-router-dom'
import { PawPrint, Calendar, MessageCircle, Shield, Star, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-gray-800">PetCare</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
              Recursos
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">
              Como funciona
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Entrar
            </Link>
            <Link 
              to="/register" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/25"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Mais de 2.000 pets cuidados com carinho
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Cuidado profissional<br />
            para seu <span className="text-primary-500">melhor amigo</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Conectamos você a cuidadores verificados que tratam seu pet como família. 
            Agende visitas, receba atualizações em tempo real e tenha tranquilidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5"
            >
              Começar agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/register?type=caregiver" 
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-gray-200 hover:border-gray-300"
            >
              Quero ser cuidador
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recursos pensados para facilitar o cuidado do seu pet
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Agendamento Fácil',
                description: 'Calendário integrado para agendar e gerenciar visitas com poucos cliques',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: MessageCircle,
                title: 'Chat Direto',
                description: 'Comunique-se diretamente com o cuidador em tempo real',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: PawPrint,
                title: 'Relatórios com Fotos',
                description: 'Receba atualizações com fotos e descrições de cada visita',
                color: 'from-primary-500 to-primary-600'
              },
              {
                icon: Shield,
                title: 'Cuidadores Verificados',
                description: 'Todos os cuidadores passam por processo de verificação',
                color: 'from-purple-500 to-purple-600'
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Cadastre-se', description: 'Crie sua conta e adicione seus pets' },
              { step: '2', title: 'Encontre', description: 'Busque cuidadores na sua região' },
              { step: '3', title: 'Agende', description: 'Marque visitas e acompanhe tudo' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
                Cadastre-se gratuitamente e encontre o cuidador perfeito para seu pet
              </p>
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Criar conta grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-semibold text-gray-800">PetCare</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 PetCare. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
