using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Abstract
{
    public interface IPlayBL
    {
        public Task<List<Play>> GetAll();
        public Task<Play> GetById(int id);
        public Task<Play> Add(Play play);
        public Task<bool> DeleteAsync(int id);
    }
}
