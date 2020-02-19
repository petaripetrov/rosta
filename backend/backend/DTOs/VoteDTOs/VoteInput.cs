using System;

namespace backend.DTOs.VoteDTOs
{
    public class VoteInput
    {
        public DateTime Date { get; set; }
        public int SurveyId { get; set; }
        public int OptionId { get; set; }

        public VoteInput(DateTime date, int surveyId, int optionId)
        {
            Date = date;
            SurveyId = surveyId;
            OptionId = optionId;
        }

        public VoteInput()
        {
            
        }
    }
}