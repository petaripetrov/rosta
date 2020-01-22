using backend.DTOs.OptionDTOs;
using backend.Models.Data;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class OptionInputConverter
    {
        public static Option Convert(IOptionInput input)
        {
            var repo = new SurveyRepository();
            return new Option(input.Name);
        }
        public static Option Convert(IOptionInput toExistingSurveyInput, int surveyId)
        {
            var repo = new SurveyRepository();
            return new Option(toExistingSurveyInput.Name,surveyId);
        }
        
    }
}