using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using RepairOps.API.Data;
using RepairOps.API.Interfaces;
using RepairOps.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddOpenApi();

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Auth Service
builder.Services.AddScoped<IAuthService, AuthService>();
// Customer Service
builder.Services.AddScoped<ICustomerService, CustomerService>();
// Repair Ticket Service
builder.Services.AddScoped<IRepairTicketService, RepairTicketService>();
// Device Service
builder.Services.AddScoped<IDeviceService, DeviceService>();
// Inventory Service
builder.Services.AddScoped<IInventoryService, InventoryService>();
// Ticket Service Service
builder.Services.AddScoped<ITicketServiceService, TicketServiceService>();
// Service Price Service
builder.Services.AddScoped<IServicePriceService, ServicePriceService>();
// User Service
builder.Services.AddScoped<IUserService, UserService>();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"]!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey))
        };
    });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


app.Run();