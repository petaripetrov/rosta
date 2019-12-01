using System.Collections.Generic;

namespace backend.Repositories
{
    public interface IRepository<T>
    {
        void Add (T value);
        void Delete (T value);
        T GetById(int id);
        void Edit(T value);
        IEnumerable<T> GetAll();
        

    }
}