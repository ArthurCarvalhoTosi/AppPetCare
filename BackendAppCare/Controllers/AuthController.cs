using Microsoft.AspNetCore.Mvc;

namespace BackendAppCare.Controllers;

/// <summary>
/// Controller para autenticação e registro de usuários
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // TODO: Implementar autenticação JWT

    /// <summary>
    /// Registro de novo usuário (tutor ou cuidador)
    /// </summary>
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        // TODO: Implementar registro
        return Ok(new { message = "Endpoint de registro - A implementar" });
    }

    /// <summary>
    /// Login de usuário
    /// </summary>
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        // TODO: Implementar login com JWT
        return Ok(new { message = "Endpoint de login - A implementar" });
    }

    /// <summary>
    /// Refresh do token JWT
    /// </summary>
    [HttpPost("refresh-token")]
    public IActionResult RefreshToken()
    {
        // TODO: Implementar refresh token
        return Ok(new { message = "Endpoint de refresh token - A implementar" });
    }
}

// DTOs temporários - mover para pasta DTOs
public record RegisterRequest(
    string Email,
    string Password,
    string Name,
    string Phone,
    int UserType // 0 = PetOwner, 1 = Caregiver
);

public record LoginRequest(
    string Email,
    string Password
);
