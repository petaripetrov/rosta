using System;

namespace backend.Models.Data
{
    public class Vote
    {
        //TODO Fix adding new entry issue
        public int Id { get; set; }
        public DateTime Date { get; private set; }
        public int SurveyId { get; set; }
        public Survey Survey { get; private set; }
        public int OptionId { get; set; }
        public Option Option { get; private set; }

        public Vote()
        {
        }

        public Vote(DateTime date, Survey survey, Option option)
        {
            if (survey == null)
            {
                throw new ArgumentNullException("Survey cannot be null. ");
            }
            else if (option == null)
            {
                throw  new ArgumentNullException("Option cannot be null. ");
            }

            Date = date;
            SurveyId = survey.Id;
            OptionId = option.Id;
        }

        
        
    }
}