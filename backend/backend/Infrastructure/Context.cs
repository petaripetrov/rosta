using System;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration.Ini;

namespace backend.Infrastructure
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Candidacy> Candidacies { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Vote> Votes { get; set; }

        

        public Context(DbContextOptions<Context> options) : base(options)
        {
            
        }

        public Context() : base()
        {
            
        }
        // A small change

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
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Candidacy>().HasOne<User>(s => s.Owner).GetInfrastructure()
                .OnDelete(DeleteBehavior.SetNull, ConfigurationSource.Convention);
            base.OnModelCreating(modelBuilder);
        }
    }
}