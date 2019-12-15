using System;
using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models;

namespace backend.Repositories
{
    public class UserRepository : IRepository<User>
    {
        public void Add(User value)
        {
            try
            {
                using (var context = new Context())
                {
                    context.Users.Add(value);
                    context.SaveChanges();
                }
            }
            catch (ArgumentNullException e)
            {
                throw new ArgumentNullException(e.Message); 
            }
            
        }

        public void Delete(User value)
        {
            using (var context = new Context())
            {
                context.Users.Remove(value);
                context.SaveChanges();
            }
        }

        public User GetById(int id)
        {
            var context = new Context();
            return context.Users.FirstOrDefault(x => x.Id == id);
        }

        public void Edit(User value)
        {
            using (var context = new Context())
            {
                context.Users.Update(value);
                context.SaveChanges();
            }
        }

        public IEnumerable<User> GetAll()
        {
            var context = new Context();
            return context.Users.ToList();
        }
    }
}