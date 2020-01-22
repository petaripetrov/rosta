namespace backend.DTOs.OptionDTOs
{
    public class OptionToExistingSurveyInput : IOptionInput
    {
        public string Name { get; set; }
        public int SurveyId { get; set; }
    }
}