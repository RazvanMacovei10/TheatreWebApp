using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Abstract
{
    public interface ITheatreBL
    {
        public Task<List<Theatre>> GetAll();
        public Task<Theatre> GetById(int id);
        public Task<Theatre> Add(Theatre theatre);
        public Task<Theatre> GetByUsername(string username);
        public Task<Theatre> UpdateTheatreAsync(int theatreId, Theatre theatreSent);
    }
}
