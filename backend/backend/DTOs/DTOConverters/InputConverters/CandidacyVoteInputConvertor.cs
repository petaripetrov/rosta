using backend.DTOs.CandidacyVoteDTOs;
using backend.Models.Data;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class CandidacyVoteInputConvertor
    {
        public static CandidacyVote Convert(CandidacyVoteInput input)
        {
            return new CandidacyVote(input.CandidacyId);
        }
    }
}