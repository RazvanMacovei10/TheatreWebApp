using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface IPlayRepository
    {
        public Task<List<Play>> GetAll();
        public Task<Play> GetById(int playId);

        public Task<Play> Add(Play play);
        Task<bool> DeleteAsync(int id);
    }
}
