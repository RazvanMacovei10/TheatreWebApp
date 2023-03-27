using Core.AbstractServices;
using Core.Services;
using DataLayer;
using DataLayer.AbstractRepositories;
using DataLayer.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolicy",

    policy =>
    {
        policy.WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials();
    });

});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
{
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});



builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IUserBL, UserBL>();

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("CorsPolicy");
app.UseWebSockets(new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.Zero,
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
