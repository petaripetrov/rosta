using backend.DTOs.UserDTOs;
using backend.Models.Data;
using backend.Models.Identity;

namespace backend.DTOs.DTOConverters.Factories
{
    public static class UserSummaryFactory
    {
        public static UserSummary CreateSummary(UserDetails userDetails,User user)
        {
            var summary = new UserSummary(userDetails.UserId,user.UserName,user.Email);
            return summary;
        }
    }
}