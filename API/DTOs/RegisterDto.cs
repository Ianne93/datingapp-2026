using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    //L'attributo "required" garantisce che la proprietà DisplayName debba essere fornita durante la creazione di un'istanza di RegisterDto.
    //Se questa proprietà non viene fornita, la convalida fallirà e verrà restituito un messaggio di errore.
    [Required]
    public string DisplayName { get; set; } = "";

    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";
    [Required]
    [MinLength(4, ErrorMessage = "Password must be at least 4 characters long.")]
    public string Password { get; set; } = "";
}
