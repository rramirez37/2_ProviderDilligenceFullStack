using BackEnd_Proveedores.Data;
using BackEnd_Proveedores.Repository.Implementations;
using BackEnd_Proveedores.Repository.Interfaces;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = builder.Configuration; //app configuration

//*********************************************************************************************
//SERVICES COMMANDS

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//Swagger for visualization
builder.Services.AddSwaggerGen();

//Database
builder.Services.AddDbContext<SupplierDBContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("TestConnection")) //Cambiar para usar otra base de datos
); //Conexion DB

//Mapster configuration
var config = new TypeAdapterConfig();
builder.Services.AddSingleton(config);
builder.Services.AddScoped<IMapper, ServiceMapper>();

//Map scoped services
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();

//*********************************************************************************************
//APP BUILDING COMMANDS
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
