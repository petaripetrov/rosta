using backend.DTOs.CandidacyDTOs;
using backend.Models.Data;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class CandidacyInputConverter
    {
        public static Candidacy Convert(CandidacyInput input)
        {
            return new Candidacy(input.Name,input.Description,input.PhotoPath,new UserDetailsRepository().GetById(input.OwnerId));
        }
    }
}