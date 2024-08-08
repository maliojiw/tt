using System;
using Microsoft.EntityFrameworkCore;
using App.Core;
using Microsoft.Extensions.Configuration;
using App.Domain;
using Microsoft.Extensions.Hosting;

namespace App.Database
{
    public class DataContext : DbContext
    {
        public DbSet<ActionHistoryEntity> ActionHistorys { get; set; }
        public DbSet<ActionTypeEntity> ActionTypes { get; set; }
        public DbSet<CountGroupEntity> CountGroups { get; set; }
        public DbSet<CountTypeEntity> CountTypes { get; set; }
        public DbSet<FoundHistoryEntity> FoundHistorys { get; set; }
        public DbSet<PlaceEntity> Places { get; set; }
        public DbSet<UserEntity> Users { get; set; }


        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }       
    }
}


