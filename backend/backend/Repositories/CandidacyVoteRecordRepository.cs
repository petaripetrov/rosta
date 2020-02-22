using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;

namespace backend.Repositories
{
    public class CandidacyVoteRecordRepository : IRepository<CandidacyVoteRecord>
    {
        public void Add(CandidacyVoteRecord value)
        {
            using (var context = new DataContext())
            {
                context.CandidacyVoteRecords.Add(value);
                context.SaveChanges();
            }
        }

        public void Delete(CandidacyVoteRecord value)
        {
            using (var context = new DataContext())
            {
                context.CandidacyVoteRecords.Remove(value);
                context.SaveChanges();
            }
        }

        public CandidacyVoteRecord GetById(int id)
        {
            var context = new DataContext();
            return context.CandidacyVoteRecords.First(x => x.Id == id);
        }

        public void Edit(CandidacyVoteRecord value)
        {
            using (var context = new DataContext())
            {
                context.CandidacyVoteRecords.Update(value);
                context.SaveChanges();
            }
        }

        public IEnumerable<CandidacyVoteRecord> GetAll()
        {
            var context = new DataContext();
            return context.CandidacyVoteRecords.ToList();
        }
    }
}