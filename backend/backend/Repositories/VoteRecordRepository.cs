using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;

namespace backend.Repositories
{
    public class VoteRecordRepository : IRepository<VoteRecord>
    {
        public void Add(VoteRecord value)
        {
            using (var context = new DataContext())
            {
                context.VoteRecords.Add(value);
                context.SaveChanges();
            }
        }

        public void Delete(VoteRecord value)
        {
            using (var context = new DataContext())
            {
                context.VoteRecords.Remove(value);
                context.SaveChanges();
            }
        }

        public VoteRecord GetById(int id)
        {
            var context = new DataContext();
            return context.VoteRecords.First(x => x.Id == id);
        }

        public void Edit(VoteRecord value)
        {
            using (var context = new DataContext())
            {
                context.VoteRecords.Update(value);
                context.SaveChanges();
            }
        }

        public IEnumerable<VoteRecord> GetAll()
        {
            var context = new DataContext();
            return context.VoteRecords.ToList();
        }
    }
}