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
        public Task<Event> GetById(int id);
        public Task<Event> Add(Event play);
        public Task<bool> DeleteAsync(int id);
    }
}
