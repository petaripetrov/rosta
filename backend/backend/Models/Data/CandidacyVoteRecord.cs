using System;

namespace backend.Models.Data
{
    public class CandidacyVoteRecord
    {
        public int Id { get; set; }
        public int UserDetailsId { get; set; }
        public DateTime Date { get; set; }

        public CandidacyVoteRecord()
        {
        }

        public CandidacyVoteRecord(int userDetailsId)
        {
            UserDetailsId = userDetailsId;
            Date = DateTime.Now;
        }

        public CandidacyVoteRecord(int userDetailsId, DateTime date)
        {
            UserDetailsId = userDetailsId;
            Date = date;
        }
    }
}