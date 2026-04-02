using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] // api/account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        //aggiungo await per attendere il completamento dell'operazione asincrona EmailExists, che verifica se l'email fornita è già in uso. 
        // Se l'email esiste già, viene restituito un BadRequest con un messaggio di errore.
        if (await EmailExists(registerDto.Email)) return BadRequest("Email is already in use");

        //Il blocco using viene utilizzato per creare un'istanza di HMACSHA3_512, che è una classe crittografica che implementa l'algoritmo HMAC con SHA3-512.
        using var hmac = new HMACSHA3_512();

        //Viene creato un nuovo oggetto AppUser, che rappresenta un utente dell'applicazione.
        // Le proprietà DisplayName, Email, PasswordHash e PasswordSalt vengono impostate utilizzando i valori forniti nel registerDto e l'istanza di HMACSHA3_512.
        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();
        //Il metodo ToDto viene chiamato sull'oggetto user per convertire l'entità AppUser in un oggetto UserDto, che rappresenta i dati dell'utente da restituire al client.
        return user.ToDto(tokenService);

    }

    [HttpPost("login")] // api/account/login
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        //Il metodo SingleOrDefaultAsync viene utilizzato per cercare un utente nel database che abbia l'email corrispondente a quella fornita nel loginDto.
        //Se non viene trovato alcun utente con quell'email, il metodo restituirà null.
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
        //Se user è null, significa che non è stato trovato alcun utente con l'email fornita, quindi viene restituito un risultato Unauthorized con un messaggio di errore "Invalid email".
        if (user == null) return Unauthorized("Invalid email");
        //Se viene trovato un utente con l'email fornita, viene creato un oggetto HMACSHA3_512 utilizzando la chiave di SALT (PasswordSalt) dell'utente.
        using var hmac = new HMACSHA3_512(user.PasswordSalt);
        //Il metodo ComputeHash viene quindi utilizzato per calcolare l'hash della password fornita nel loginDto, utilizzando la chiave di SALT dell'utente.
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        //Il ciclo for viene utilizzato per confrontare byte per byte l'hash calcolato (computedHash) con l'hash memorizzato nell'utente (user.PasswordHash).
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }
        return user.ToDto(tokenService);

    }

    //creazione check duplicato email
    //Il metodo EmailExists è un metodo privato che accetta una stringa email come parametro e restituisce un valore booleano che indica se l'email esiste già nel database.
    private async Task<bool> EmailExists(string email)
    {
        //Il metodo utilizza il contesto del database (context) per accedere alla tabella degli utenti (Users) e verifica se esiste un utente con l'email fornita.
        return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}
