using System;
using backend.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration.Ini;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;

namespace backend.Infrastructure
{
    public class DataContext : DbContext
    {
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<Candidacy> Candidacies { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Vote> Votes { get; set; }

        

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DataContext() : base()
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Server=localhost;Port=3306;Database=rostaDb;Uid=root;Pwd=password",
                builder =>
                {
                    builder.EnableRetryOnFailure(
                        maxRetryCount: 2,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                });
            optionsBuilder.EnableSensitiveDataLogging();
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Candidacy>().HasOne<UserDetails>(s => s.Owner).GetInfrastructure()
                .OnDelete(DeleteBehavior.SetNull, ConfigurationSource.Convention);
            
            modelBuilder.Entity<School>().HasMany<UserDetails>(x => x.Users).WithOne(x => x.School);
            
            
            
            base.OnModelCreating(modelBuilder);
        }
    }
}