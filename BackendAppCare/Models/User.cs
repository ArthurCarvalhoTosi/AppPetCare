namespace BackendAppCare.Models;

public enum UserType
{
    PetOwner = 0,    // Tutor/dono do pet
    Caregiver = 1    // Cuidador
}

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? ProfileImageUrl { get; set; }
    public UserType UserType { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public virtual ICollection<Pet>? Pets { get; set; }
    public virtual CaregiverProfile? CaregiverProfile { get; set; }
    public virtual ICollection<RefreshToken>? RefreshTokens { get; set; }
}
