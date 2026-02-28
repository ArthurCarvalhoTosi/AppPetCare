using BackendAppCare.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAppCare.Data;

/// <summary>
/// Contexto do Entity Framework para o banco de dados PetCare.
/// Gerencia todas as entidades e suas relações.
/// </summary>
public class PetCareDbContext : DbContext
{
    public PetCareDbContext(DbContextOptions<PetCareDbContext> options)
        : base(options)
    {
    }

    // DbSets - cada um representa uma tabela no banco
    public DbSet<User> Users => Set<User>();
    public DbSet<Pet> Pets => Set<Pet>();
    public DbSet<CaregiverProfile> CaregiverProfiles => Set<CaregiverProfile>();
    public DbSet<Visit> Visits => Set<Visit>();
    public DbSet<VisitReport> VisitReports => Set<VisitReport>();
    public DbSet<ReportImage> ReportImages => Set<ReportImage>();
    public DbSet<Availability> Availabilities => Set<Availability>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
    public DbSet<Conversation> Conversations => Set<Conversation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurações de entidade para garantir integridade e índices

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(20);
        });

        // Pet
        modelBuilder.Entity<Pet>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.OwnerId);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.HasOne(e => e.Owner)
                .WithMany(u => u.Pets)
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // CaregiverProfile
        modelBuilder.Entity<CaregiverProfile>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.UserId).IsUnique();
            entity.HasOne(e => e.User)
                .WithOne(u => u.CaregiverProfile)
                .HasForeignKey<CaregiverProfile>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Visit
        modelBuilder.Entity<Visit>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.PetId);
            entity.HasIndex(e => e.CaregiverId);
            entity.HasIndex(e => e.OwnerId);
            entity.HasIndex(e => e.ScheduledDate);
            entity.HasOne(e => e.Pet)
                .WithMany(p => p.Visits)
                .HasForeignKey(e => e.PetId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Caregiver)
                .WithMany(c => c.Visits)
                .HasForeignKey(e => e.CaregiverId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Owner)
                .WithMany()
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // VisitReport
        modelBuilder.Entity<VisitReport>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.VisitId);
            entity.HasIndex(e => e.CaregiverId);
            entity.HasOne(e => e.Visit)
                .WithMany(v => v.Reports)
                .HasForeignKey(e => e.VisitId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // ReportImage
        modelBuilder.Entity<ReportImage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.ReportId);
            entity.HasOne(e => e.Report)
                .WithMany(r => r.Images)
                .HasForeignKey(e => e.ReportId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Availability
        modelBuilder.Entity<Availability>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.CaregiverId);
            entity.HasOne(e => e.Caregiver)
                .WithMany(c => c.Availabilities)
                .HasForeignKey(e => e.CaregiverId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // ChatMessage
        modelBuilder.Entity<ChatMessage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.SenderId);
            entity.HasIndex(e => e.ReceiverId);
            entity.HasIndex(e => e.VisitId);
            entity.HasIndex(e => e.SentAt);
        });

        // Conversation
        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.User1Id, e.User2Id });
        });
    }
}
