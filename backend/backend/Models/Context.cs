using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
    }
}