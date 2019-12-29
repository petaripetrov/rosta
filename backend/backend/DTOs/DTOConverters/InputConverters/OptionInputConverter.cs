using backend.DTOs.OptionDTOs;
using backend.Models;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class OptionInputConverter
    {
        public static Option Convert(OptionInput input)
        {
            var repo = new SurveyRepository();
            return new Option(input.Name,repo.GetById(input.SurveyId));
        }
    }
}