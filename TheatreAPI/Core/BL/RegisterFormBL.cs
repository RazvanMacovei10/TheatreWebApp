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
    public class RegisterFormBL:IRegisterFormBL
    {
        private IRegisterFormRepository _registerFormRepository { get; set; }
        public RegisterFormBL(IRegisterFormRepository registerFormRepository)
        {
            _registerFormRepository = registerFormRepository;
        }

        public async Task<List<RegisterForm>> GetAll()
        {
            var results = await _registerFormRepository.GetAll();
            return results;
        }

        public async Task<RegisterForm> GetById(int id)
        {
            var result = await _registerFormRepository.GetById(id);
            return result;
        }
        public async Task<RegisterForm> Add(RegisterForm registerForm)
        {
            return await _registerFormRepository.Add(registerForm);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _registerFormRepository.DeleteAsync(id);
        }
    }
}
