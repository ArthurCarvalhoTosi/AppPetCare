namespace BackendAppCare.Models;

/// <summary>
/// Relatório de visita criado pelo cuidador com texto e imagens
/// </summary>
public class VisitReport
{
    public Guid Id { get; set; }
    public Guid VisitId { get; set; }
    public Guid CaregiverId { get; set; }
    
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Visit? Visit { get; set; }
    public virtual ICollection<ReportImage>? Images { get; set; }
}

public class ReportImage
{
    public Guid Id { get; set; }
    public Guid ReportId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? Caption { get; set; }
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public virtual VisitReport? Report { get; set; }
}
