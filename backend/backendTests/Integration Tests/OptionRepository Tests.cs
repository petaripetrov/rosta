using  System;
using System.Linq;
using backend.Models;
using backend.Repositories;
using NUnit.Framework;

namespace backendTests.Integration_Tests
{
    [TestFixture]
    public class OptionRepository_Tests
    {
        [Test]
        public void Add_Normal_Conditions()
        {
            var repo = new OptionRepository();
            var survey = new SurveyRepository().GetAll().First();
            var option = new Option("Option#1",survey);
            repo.Add(option);
        }

        [Test]
        public void Add_Name_Null()
        {
            var repo = new OptionRepository();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var option = new Option(null,new Survey());
                repo.Add(option);
            });

        }

        [Test]
        public void Add_Survey_Null()
        {
            var repo = new OptionRepository();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var option = new Option("Option#1", null);
                repo.Add(option);
            });
        }

        [Test]
        public void Delete_Normal_Conditions()
        {
            var repo = new OptionRepository();
            var survery = new SurveyRepository().GetAll().LastOrDefault();
            var option = new Option("Option#1",survery);
            repo.Add(option);
            
            repo.Delete(repo.GetAll().FirstOrDefault());
            
        }
        
    }
}