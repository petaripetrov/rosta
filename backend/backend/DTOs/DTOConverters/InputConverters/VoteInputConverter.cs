using backend.DTOs.VoteDTOs;
using backend.Models.Data;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class VoteInputConverter
    {
        public static Vote Convert(VoteInput input)
        {
            var optionRepo = new OptionRepository();
            var surveyRepo = new SurveyRepository();
            
            return new Vote(input.Date,surveyRepo.GetById(input.SurveyId),optionRepo.GetById(input.OptionId));
        }
    }
}