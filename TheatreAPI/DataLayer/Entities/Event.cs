using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }

        public float Price { get; set; }
        public int AvailableTickets { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public bool Active { get; set; }
        public int PlayId { get; set; }
        public Play Play { get; set; }
        public int TheatreId { get; set; }

        public Theatre Theatre { get; set; }
        
    }
}
