using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;
using backend.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace backend.Repositories
{
    public class UserDetailsRepository : IRepository<UserDetails>
    {
        public void Add(UserDetails value)
        {
            using (var context = new DataContext())
            {
                context.Add(value);
                context.SaveChanges();
            }
            
            
        }

        public void Delete(UserDetails value)
        {
            using (var context = new DataContext())
            {
                context.UserDetails.Remove(value);
                context.SaveChanges();
            }
        }

        public UserDetails GetById(int id)
        {
            using (var context = new DataContext())
            {
                return context.UserDetails.FirstOrDefault(x => x.Id == id);
            }
        }
        public UserDetails GetByUserId(string id)
        {
            using (var context = new DataContext())
            {
                return context.UserDetails.FirstOrDefault(x => x.UserId == id);
            }
        }

        public void Edit(UserDetails value)
        {
            using (var context = new DataContext())
            {
                context.Update(value);
                context.SaveChanges();
            }
        }

        public IEnumerable<UserDetails> GetAll()
        {
            using (var context = new DataContext())
            {
                return context.UserDetails.ToList();
            }
        }

        public UserDetailsRepository()
        {
            
        }
    }
}