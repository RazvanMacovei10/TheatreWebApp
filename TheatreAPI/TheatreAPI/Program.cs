using AutoMapper;
using BusinessLogic.Abstract;
using BusinessLogic.BL;
using Core.AbstractServices;
using Core.Services;
using DataLayer;
using DataLayer.AbstractRepositories;
using DataLayer.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TheatreAPI;

var builder = WebApplication.CreateBuilder(args);
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});
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
builder.Services.AddSingleton(mapperConfig.CreateMapper());



builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IUserRoleRepository,UserRoleRepository>();
builder.Services.AddScoped<IPlayTypeRepository, PlayTypeRepository>();
builder.Services.AddScoped<ITheatreRepository,TheatreRepository>();
builder.Services.AddScoped<IEventRepository,EventRepository>();
builder.Services.AddScoped<IPlayRepository,PlayRepository>();
builder.Services.AddScoped<IRegisterFormRepository, RegisterFormRepository>();

builder.Services.AddScoped<IUserBL, UserBL>();
builder.Services.AddScoped<ITokenBL, TokenBL>();
builder.Services.AddScoped<IEventBL, EventBL>();
builder.Services.AddScoped<IUserRoleBL, UserRoleBL>();
builder.Services.AddScoped<IPlayBL, PlayBL>();
builder.Services.AddScoped<IPlayTypeBL, PlayTypeBL>();
builder.Services.AddScoped<ITheatreBL, TheatreBL>();
builder.Services.AddScoped<IRegisterFormBL, RegisterFormBL>();

builder.Services.AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme).
    AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
