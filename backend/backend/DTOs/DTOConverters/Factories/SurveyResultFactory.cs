using System.Linq;
using backend.DTOs.VoteDTOs;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.Factories
{
    public static class SurveyResultFactory
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="optionId"></param>
        /// <returns></returns>
        public static SurveyResult GetResult(int optionId)
        {
            var voteRepository = new VoteRepository();
            var count = voteRepository.GetAll().Count(x => x.OptionId == optionId);
            var optionRepository = new OptionRepository();
            var name = optionRepository.GetById(optionId).Name;
            
            var result = new SurveyResult(name,count);
            return result;

        }
    }
}