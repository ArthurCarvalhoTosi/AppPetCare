namespace BackendAppCare.Models;

public class CaregiverProfile
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Bio { get; set; } = string.Empty;
    public decimal HourlyRate { get; set; }
    public string? ServiceArea { get; set; }
    public bool IsAvailable { get; set; } = true;
    public double Rating { get; set; } = 0;
    public int TotalReviews { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Tipos de pets que o cuidador aceita
    public string? AcceptedPetTypes { get; set; } // JSON array de PetType

    // Navigation properties
    public virtual User? User { get; set; }
    public virtual ICollection<Visit>? Visits { get; set; }
    public virtual ICollection<Availability>? Availabilities { get; set; }
}
