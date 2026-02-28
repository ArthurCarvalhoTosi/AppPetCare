using Microsoft.AspNetCore.Mvc;

namespace BackendAppCare.Controllers;

/// <summary>
/// Controller para chat entre cuidadores e tutores
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    /// <summary>
    /// Lista conversas do usuário logado
    /// </summary>
    [HttpGet("conversations")]
    public IActionResult GetConversations()
    {
        // TODO: Implementar listagem de conversas
        return Ok(new { message = "Lista de conversas - A implementar" });
    }

    /// <summary>
    /// Obtém mensagens de uma conversa
    /// </summary>
    [HttpGet("conversations/{conversationId}/messages")]
    public IActionResult GetMessages(Guid conversationId, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        // TODO: Implementar busca de mensagens com paginação
        return Ok(new { message = $"Mensagens da conversa {conversationId} - A implementar" });
    }

    /// <summary>
    /// Envia uma mensagem
    /// </summary>
    [HttpPost("messages")]
    public IActionResult SendMessage([FromBody] SendMessageRequest request)
    {
        // TODO: Implementar envio de mensagem
        // Futuramente integrar com SignalR para tempo real
        return Ok(new { message = "Mensagem enviada - A implementar" });
    }

    /// <summary>
    /// Marca mensagens como lidas
    /// </summary>
    [HttpPut("messages/read")]
    public IActionResult MarkAsRead([FromBody] MarkAsReadRequest request)
    {
        // TODO: Implementar marcação de leitura
        return Ok(new { message = "Mensagens marcadas como lidas - A implementar" });
    }
}

public record SendMessageRequest(
    Guid ReceiverId,
    string Content,
    Guid? VisitId
);

public record MarkAsReadRequest(Guid[] MessageIds);
