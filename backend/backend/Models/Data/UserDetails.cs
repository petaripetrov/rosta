using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace backend.Models
{
    public  class UserDetails : IdentityUser<int>
    {
        public int Id { get; set; }
        public string UserName { get; private set; }
        public string Password { get; private set; }
        public string Email { get;  set; }
        public string Role { get; private set; }
        public string PhotoPath { get; set; }
        public string AuthenticationCode { get; private set; }
        
        public int? SchoolId { get; set; } 
        public School School { get; set; }


        public UserDetails()
        {
        }

        public UserDetails(string userName, string password, string email, string role, string authenticationCode)
        {
            if (userName == null)
            {
                throw new ArgumentNullException("Username cannot be null. ");
            }
            else if (password == null)
            {
                throw new ArgumentNullException("Password cannot be null. ");
            }
            else if (email == null)
            {
                throw new ArgumentNullException("Email cannot be null. ");
            }
            else if (role == null)
            {
                throw new ArgumentNullException("Role cannot be null. ");
            }
            else if (authenticationCode == null)
            {
                throw new ArgumentNullException("authenticationCode cannot be null. ");
            }
            
            UserName = userName;
            Password = password;
            Email = email;
            Role = role;
            AuthenticationCode = authenticationCode;
        }
        
        public void ChangePassword(string password)
        {
            if (password == null)
            {
                throw new ArgumentNullException("Password cannot be null. ");
            }

            Password = password;

        }

        public void ChangeRole(string role)
        {
            if (role == null)
            {
                throw new ArgumentNullException("Role cannot be null. ");
            }

            Role = role;
        }
    }
}