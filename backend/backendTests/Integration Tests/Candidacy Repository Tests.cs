using System;
using System.Linq;
using backend.Models;
using backend.Repositories;
using NUnit.Framework;

namespace backendTests.Integration_Tests
{
    [TestFixture]
    public class Candidacy_Repository_Tests
    {
        [Test]
        public void Add_Normal_Conditionals()
        {
            var repo = new CandidacyRepository();
            var user = new UserRepository().GetAll().FirstOrDefault();
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
        }

        [Test]
        public void Add_User_Null()
        {
            var repo = new CandidacyRepository();
            User user = null;
            
            
            Assert.Throws<ArgumentNullException>(() =>
            {
                var candidacy = new Candidacy("John","empty description","empty",user);
                repo.Add(candidacy);
            });
        

        }

        [Test]
        public void Add_Name_Null()
        {
            var repo = new CandidacyRepository();
            var user = new User();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var candidacy = new Candidacy(null, "empty description", "empty", user);
                repo.Add(candidacy);
            });

        }

        [Test]
        public void Add_Description_Null()
        {
            var repo = new CandidacyRepository();
            var user = new User();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var candidacy = new Candidacy("John",null,"empty",user);
                repo.Add(candidacy);
            });
           
        }

        [Test]
        public void Edit_Normal_Conditions()
        {
            var repo = new CandidacyRepository();
            var user = new User();
            var userRepo = new UserRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            var temp = repo.GetAll().FirstOrDefault();
            temp.PhotoPath = "foo";
            temp.Description = "bar";
            repo.Edit(temp);
        }

        [Test]
        public void Edit_PhotoPath_Null()
        {
            var repo = new CandidacyRepository();
            var user = new User();
            var userRepo = new UserRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            var temp = repo.GetAll().FirstOrDefault();

            Assert.Throws<ArgumentNullException>(() =>
            {
                temp.PhotoPath = null;
                temp.Description = "bar";
                repo.Edit(temp);
            });
        }

        [Test]
        public void Edit_Description_Null()
        {
            var repo = new CandidacyRepository();
            var user = new User();
            var userRepo = new UserRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            var temp = repo.GetAll().FirstOrDefault();

            Assert.Throws<ArgumentNullException>(() =>
            {
                temp.PhotoPath = "foo";
                temp.Description = null;
                repo.Edit(temp);
            });
        }

        [Test]
        public void Delete_Normal_Conditions()
        {
            var repo = new CandidacyRepository();
            var user = new User();
            var userRepo = new UserRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            repo.Delete(repo.GetAll().FirstOrDefault());
            
        }

       
        
    }
}