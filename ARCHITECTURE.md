# 🐾 PetCare - Arquitetura do Projeto

## Visão Geral

Sistema de agendamento de visitas para cuidado de pets, conectando tutores e cuidadores profissionais.

## Stack Tecnológico

### Frontend
- **React 18** com TypeScript
- **Vite** como bundler
- **TailwindCSS** para estilização
- **React Router** para navegação
- **TanStack Query** para gerenciamento de estado de servidor
- **Zustand** para estado global
- **Lucide React** para ícones

### Backend
- **.NET 10** Web API
- **Entity Framework Core** (a implementar)
- **JWT** para autenticação (a implementar)
- **SignalR** para chat em tempo real (a implementar)

## Estrutura do Projeto

```
AppPetCare/
├── BackendAppCare/              # API .NET
│   ├── Controllers/             # Endpoints da API
│   │   ├── AuthController.cs    # Autenticação
│   │   ├── VisitsController.cs  # Gerenciamento de visitas
│   │   ├── PetsController.cs    # CRUD de pets
│   │   ├── CaregiversController.cs # Cuidadores
│   │   ├── ReportsController.cs # Relatórios de visitas
│   │   └── ChatController.cs    # Sistema de mensagens
│   ├── Models/                  # Entidades do domínio
│   │   ├── User.cs              # Usuário (tutor/cuidador)
│   │   ├── Pet.cs               # Pet
│   │   ├── CaregiverProfile.cs  # Perfil do cuidador
│   │   ├── Visit.cs             # Visita agendada
│   │   ├── VisitReport.cs       # Relatório da visita
│   │   ├── Availability.cs      # Disponibilidade
│   │   └── ChatMessage.cs       # Mensagens
│   └── Program.cs               # Configuração da aplicação
│
└── frontend/                    # React App
    ├── src/
    │   ├── layouts/             # Layouts (Main, Auth)
    │   ├── pages/               # Páginas da aplicação
    │   │   ├── auth/            # Login, Register
    │   │   ├── HomePage.tsx     # Landing page
    │   │   ├── DashboardPage.tsx
    │   │   ├── CalendarPage.tsx
    │   │   ├── VisitsPage.tsx
    │   │   ├── ChatPage.tsx
    │   │   ├── ProfilePage.tsx
    │   │   ├── CaregiversPage.tsx
    │   │   └── PetsPage.tsx
    │   ├── stores/              # Estado global (Zustand)
    │   ├── services/            # Chamadas à API
    │   ├── types/               # TypeScript types
    │   └── App.tsx              # Rotas da aplicação
    └── package.json
```

## Funcionalidades

### ✅ Implementado (Esboço/UI)
- [x] Landing page
- [x] Sistema de login/registro (UI)
- [x] Diferenciação Tutor vs Cuidador
- [x] Dashboard personalizado
- [x] Calendário de visitas (UI)
- [x] Listagem de visitas
- [x] Chat entre usuários (UI)
- [x] Gerenciamento de pets
- [x] Busca de cuidadores
- [x] Perfil de usuário

### ⏳ Próximos Passos

#### Backend
1. **Configurar Entity Framework Core**
   - Criar DbContext
   - Configurar migrations
   - Conectar banco de dados (SQL Server/PostgreSQL)

2. **Implementar Autenticação JWT**
   - Adicionar pacote `Microsoft.AspNetCore.Authentication.JwtBearer`
   - Configurar geração e validação de tokens
   - Implementar refresh tokens

3. **Implementar Repositórios e Services**
   - Criar camada de serviços
   - Implementar lógica de negócio
   - Validações

4. **SignalR para Chat em Tempo Real**
   - Configurar Hub
   - Implementar notificações de mensagens

5. **Upload de Imagens**
   - Configurar storage (local ou cloud)
   - Implementar upload de fotos de pets e relatórios

#### Frontend
1. **Integrar com API real**
   - Substituir dados mock por chamadas reais
   - Implementar loading states
   - Tratamento de erros

2. **React Big Calendar**
   - Implementar calendário completo
   - Drag and drop para agendar

3. **Formulários Completos**
   - Validação com React Hook Form + Zod
   - Feedback de erros

4. **Notificações**
   - Toast notifications
   - Push notifications

### 🔮 Futuro
- [ ] Integração com Google Calendar
- [ ] Sistema de pagamentos
- [ ] Avaliações e reviews
- [ ] App mobile (React Native)
- [ ] Notificações push
- [ ] Geolocalização

## Diagrama de Entidades

```
┌─────────────┐     ┌─────────────────┐
│    User     │────<│ CaregiverProfile│
├─────────────┤     ├─────────────────┤
│ id          │     │ id              │
│ email       │     │ userId          │
│ name        │     │ bio             │
│ userType    │     │ hourlyRate      │
│ ...         │     │ rating          │
└─────────────┘     └─────────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌─────────────┐     ┌─────────────────┐
│    Pet      │────>│     Visit       │<────┐
├─────────────┤     ├─────────────────┤     │
│ id          │     │ id              │     │
│ ownerId     │     │ petId           │     │
│ name        │     │ caregiverId     │     │
│ type        │     │ scheduledDate   │     │
│ ...         │     │ status          │     │
└─────────────┘     └─────────────────┘     │
                           │                │
                           ▼                │
                    ┌─────────────────┐     │
                    │  VisitReport    │     │
                    ├─────────────────┤     │
                    │ id              │     │
                    │ visitId         │     │
                    │ content         │     │
                    │ images[]        │     │
                    └─────────────────┘     │
                                            │
┌─────────────────┐     ┌───────────────────┘
│  ChatMessage    │     │
├─────────────────┤     │
│ id              │     │
│ senderId        │     │
│ receiverId      │     │
│ visitId         │─────┘
│ content         │
└─────────────────┘
```

## Como Executar

### Backend
```bash
cd BackendAppCare
dotnet run
```
API disponível em: `https://localhost:5001`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App disponível em: `http://localhost:3000`

## Configurações Recomendadas

### CORS (Backend)
Adicionar ao `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Antes de app.UseAuthorization()
app.UseCors("AllowFrontend");
```

### Pacotes NuGet Recomendados
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" />
<PackageReference Include="Microsoft.AspNetCore.SignalR" />
<PackageReference Include="BCrypt.Net-Next" />
```

---

**Desenvolvido com 💚 para os amantes de pets!**
