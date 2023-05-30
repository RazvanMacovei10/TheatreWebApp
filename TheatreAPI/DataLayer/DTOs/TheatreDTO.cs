using DataLayer.Entities;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.DTOs
{
    public class TheatreDTO
    {
        public Address Address { get; set; }
        public UserDTO User { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public List<EventDTO> Events { get; set; }
    }
}
