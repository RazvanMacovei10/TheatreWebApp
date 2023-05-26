using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface ITheatreRepository
    {
        public Task<List<Theatre>> GetAll();
        public Task<Theatre> GetById(int theatreId);

        public Task<Theatre> Add(Theatre theatre);
        public Task<Theatre> GetByUsername(string username);
        public Task<Theatre> UpdateTheatreAsync(int theatreId, Theatre theatreSent);
    }
}
