
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using App.Database;

namespace App.Database
{
    public class DbMigrationHostedService : IHostedService
    {
        private readonly ILogger<DbMigrationHostedService> _logger;
        private readonly IHostApplicationLifetime _applicationLifetime;
        private readonly DataContext _dataContext;

        private readonly CancellationTokenSource _cancellationTokenSource = new CancellationTokenSource();
        private Task _task;

        public DbMigrationHostedService(ILogger<DbMigrationHostedService> logger,
            IHostApplicationLifetime applicationLifetime,
            DataContext dataContext
            )
        {
            _logger = logger;
            _applicationLifetime = applicationLifetime;
            _dataContext = dataContext;
        }

        private async Task ApplyMigrationAsync(DataContext context, CancellationToken cancellationToken)
        {
            // Getting Environment Name from GitHub Action Runner
            var EnvironmentName = Environment.GetEnvironmentVariable("Environment_Name");
            if (!context.Database.CanConnect()) throw new Exception("The target database name is not found.");
            var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
            var contextName = context.GetType().Name;

            if (pendingMigrations.Any())
            {
                var message = $"{contextName} have {pendingMigrations.Count()} pending migrations to apply.";
                Console.WriteLine($"::notice title=Running Migration ({EnvironmentName})::{message}");
                _logger.LogInformation(message);
                _logger.LogInformation("Applying pending migrations...");
                await context.Database.MigrateAsync(cancellationToken);
            }
            else
            {
                var message = $"{contextName} is up to date. No schema changed";
                _logger.LogInformation(message);
                Console.WriteLine($"::notice title=Running Migration ({EnvironmentName})::{message}");
            }

            var lastAppliedMigration = (await context.Database.GetAppliedMigrationsAsync()).Last();

            // Show latest schema version on GitHub Action
            Console.WriteLine($"::notice title=DB Schema version ({EnvironmentName})::{contextName} on schema version: {lastAppliedMigration}");
            _logger.LogInformation($"{contextName} on schema version: {lastAppliedMigration}");

             await Seed.SeedAsync(context);
        }

        private async Task ExecuteAsync()
        {
            _logger.LogDebug(nameof(ExecuteAsync));
            try
            {
                await ApplyMigrationAsync(_dataContext, _cancellationTokenSource.Token);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                Environment.Exit(-1);
            }
            finally
            {
                _logger.LogDebug($"{nameof(ExecuteAsync)}.finally");
            }

            if (!_cancellationTokenSource.IsCancellationRequested)
            {
                _logger.LogDebug(nameof(_applicationLifetime.StopApplication));
                _applicationLifetime.StopApplication();
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogDebug(nameof(StartAsync));
            _task = Task.Run(ExecuteAsync);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogDebug(nameof(StopAsync));
            if (_task.IsCompleted)
            {
                return Task.CompletedTask;
            }
            _cancellationTokenSource.Cancel();
            return Task.WhenAny(_task, Task.Delay(Timeout.Infinite, cancellationToken));
        }
    }
}
