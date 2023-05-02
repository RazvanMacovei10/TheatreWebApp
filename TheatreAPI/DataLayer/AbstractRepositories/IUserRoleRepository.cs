using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface IUserRoleRepository
    {
        public Task<UserRole> GetById(int roleId);
    }
}
