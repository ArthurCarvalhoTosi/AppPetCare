namespace BackendAppCare.Models;

public enum PetType
{
    Dog = 0,
    Cat = 1,
    Bird = 2,
    Fish = 3,
    Rodent = 4,
    Reptile = 5,
    Other = 99
}

public class Pet
{
    public Guid Id { get; set; }
    public Guid OwnerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public PetType Type { get; set; }
    public string? Breed { get; set; }
    public int? AgeInMonths { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? SpecialNeeds { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User? Owner { get; set; }
    public virtual ICollection<Visit>? Visits { get; set; }
}
