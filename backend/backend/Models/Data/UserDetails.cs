using System;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace backend.Models.Data
{
    public  class UserDetails 
    {
        public int Id { get; set; }
        
        public string PhotoPath { get; set; }
        [NotMapped]
        public User User { get; set; }
        public string UserId { get; set; }
        public int? SchoolId { get; set; } 
        public School School { get; }


        public UserDetails()
        {
        }
        

        public UserDetails(string photoPath, string userId, int? schoolId)
        {
            PhotoPath = photoPath;
            UserId = userId;
            SchoolId = schoolId;
        }
    }
}