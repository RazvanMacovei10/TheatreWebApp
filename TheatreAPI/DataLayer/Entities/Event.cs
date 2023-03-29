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

        public int AvailableSeats { get; set; }
        public int PlayId { get; set; }
        public Play Play { get; set; }
        public int TheatreId { get; set; }

        public Theatre Theatre { get; set; }
        
    }
}
