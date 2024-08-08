
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.EntityFrameworkCore;
using System;
using App.Database;


var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
var host = new HostBuilder()

    .ConfigureAppConfiguration((hostBuilderContext, configurationBuilder) =>
    {
        configurationBuilder
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: true, true)
        .AddJsonFile($"appsettings.{environment}.json", true, true)
        .AddEnvironmentVariables()
        .Build();

    })
    .ConfigureServices((hostBuilderContext, services) =>
    {
        services.AddDbContext<DataContext>(opt => opt.UseNpgsql(hostBuilderContext.Configuration["ConnectionStrings:DefaultConnection"]));
        services.AddScoped<IHostedService, DbMigrationHostedService>();
    });

await host.RunConsoleAsync();
