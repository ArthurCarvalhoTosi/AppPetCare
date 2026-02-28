# 🔐 Guia de Autenticação JWT

## Conceitos essenciais

### O que é JWT?

**JWT (JSON Web Token)** é um token compacto que carrega dados (claims) assinados digitalmente. A API **não precisa armazenar sessão** — o próprio token prova que o usuário está autenticado.

```
Header.Payload.Signature
```

- **Header**: tipo do token (JWT) + algoritmo (ex: HS256)
- **Payload**: claims (userId, email, exp, etc.)
- **Signature**: assinatura que garante que o token não foi alterado

---

### Access Token vs Refresh Token

| Tipo              | Duração           | Uso                                    |
| ----------------- | ----------------- | -------------------------------------- |
| **Access Token**  | Curta (15-60 min) | Enviado em toda requisição autenticada |
| **Refresh Token** | Longa (7-30 dias) | Usado só para obter novo Access Token  |

**Por que dois tokens?**

- Access Token curto = menos risco se for interceptado
- Refresh Token guardado no banco = pode ser revogado (logout em todos os dispositivos)

---

### Fluxo completo

```
1. LOGIN
   Cliente → POST /api/auth/login { email, password }
   API → valida credenciais → retorna { accessToken, refreshToken, expiresIn }

2. REQUISIÇÕES AUTENTICADAS
   Cliente → GET /api/pets (header: Authorization: Bearer {accessToken})
   API → valida token → processa requisição

3. TOKEN EXPIRADO
   Cliente → POST /api/auth/refresh-token { refreshToken }
   API → valida refresh token → retorna novo { accessToken, refreshToken }
```

---

## Implementação passo a passo

### Passo 1: Pacotes necessários

- **Microsoft.AspNetCore.Authentication.JwtBearer** — validação de tokens
- **BCrypt.Net-Next** — hash seguro de senhas (nunca guarde senha em texto puro!)

### Passo 2: Modelo RefreshToken

O refresh token é guardado no banco para:

- Validar que ainda é válido
- Permitir revogação (logout em todos os devices)
- Associar ao usuário

### Passo 3: Configuração (appsettings.json)

Em `appsettings.json`:

```json
"Jwt": {
  "Key": "sua-chave-secreta-muito-longa-minimo-32-caracteres!",
  "Issuer": "PetCareApi",
  "Audience": "PetCareApp",
  "AccessTokenExpirationMinutes": 30,
  "RefreshTokenExpirationDays": 7
}
```

| Config                           | Uso                                            |
| -------------------------------- | ---------------------------------------------- |
| **Key**                          | Assina e valida o token. Mínimo 32 caracteres! |
| **Issuer**                       | Quem emitiu o token (sua API)                  |
| **Audience**                     | Para quem é o token (seu app)                  |
| **AccessTokenExpirationMinutes** | Validade do access token                       |
| **RefreshTokenExpirationDays**   | Validade do refresh token                      |

**Onde guardar a Key (nunca commitar):**

| Ambiente | Onde configurar |
|----------|-----------------|
| **Desenvolvimento** | User Secrets |
| **Produção** | Variável de ambiente |

```bash
# Desenvolvimento (User Secrets — não vai pro Git)
dotnet user-secrets set "Jwt:Key" "sua-chave-muito-longa-32-caracteres-minimo!"

# Produção (Linux/macOS / Docker)
export Jwt__Key="chave-super-secreta-producao-32chars"

# Produção (Windows PowerShell)
$env:Jwt__Key="chave-super-secreta-producao-32chars"
```

O `appsettings.json` fica com `"Key": ""`; User Secrets ou env var sobrescrevem.

### Passo 4: Program.cs — Ordem importa

```csharp
// 1. AddAuthentication antes do Build
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { ... });

// 2. UseAuthentication antes de UseAuthorization
app.UseAuthentication();
app.UseAuthorization();
```

### Passo 5: Proteger rotas

```csharp
[Authorize]  // Exige token válido
public class PetsController : ControllerBase
{
    // O userId está em HttpContext.User (do token)
}
```

---

## Segurança

1. **Key** em variável de ambiente em produção
2. **HTTPS** em produção (tokens no header, não na URL)
3. **Refresh token** em HttpOnly cookie (opcional, mais seguro que localStorage)
4. **Rotação de refresh token** — a cada refresh, invalidar o antigo e emitir novo
