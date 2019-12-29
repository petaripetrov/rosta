using System;
using System.Linq;
using backend.Infrastructure;
using backend.Models;
using backend.Repositories;
using NUnit.Framework;

namespace backendTests.Integration_Tests
{
    [TestFixture]
    public class UserRepository_Tests
    {
        [Test]
        public void Add_Normal_Conditions()
        {
            var repo = new UserRepository();
            var user = new User();
            repo.Add(user);
        }

        [Test]
        public void Add_Username_Null()
        {
            var repo = new UserRepository();
            
            Assert.Throws<ArgumentNullException>(() =>
            {
                var user = new User(null,"1X523","Bar@mail.com","Student","1");
                repo.Add(user);
            });
        }

        [Test]
        public void Add_School_Not_Null()
        {
            var dbContext = new Context();
            var schoolRepo = new SchoolRepository();
            var repo = new UserRepository();
            var user = new User("Ivan","1X523","Bar@mail.com","Student","1");
            var school = schoolRepo.GetAll().Last();
            repo.Add(user);
            repo.AddSchool(user,school);
            
            
            Assert.True(repo.GetAll().Last().School != null);

        }
        
        [Test]
        public void Add_Password_Null()
        {
            var repo = new UserRepository();
            
            Assert.Throws<ArgumentNullException>(() =>
            {
                var user = new User("foo",null,"Bar@mail.com","Student","1");
                repo.Add(user);
            });
        }
        
        [Test]
        public void Add_Email_Null()
        {
            var repo = new UserRepository();
            
            Assert.Throws<ArgumentNullException>(() =>
            {
                var user = new User("foo","1X523",null,"Student","1");
                repo.Add(user);
            });
        }
        
        [Test]
        public void Add_Role_Null()
        {
            var repo = new UserRepository();
            
            Assert.Throws<ArgumentNullException>(() =>
            {
                var user = new User("foo","1X523","Bar@mail.com",null,"1");
                repo.Add(user);
            });
        }
        
        [Test]
        public void Add_AuthCode_Null()
        {
            var repo = new UserRepository();
            
            Assert.Throws<ArgumentNullException>(() =>
            {
                var user = new User("foo","1X523","Bar@mail.com","Student",null);
                repo.Add(user);
            });
        }

        [Test]
        public void Delete_Normal_Conditions()
        {
            var repo = new UserRepository();
            var user = new User();
            var count = repo.GetAll().Count();
            repo.Add(user);
            repo.Delete(user);
            Assert.IsTrue(repo.GetAll().Count() == count);
        }

        [Test]
        public void Edit_Normal_Condtions()
        {
             var repo = new UserRepository();
             var user = new User();
             var photoPath = user.PhotoPath;
             user.PhotoPath = "./Phtotos./photo.jpg";
             repo.Edit(user);
             Assert.IsTrue(repo.GetById(user.Id).PhotoPath != photoPath);
        }

        [Test]
        public void GetAll()
        {
             var repo = new UserRepository();
             var users = repo.GetAll();
        }
        
        
    }
}