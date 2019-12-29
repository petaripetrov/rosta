using System;
using backend.DTOs.OptionDTOs;
using backend.Models;

namespace backend.DTOs.VoteDTOs
{
    public class VoteSummary
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public OptionSummary Option { get; set; }

        public VoteSummary(int id, DateTime date, OptionSummary option)
        {
            Id = id;
            Date = date;
            Option = option;
        }

        public VoteSummary(Vote vote)
        {
            Id = vote.Id;
            Date = vote.Date;
            Option = new OptionSummary(vote.Option);
        }
    }
    
    
}