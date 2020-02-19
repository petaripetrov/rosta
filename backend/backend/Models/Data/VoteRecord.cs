namespace backend.Models.Data
{
    public class VoteRecord
    {
        public int Id { get; set; }
        public int SurveyId { get; set; }
        public int UserDetailsId { get; set; }

        public VoteRecord()
        {
            
        }

        public VoteRecord(int surveyId, int userDetailsId)
        {
            SurveyId = surveyId;
            UserDetailsId = userDetailsId;
        }
    }
}