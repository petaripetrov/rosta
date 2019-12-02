using System.Collections.Generic;

namespace backend.Models
{
    public class School
    {
        public int Id { get; set; }
        public List<User> Admins { get; set; }
        public string Name { get; set; }
    }
}