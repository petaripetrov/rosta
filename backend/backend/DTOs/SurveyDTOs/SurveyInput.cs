using System;
using backend.Models;

namespace backend.DTOs.SurveyDTOs
{
    public class SurveyInput
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public string Color { get; set; }
        public User Author { get; set; }
        
        
    }
}