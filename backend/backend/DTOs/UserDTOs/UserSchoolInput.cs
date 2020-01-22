using IdentityServer4.EntityFramework.Entities;

namespace backend.DTOs.UserDTOs
{
    public class UserSchoolInput
    {
        public string UserId { get; set; }
        public int SchoolId { get; set; }
        
    }
}