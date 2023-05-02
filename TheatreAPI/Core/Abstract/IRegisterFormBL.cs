using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Abstract
{
    public interface IRegisterFormBL
    {
        public Task<List<RegisterForm>> GetAll();
        public Task<RegisterForm> GetById(int id);
        public Task<RegisterForm> Add(RegisterForm registerForm);
        public Task<bool> DeleteAsync(int id);
    }
}
