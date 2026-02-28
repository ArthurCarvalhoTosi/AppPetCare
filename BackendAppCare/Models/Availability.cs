namespace BackendAppCare.Models;

/// <summary>
/// Disponibilidade do cuidador no calendário
/// </summary>
public class Availability
{
    public Guid Id { get; set; }
    public Guid CaregiverId { get; set; }
    
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public bool IsRecurring { get; set; } = true;
    
    // Para disponibilidade específica de uma data
    public DateTime? SpecificDate { get; set; }
    public bool IsBlocked { get; set; } = false; // Para bloquear datas específicas

    // Navigation property
    public virtual CaregiverProfile? Caregiver { get; set; }
}
