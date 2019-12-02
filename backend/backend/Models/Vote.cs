using System;

namespace backend.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Survey Survey { get; set; }
        public Option Option { get; set; }
    }
}