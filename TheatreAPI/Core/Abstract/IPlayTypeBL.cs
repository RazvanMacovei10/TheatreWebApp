using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Abstract
{
    public interface IPlayTypeBL
    {
        public Task<List<PlayType>> GetAll();
        public Task<PlayType> GetById(int id);
        public Task<PlayType> Add(PlayType play);
        public Task<bool> DeleteAsync(int id);
    }
}
