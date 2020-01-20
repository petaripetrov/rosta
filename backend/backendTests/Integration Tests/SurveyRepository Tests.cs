using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models.Data;
using backend.Repositories;
using NUnit.Framework;

namespace backendTests.Integration_Tests
{
    [TestFixture]
    public class SurveyRepository_Tests
    {
        private static List<Option> options = new List<Option>();
        private static UserDetails owner = new UserDetailsRepository().GetAll().FirstOrDefault();


        [Test]
        public void Add_Normal_Condition()
        {
            var repo = new SurveyRepository();
            var survey = new Survey("Test Survey", DateTime.Today.AddDays(1),
                DateTime.Today.AddDays(2), "Description",
                options, owner);
            repo.Add(survey);
            
            Assert.True(repo.GetAll().Last().Author != null);
        }

        [Test]
        public void Edit_Normal_Conditions()
        {
            var repo = new SurveyRepository();
            var survey = new Survey("Test Survey", DateTime.Today.AddDays(1),
                DateTime.Today.AddDays(2), "Description",
                options, owner);
            repo.Add(survey);
            survey.Color = "#800000";
            repo.Edit(survey);
            
        }
        
        [Test]
        public void Edit_Null_Argument()
        {
            var repo = new SurveyRepository();
            var survey = new Survey("Test Survey", DateTime.Today.AddDays(1),
                DateTime.Today.AddDays(2), "Description",
                options, owner);
            repo.Add(survey);
            Assert.Catch<ArgumentNullException>(() =>
            {
                survey.Color = null;
                repo.Edit(survey);
            });


        }

        [Test]
        public void Delete_Normal_Conditions()
        {
            var repo = new SurveyRepository();
            var survey = repo.GetAll().LastOrDefault();
            repo.Delete(survey);
        }
        
    }
}