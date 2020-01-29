using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;

namespace backend.DTOs.UserDTOs
{
    public class UserSummary
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public UserSummary(string id, string username, string email)
        {
            Id = id;
            Username = username;
            Email = email;
        }

        public UserSummary(UserDetails userDetails)
        {
            Id = userDetails.UserId;
            Username = userDetails.User.UserName;
            Email = userDetails.User.Email;
            
        }
    }
}