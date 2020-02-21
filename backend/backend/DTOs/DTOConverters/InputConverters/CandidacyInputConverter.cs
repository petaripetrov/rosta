using backend.DTOs.CandidacyDTOs;
using backend.Models.Data;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class CandidacyInputConverter
    {
        public static Candidacy Convert(CandidacyInput input, int OwnerId)
        {
            return new Candidacy(input.Name,input.Description,"",new UserDetailsRepository().GetById(OwnerId));
        }
    }
}