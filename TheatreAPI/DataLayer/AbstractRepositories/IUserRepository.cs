using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface IUserRepository
    {
        public Task<List<User>> GetAll();
        public Task<User> GetById(int userId);

        public Task<User> Add(User user);

        public Task<bool> UserExists(string username);
        public Task<bool> UserByEmailExists(string username);

        public Task<User> GetByUsername(string username);
    }
}
