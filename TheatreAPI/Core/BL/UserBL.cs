using Core.AbstractServices;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class UserBL : IUserBL
    {
        private IUserRepository _userRepository { get; set; }
        public UserBL(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<User>> GetAll()
        {
            var results = await _userRepository.GetAll();
            return results;
        }

        public async Task<User> GetById(int id)
        {
            var result = await _userRepository.GetById(id);
            return result;
        }
        public void Add(User user)
        {
            _userRepository.Add(user);
        }
        public async Task<bool> UserExists(string username)
        {
            return await _userRepository.UserExists(username);
        }
        public async Task<User> GetByUsername(string username)
        {
            return await _userRepository.GetByUsername(username);
        }

    }
}
