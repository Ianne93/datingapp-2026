using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtensions
{
    /*Il metodo di estensione ToDto è definito come un metodo statico all'interno di una classe statica AppUserExtensions.
    Il primo parametro del metodo è "this AppUser user", che indica che questo metodo è un metodo di estensione per la classe AppUser.
    Ciò significa che il metodo può essere chiamato direttamente su un'istanza di AppUser come se fosse un metodo dell'istanza stessa*/
    public static UserDto ToDto(this AppUser user, ITokenService tokenService)
    {
        //Il metodo restituisce un nuovo oggetto UserDto, che rappresenta i dati dell'utente che ha effettuato il login con successo.
        return new UserDto
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            Token = tokenService.CreateToken(user)
        };
    }
}
