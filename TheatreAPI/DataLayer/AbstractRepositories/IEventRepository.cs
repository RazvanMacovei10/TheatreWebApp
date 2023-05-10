using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface IEventRepository
    {
        public Task<List<Event>> GetAll();
        public Task<List<Event>> GetAllFiltered(string city, string name);
        public Task<Event> GetById(int eventId);
        public Task<Event> Add(Event eventAdded);
        Task<bool> DeleteAsync(int id);
    }
}
