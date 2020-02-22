namespace backend.DTOs.VoteDTOs
{
    public class SurveyResult
    {
        public string Name { get; set; }
        public int Count { get; set; }

        public SurveyResult()
        {
        }

        public SurveyResult(string name, int count)
        {
            Name = name;
            Count = count;
        }
    }
}