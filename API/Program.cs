using System.Text;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
//Aggiungo il servizio ITokenService alla Dependency Injection, specificando che quando viene richiesto un ITokenService, 
//deve essere fornita un'istanza di TokenService.
builder.Services.AddScoped<ITokenService, TokenService>();

/*AddTransient, AddScoped e AddSingleton sono tre modalità per registrare servizi nella Dependency Injection:
AddTransient: crea una nuova istanza ogni volta che il servizio viene richiesto → adatto a servizi leggeri e senza stato.
AddScoped: crea una sola istanza per ogni richiesta HTTP → mantiene lo stato durante quella richiesta.
AddSingleton: crea una sola istanza per tutta l’applicazione → condivisa sempre, ideale per configurazione o logging.*/

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        //come ci autentichiamo?
        //Il metodo AddAuthentication viene utilizzato per configurare l'autenticazione dell'applicazione, specificando lo schema di autenticazione
        //(JwtBearerDefaults.AuthenticationScheme) e le opzioni per la gestione dei token JWT.
        var tokenKey = builder.Configuration["TokenKey"] ?? throw new Exception("Cannot find token key - Program.cs");
        //specifichiamo i parametri di validazione del token, come la chiave di firma (IssuerSigningKey) e le opzioni per la validazione dell'emittente e del pubblico.
        options.TokenValidationParameters = new TokenValidationParameters
        {           
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuer = false, 
            ValidateAudience = false          
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();
/*il primo middleware da eseguire è l'autenticazione, quindi prima so chi sei e dopo so cosa puoi fare, e dopo l'autorizzazione,
 che verifica se l'utente autenticato ha i permessi necessari per accedere alla risorsa richiesta.*/

app.MapControllers();

app.Run();
