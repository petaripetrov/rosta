using System.Linq;
using backend.DTOs.UserDTOs;
using backend.Models.Data;
using backend.Models.Identity;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.Factories
{
    public static class UserSummaryFactory
    {
        public static UserSummary CreateSummary(UserDetails userDetails,User user)
        {
            var schoolRepo = new SchoolRepository();
            
            var summary = new UserSummary(userDetails.UserId,user.UserName,user.Email);
            summary.SchoolId = userDetails.SchoolId;
            if (userDetails.SchoolId != null)
            {
                summary.School = schoolRepo.GetAll().First(x => x.Id == userDetails.SchoolId).Name;
            }
            
            return summary;
        }
    }
}