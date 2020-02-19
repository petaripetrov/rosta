using System;
using System.Collections.Generic;
using System.Linq;
using backend.DTOs.OptionDTOs;
using backend.DTOs.VoteDTOs;
using backend.Models.Data;

namespace backend.DTOs.SurveyDTOs
{
    public class SurveySummary
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<VoteSummary> Votes { get; set; }
        public List<OptionSummary> Options { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }

        public string Color { get; set; }

        public SurveySummary(int id, string name, List<VoteSummary> votes, List<OptionSummary> options, DateTime endDate, string description, string photo, string color)
        {
            Id = id;
            Name = name;
            Votes = votes;
            Options = options;
            EndDate = endDate;
            Description = description;
            Photo = photo;
            Color = color;
        }

        public SurveySummary(Survey survey)
        {
            Id = survey.Id;
            Name = survey.Name;
            Votes = survey.Votes.Select(x => new VoteSummary(x)).ToList();
            Options = survey.Options.Select(x => new OptionSummary(x)).ToList();
            EndDate = survey.EndDate;
            Description = survey.Description;
            Photo = survey.PhotoPath;
            Color = survey.Color;
        }
    }
    
    
    
}