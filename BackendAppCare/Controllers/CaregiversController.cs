using Microsoft.AspNetCore.Mvc;

namespace BackendAppCare.Controllers;

/// <summary>
/// Controller para gerenciamento de cuidadores
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CaregiversController : ControllerBase
{
    /// <summary>
    /// Lista cuidadores disponíveis com filtros
    /// </summary>
    [HttpGet]
    public IActionResult GetCaregivers(
        [FromQuery] string? location,
        [FromQuery] int? petType,
        [FromQuery] decimal? maxRate)
    {
        // TODO: Implementar listagem com filtros
        return Ok(new { message = "Lista de cuidadores - A implementar" });
    }

    /// <summary>
    /// Obtém perfil detalhado de um cuidador
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetCaregiver(Guid id)
    {
        // TODO: Implementar busca de cuidador
        return Ok(new { message = $"Perfil do cuidador {id} - A implementar" });
    }

    /// <summary>
    /// Obtém disponibilidade do cuidador
    /// </summary>
    [HttpGet("{id}/availability")]
    public IActionResult GetAvailability(Guid id, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        // TODO: Implementar busca de disponibilidade
        return Ok(new { message = $"Disponibilidade do cuidador {id} - A implementar" });
    }

    /// <summary>
    /// Atualiza perfil do cuidador (próprio)
    /// </summary>
    [HttpPut("profile")]
    public IActionResult UpdateProfile([FromBody] UpdateCaregiverProfileRequest request)
    {
        // TODO: Implementar atualização de perfil
        return Ok(new { message = "Perfil atualizado - A implementar" });
    }

    /// <summary>
    /// Define disponibilidade do cuidador
    /// </summary>
    [HttpPost("availability")]
    public IActionResult SetAvailability([FromBody] SetAvailabilityRequest request)
    {
        // TODO: Implementar definição de disponibilidade
        return Ok(new { message = "Disponibilidade definida - A implementar" });
    }
}

public record UpdateCaregiverProfileRequest(
    string Bio,
    decimal HourlyRate,
    string ServiceArea,
    int[] AcceptedPetTypes
);

public record SetAvailabilityRequest(
    DayOfWeek DayOfWeek,
    TimeSpan StartTime,
    TimeSpan EndTime,
    bool IsRecurring,
    DateTime? SpecificDate
);
