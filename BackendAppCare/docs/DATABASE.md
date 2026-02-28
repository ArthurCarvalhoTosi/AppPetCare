# 🗄️ Guia do Banco de Dados - PetCare

---

## Passo a passo completo

### 1️⃣ Instalar ferramenta de Migrations (uma vez)

```bash
dotnet tool install --global dotnet-ef
```

### 2️⃣ Pacotes NuGet instalados

- `Microsoft.EntityFrameworkCore.Sqlite` — provider SQLite
- `Microsoft.EntityFrameworkCore.Design` — gera migrations

### 3️⃣ DbContext

Arquivo: `Data/PetCareDbContext.cs`

- Define os `DbSet<T>` para cada entidade (tabela)
- Configura relações, índices e constraints em `OnModelCreating`

### 4️⃣ Connection string

Em `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=petcare.db"
}
```

O arquivo `petcare.db` é criado na pasta do projeto.

### 5️⃣ Registrar DbContext no Program.cs

```csharp
builder.Services.AddDbContext<PetCareDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### 6️⃣ Comandos de Migration

| Comando                                    | O que faz                                       |
| ------------------------------------------ | ----------------------------------------------- |
| `dotnet ef migrations add NomeDaMigration` | Cria nova migration                             |
| `dotnet ef database update`                | Aplica migrations pendentes                     |
| `dotnet ef migrations remove`              | Remove última migration (se ainda não aplicada) |
| `dotnet ef database update 0`              | Remove todas as tabelas (volta ao zero)         |

### 7️⃣ Usar o DbContext nos Controllers

```csharp
public class PetsController : ControllerBase
{
    private readonly PetCareDbContext _db;

    public PetsController(PetCareDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<Pet>>> GetPets()
    {
        return await _db.Pets.ToListAsync();
    }
}
```

---

## Migrar para PostgreSQL (nuvem gratuita)

Quando quiser usar banco em nuvem:

### Neon.tech (PostgreSQL gratuito)

1. Crie conta em [neon.tech](https://neon.tech)
2. Crie um projeto e copie a connection string
3. Adicione o pacote:

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

4. No `Program.cs`:

```csharp
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
```

5. No `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "postgresql://user:senha@host/database?sslmode=require"
}
```

6. Crie nova migration e aplique:

```bash
dotnet ef migrations add MigrateToPostgres
dotnet ef database update
```

---

## Estrutura criada

- **petcare.db** — arquivo SQLite (na pasta do projeto)
- **Migrations/** — histórico de alterações do schema
