using DataLayer.Entities;

namespace DataLayer.AbstractRepositories
{
    public interface IRegisterFormRepository
    {
        public Task<List<RegisterForm>> GetAll();
        public Task<RegisterForm> GetById(int registerFormId);

        public Task<RegisterForm> Add(RegisterForm theatre);
        Task<bool> DeleteAsync(int id);
    }
}
