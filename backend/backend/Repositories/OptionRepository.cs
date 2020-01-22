using System;
using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend.Repositories
{
    public class OptionRepository : IRepository<Option>
    {
        public void Add(Option value)
        {
            try
            {
                using (var context = new DataContext())
                {
                    context.Options.Add(value);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                
                throw new ArgumentNullException(e.Message);
            }
            
        }

        public void Delete(Option value)
        {
            using (var context = new DataContext())
            {
                context.Options.Remove(value);
                context.SaveChanges();
            }
            
        }

        public Option GetById(int id)
        {
            Option temp = null;
            using (var context = new DataContext())
            {
                temp = context.Options.FirstOrDefault(x => x.Id == id);
                
            }
            return temp;
        }

        public void Edit(Option value)
        {
            using (var context = new DataContext())
            {
                context.Update(value);
            }
        }

        public IEnumerable<Option> GetAll()
        {
            var context = new DataContext();
            return context.Options.ToList();
        }
    }
}