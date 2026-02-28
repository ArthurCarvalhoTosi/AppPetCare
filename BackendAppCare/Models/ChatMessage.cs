namespace BackendAppCare.Models;

/// <summary>
/// Mensagens do chat entre cuidadores e tutores
/// </summary>
public class ChatMessage
{
    public Guid Id { get; set; }
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }
    public Guid? VisitId { get; set; } // Opcional: mensagem relacionada a uma visita
    
    public string Content { get; set; } = string.Empty;
    public bool IsRead { get; set; } = false;
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReadAt { get; set; }

    // Navigation properties
    public virtual User? Sender { get; set; }
    public virtual User? Receiver { get; set; }
    public virtual Visit? Visit { get; set; }
}

/// <summary>
/// Conversa entre dois usuários
/// </summary>
public class Conversation
{
    public Guid Id { get; set; }
    public Guid User1Id { get; set; }
    public Guid User2Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastMessageAt { get; set; }

    // Navigation properties
    public virtual User? User1 { get; set; }
    public virtual User? User2 { get; set; }
}
