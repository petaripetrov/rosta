using backend.Models;

namespace backend.DTOs.UserDTOs
{
    public class UserSummary
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

        public UserSummary(int id, string username, string email, string role)
        {
            Id = id;
            Username = username;
            Email = email;
            Role = role;
        }

        public UserSummary(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Email = user.Email;
            Role = user.Role;
        }
    }
}