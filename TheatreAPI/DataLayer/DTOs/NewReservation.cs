using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace DataLayer.DTOs
{
    public class NewReservation
    {
        public int Id { get; set; }
        public int NumberOfTickets { get; set; }
        public DateTime DateTime { get; set; }
        public DateTime EventDateTime { get; set; }

        public string EventName { get; set; }
        public User User { get; set; }
    }
}
