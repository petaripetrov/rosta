using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        //This Class Should not be here
        public DbSet<Candidacy> Candidacies { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Vote> Votes { get; set; }
        
        
    }
}