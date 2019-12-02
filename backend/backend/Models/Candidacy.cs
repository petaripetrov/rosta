namespace backend.Models
{
    
    public class Candidacy : Option
    {
        public string Description { get; set; }
        public string PhotoPath { get; set; }
        public User Owner { get; set; }
        
    }
}