using System;
using System.Collections.Generic;
using backend.DTOs.OptionDTOs;
using backend.Models.Data;

namespace backend.DTOs.SurveyDTOs
{
    public class SurveyInput
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string PhotoPath { get; set; }
        public string Color { get; set; }
        public int AuthorId { get; set; }

        public List<OptionToNewSurveyInput> Options { get; set; }
        
        
    }
}