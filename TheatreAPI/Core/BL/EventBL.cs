using BusinessLogic.Abstract;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BL
{
    public class EventBL:IEventBL
    {
        private IEventRepository _eventRepository { get; set; }
        public EventBL(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<List<Event>> GetAll()
        {
            var results = await _eventRepository.GetAll();
            return results;
        }
        public async Task<List<Event>> GetAllAvailable()
        {
            var results = await _eventRepository.GetAllAvailable();
            return results;
        }
        public async Task<List<Event>> GetAllFiltered(int priceFrom,int priceTo, string city,
            string name,string category,DateTime? date)
        {
            var results = await _eventRepository.GetAllFiltered(priceFrom,priceTo,city,name,category,date);
            return results;
        }

        public async Task<Event> GetById(int id)
        {
            var result = await _eventRepository.GetById(id);
            return result;
        }
        public async Task<Event> Add(Event eventAdded)
        {
            return await _eventRepository.Add(eventAdded);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _eventRepository.DeleteAsync(id);
        }
        public async Task<Event> UpdateEventAsync(int eventId, Event eventSent)
        {
            return await _eventRepository.UpdateEventAsync(eventId, eventSent);
        }
    }
}
