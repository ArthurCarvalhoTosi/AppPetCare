namespace BackendAppCare.Models;

public enum VisitStatus
{
    Pending = 0,      // Aguardando confirmação
    Confirmed = 1,    // Confirmada pelo cuidador
    InProgress = 2,   // Em andamento
    Completed = 3,    // Concluída
    Cancelled = 4     // Cancelada
}

public class Visit
{
    public Guid Id { get; set; }
    public Guid PetId { get; set; }
    public Guid CaregiverId { get; set; }
    public Guid OwnerId { get; set; }
    
    public DateTime ScheduledDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    
    public VisitStatus Status { get; set; } = VisitStatus.Pending;
    public string? Notes { get; set; }
    public string? Address { get; set; }
    public decimal? TotalPrice { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Para futura integração com Google Calendar
    public string? GoogleCalendarEventId { get; set; }

    // Navigation properties
    public virtual Pet? Pet { get; set; }
    public virtual CaregiverProfile? Caregiver { get; set; }
    public virtual User? Owner { get; set; }
    public virtual ICollection<VisitReport>? Reports { get; set; }
}
