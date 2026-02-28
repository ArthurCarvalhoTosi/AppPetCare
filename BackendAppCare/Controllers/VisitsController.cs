using Microsoft.AspNetCore.Mvc;

namespace BackendAppCare.Controllers;

/// <summary>
/// Controller para gerenciamento de visitas
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class VisitsController : ControllerBase
{
    /// <summary>
    /// Lista todas as visitas do usuário logado
    /// </summary>
    [HttpGet]
    public IActionResult GetVisits()
    {
        // TODO: Implementar listagem de visitas
        return Ok(new { message = "Lista de visitas - A implementar" });
    }

    /// <summary>
    /// Obtém detalhes de uma visita específica
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetVisit(Guid id)
    {
        // TODO: Implementar busca de visita
        return Ok(new { message = $"Detalhes da visita {id} - A implementar" });
    }

    /// <summary>
    /// Cria uma nova solicitação de visita
    /// </summary>
    [HttpPost]
    public IActionResult CreateVisit([FromBody] CreateVisitRequest request)
    {
        // TODO: Implementar criação de visita
        return Ok(new { message = "Criação de visita - A implementar" });
    }

    /// <summary>
    /// Atualiza status de uma visita (confirmar, cancelar, etc)
    /// </summary>
    [HttpPut("{id}/status")]
    public IActionResult UpdateVisitStatus(Guid id, [FromBody] UpdateVisitStatusRequest request)
    {
        // TODO: Implementar atualização de status
        return Ok(new { message = $"Status da visita {id} atualizado - A implementar" });
    }

    /// <summary>
    /// Obtém visitas para o calendário (por período)
    /// </summary>
    [HttpGet("calendar")]
    public IActionResult GetCalendarVisits([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        // TODO: Implementar busca para calendário
        return Ok(new { message = "Visitas do calendário - A implementar" });
    }
}

// DTOs temporários
public record CreateVisitRequest(
    Guid PetId,
    Guid CaregiverId,
    DateTime ScheduledDate,
    TimeSpan StartTime,
    TimeSpan EndTime,
    string? Notes,
    string Address
);

public record UpdateVisitStatusRequest(int Status);
