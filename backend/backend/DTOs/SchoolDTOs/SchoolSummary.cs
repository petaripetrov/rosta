using System.Collections.Generic;
using System.Linq;
using backend.DTOs.DTOConverters.Factories;
using backend.DTOs.UserDTOs;
using backend.Models.Data;

namespace backend.DTOs.SchoolDTOs
{
    public class SchoolSummary
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<UserSummary> Users { get; set; }

        public SchoolSummary(int id, string name, List<UserSummary> users)
        {
            Id = id;
            Name = name;
            Users = users;
        }

       
    }
}