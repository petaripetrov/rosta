using System;
using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models;
using Microsoft.Extensions.Options;

namespace backend.Repositories
{
    public class OptionRepository : IRepository<Option>
    {
        public void Add(Option value)
        {
            try
            {
                using (var context = new Context())
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
            using (var context = new Context())
            {
                context.Options.Remove(value);
                context.SaveChanges();
            }
            
        }

        public Option GetById(int id)
        {
            Option temp = null;
            using (var context = new Context())
            {
                temp = context.Options.FirstOrDefault(x => x.Id == id);
                
            }
            return temp;
        }

        public void Edit(Option value)
        {
            using (var context = new Context())
            {
                context.Update(value);
            }
        }

        public IEnumerable<Option> GetAll()
        {
            var context = new Context();
            return context.Options.ToList();
        }
    }
}