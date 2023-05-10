﻿using BusinessLogic.Abstract;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
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
        public async Task<List<Event>> GetAllFiltered(string city,string name)
        {
            var results = await _eventRepository.GetAllFiltered(city,name);
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
    }
}
