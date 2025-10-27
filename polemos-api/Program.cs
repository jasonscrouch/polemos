using Microsoft.EntityFrameworkCore;
using polemos_api.Types;
using polemos_api.Data;
using polemos_api.Data.Repository;
using polemos_api.Data.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationContext>(options => options.UseInMemoryDatabase("TestDatabase"));

builder.Services.AddScoped<IRepository<ApplicationUser>>(x => new Repository<ApplicationUser>(x.GetRequiredService<ApplicationContext>()));

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

var app = builder.Build();

app.UseCors();

app.MapGraphQL();

app.Run();
