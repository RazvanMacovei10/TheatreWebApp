﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.DTOs
{
    public class EventDTO
    {
        public int Id { get; set; }
        public DateTime Datetime { get; set; }
        public int AvailableTickets { get; set; }
        public string Location { get; set; }
        public bool Active { get; set; }
        public string City { get; set; }
        public float Price { get; set; }
        public string TheatreName { get; set; }
        public PlayDTO play { get; set; }
    }
}
