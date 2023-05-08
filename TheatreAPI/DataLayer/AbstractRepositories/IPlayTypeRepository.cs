using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface IPlayTypeRepository
    {
        public Task<List<PlayType>> GetAll();
        public Task<PlayType> GetById(int playId);

        public Task<PlayType> Add(PlayType play);
        Task<bool> DeleteAsync(int id);
    }
}
