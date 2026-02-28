using Microsoft.AspNetCore.Mvc;

namespace BackendAppCare.Controllers;

/// <summary>
/// Controller para relatórios de visitas (texto e imagens)
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    /// <summary>
    /// Lista relatórios de uma visita
    /// </summary>
    [HttpGet("visit/{visitId}")]
    public IActionResult GetVisitReports(Guid visitId)
    {
        // TODO: Implementar listagem de relatórios
        return Ok(new { message = $"Relatórios da visita {visitId} - A implementar" });
    }

    /// <summary>
    /// Cria um novo relatório para uma visita
    /// </summary>
    [HttpPost]
    public IActionResult CreateReport([FromBody] CreateReportRequest request)
    {
        // TODO: Implementar criação de relatório
        return Ok(new { message = "Criação de relatório - A implementar" });
    }

    /// <summary>
    /// Upload de imagem para um relatório
    /// </summary>
    [HttpPost("{reportId}/images")]
    public IActionResult UploadImage(Guid reportId, IFormFile file)
    {
        // TODO: Implementar upload de imagem
        return Ok(new { message = $"Upload de imagem para relatório {reportId} - A implementar" });
    }
}

public record CreateReportRequest(
    Guid VisitId,
    string Content
);
