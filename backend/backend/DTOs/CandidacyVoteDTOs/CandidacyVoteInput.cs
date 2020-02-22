namespace backend.DTOs.CandidacyVoteDTOs
{
    public class CandidacyVoteInput
    {
        public int CandidacyId { get; set; }

        public CandidacyVoteInput(int candidacyId)
        {
            CandidacyId = candidacyId;
        }

        public CandidacyVoteInput()
        {
            
        }
    }
}