using App.Core;
using App.Domain;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics.Metrics;

namespace App.Database
{
    public static class Seed
    {
        public static async Task SeedAsync(DataContext db)
        {

            var isNeedSeed = false;


            if (isNeedSeed) await db.SaveChangesAsync();
        }
    }


}
