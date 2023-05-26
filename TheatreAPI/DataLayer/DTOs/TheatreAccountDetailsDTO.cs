using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.DTOs
{
    public class TheatreAccountDetailsDTO
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public int NumberOfEvents { get; set; }
        public int NumberOfEventsScheduled { get; set; }
    }
}
