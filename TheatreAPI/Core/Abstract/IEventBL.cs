using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Abstract
{
    public interface IEventBL
    {
        public Task<List<Event>> GetAll();
        public Task<List<Event>> GetAllAvailable();
        public Task<List<Event>> GetAllFiltered(int priceFrom, int priceTo, string city, 
            string name,string category,DateTime? date);
        public Task<Event> UpdateEventAsync(int eventId, Event eventSent);
        public Task<Event> GetById(int id);
        public Task<Event> Add(Event play);
        public Task<bool> DeleteAsync(int id);
    }
}
