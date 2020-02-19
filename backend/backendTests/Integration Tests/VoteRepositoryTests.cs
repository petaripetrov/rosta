using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models.Data;
using backend.Repositories;
using NUnit.Framework;

namespace backendTests.Integration_Tests
{
    [TestFixture]
    public class VoteRepositoryTests
    {
        [Test]
        public void Add_Normal_Conditions()
        {
            var repo = new VoteRepository();
            var vote = new Vote();
            vote.OptionId = 2;
            vote.SurveyId = 3;
            repo.Add(vote);
            
        }
        
        [Test]
        public void Add_Survey_Null()
        {
            var repo = new VoteRepository();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var option = new Option();
                var vote = new Vote(DateTime.Now, null,option);
            });
        }
        
        [Test]
        public void Add_Option_Null()
        {
            var repo = new VoteRepository();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var survey = new Survey();
                var vote = new Vote(DateTime.Now, survey,null);
            });
        }
        
        [Test]
        public void Delete_Normal_Conditions()
        {
            var repo = new VoteRepository();
            var vote = new Vote();
            vote.OptionId = 2;
            vote.SurveyId = 3;
            var count = repo.GetAll().Count();
            repo.Add(vote);
            repo.Delete(vote);
            Assert.IsTrue(repo.GetAll().Count() == count);
        }
    }
}