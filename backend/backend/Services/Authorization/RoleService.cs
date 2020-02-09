using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Authorization
{
    public static class RoleService
    {
        public static bool CheckRoles(string token,ICollection<string> roles,UserManager<User> _usermanager)
        {
            var handler = new JwtSecurityTokenHandler();

            var sub = handler.ReadJwtToken(token).Payload.Sub;
            var user =  _usermanager.FindByIdAsync(sub).Result;
            var rolesValidity = roles.Select(x => _usermanager.IsInRoleAsync(user, x).Result).ToList();
            return rolesValidity.Contains(true);
        }

        public static List<string> GetAllRoles()
        {
            var roles = new List<string>(){"Admin","SchoolAdmin","User"};
            return roles;
        }

        public static bool CheckRole(string token, string role, UserManager<User> _userManager)
        {
            var handler = new JwtSecurityTokenHandler();
            var sub = handler.ReadJwtToken(token).Payload.Sub;
            var user =  _userManager.FindByIdAsync(sub).Result;
            var roleValidity = _userManager.IsInRoleAsync(user, role).Result;

            return roleValidity;
        }
    }
}