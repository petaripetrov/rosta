using backend.Models.Data;
using Microsoft.AspNetCore.Identity;

namespace backend.Models.Identity
{
    public class User : IdentityUser
    {
        public int DetailsId { get; set; }

        public User(string userName, string email)
        {
            Email = email;
            UserName = userName;
        }

        public User()
        {
            
        }
    }
}