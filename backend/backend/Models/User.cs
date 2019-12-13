using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
namespace backend.Models
{
    public  class User
    {
        public int Id { get; set; }
        public string Username { get; private set; }
        public string Password { get; private set; }
        public string Email { get;  set; }
        public string Role { get; private set; }
        public string PhotoPath { get; set; }
        public string AuthenticationCode { get; private set; }

        public User()
        {
        }

        public User(string username, string password, string email, string role, string authenticationCode)
        {
            if (username == null)
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
            
            Username = username;
            Password = password;
            Email = email;
            Role = role;
            AuthenticationCode = authenticationCode;
        }
    }
}