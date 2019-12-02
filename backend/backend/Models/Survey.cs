using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Survey
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Vote> Votes { get; set; }
        public List<Option> Options { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string PhotoPath { get; set; }
        public string Color { get; set; }
        
    }
}