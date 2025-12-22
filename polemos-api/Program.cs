using Microsoft.EntityFrameworkCore;
using polemos_api.Types;
using polemos_api.Data;
using polemos_api.Data.Repository;
using polemos_api.Data.Models;
using Microsoft.AspNetCore.Identity;
using polemos_api.Core;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationContext>(options => options.UseInMemoryDatabase("TestDatabase"));

builder.Services.AddScoped<IRepository<ApplicationUser>>(x => new Repository<ApplicationUser>(x.GetRequiredService<ApplicationContext>()));
builder.Services.AddScoped<IRepository<polemos_api.Data.Models.Combatant>>(x => new Repository<polemos_api.Data.Models.Combatant>(x.GetRequiredService<ApplicationContext>()));

builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://localhost:5000", "https://studio.apollographql.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddScoped<PasswordHasher<ApplicationUser>>();
builder.Services.AddScoped<ICombatantService>((sp) => new TransformerService(options =>
    {
        options.Minimum = 1;
        options.Maximum = 20;
    })
);

var app = builder.Build();

app.UseCors();

app.MapGraphQL();

app.Run();
