using System.Collections.Generic;

namespace backend.Repositories
{
    /// <summary>
    /// Provides abstaction of data, using Create,Read, Update, Delete (CRUD) operations.  
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T>
    {
        void Add (T value);
        void Delete (T value);
        T GetById(int id);
        void Edit(T value);
        IEnumerable<T> GetAll();
        

    }
}