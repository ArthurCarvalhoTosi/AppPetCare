using Microsoft.AspNetCore.Mvc;

namespace BackendAppCare.Controllers;

/// <summary>
/// Controller para gerenciamento de pets
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PetsController : ControllerBase
{
    /// <summary>
    /// Lista pets do usuário logado
    /// </summary>
    [HttpGet]
    public IActionResult GetPets()
    {
        // TODO: Implementar listagem de pets
        return Ok(new { message = "Lista de pets - A implementar" });
    }

    /// <summary>
    /// Obtém detalhes de um pet
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetPet(Guid id)
    {
        // TODO: Implementar busca de pet
        return Ok(new { message = $"Detalhes do pet {id} - A implementar" });
    }

    /// <summary>
    /// Cadastra um novo pet
    /// </summary>
    [HttpPost]
    public IActionResult CreatePet([FromBody] CreatePetRequest request)
    {
        // TODO: Implementar cadastro de pet
        return Ok(new { message = "Pet cadastrado - A implementar" });
    }

    /// <summary>
    /// Atualiza dados do pet
    /// </summary>
    [HttpPut("{id}")]
    public IActionResult UpdatePet(Guid id, [FromBody] UpdatePetRequest request)
    {
        // TODO: Implementar atualização de pet
        return Ok(new { message = $"Pet {id} atualizado - A implementar" });
    }

    /// <summary>
    /// Remove um pet
    /// </summary>
    [HttpDelete("{id}")]
    public IActionResult DeletePet(Guid id)
    {
        // TODO: Implementar remoção de pet
        return Ok(new { message = $"Pet {id} removido - A implementar" });
    }
}

public record CreatePetRequest(
    string Name,
    int Type,
    string? Breed,
    int? AgeInMonths,
    string? Description,
    string? SpecialNeeds
);

public record UpdatePetRequest(
    string Name,
    int Type,
    string? Breed,
    int? AgeInMonths,
    string? Description,
    string? SpecialNeeds
);
