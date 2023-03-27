using DataLayer.Entities;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.AbstractServices
{
    public interface IUserBL
    {
        public Task<List<User>> GetAll();
        public Task<User> GetById(int id);
    }
}
