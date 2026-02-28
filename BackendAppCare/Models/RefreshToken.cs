namespace BackendAppCare.Models;

/// <summary>
/// Refresh token armazenado no banco para validação e revogação.
/// Um usuário pode ter vários (ex: um por dispositivo).
/// </summary>
public class RefreshToken
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Token { get; set; } = string.Empty;  // Valor único (GUID ou random)
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? CreatedByIp { get; set; }
    public DateTime? RevokedAt { get; set; }  // Se preenchido = token inválido
    public string? RevokedByIp { get; set; }
    public string? ReplacedByToken { get; set; }  // Token que substituiu este (rotação)

    public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
    public bool IsRevoked => RevokedAt.HasValue;
    public bool IsActive => !IsExpired && !IsRevoked;

    public virtual User? User { get; set; }
}
