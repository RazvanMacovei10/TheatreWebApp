using BusinessLogic.Abstract;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BL
{
    public class UserRoleBL:IUserRoleBL
    {
        private IUserRoleRepository _userRoleRepository { get; set; }
        public UserRoleBL(IUserRoleRepository userRoleRepository)
        {
            _userRoleRepository = userRoleRepository;
        }
        public async Task<UserRole> GetById(int userId)
        {
            var result = await _userRoleRepository.GetById(userId);

            return result;
        }
    }
}
