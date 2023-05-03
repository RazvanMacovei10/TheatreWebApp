using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.DTOs
{
    public class EventSentDTO
    {
        public int Id { get; set; }
        public string TheatreName { get; set; }
        public int PlayId { get; set; }
        public DateTime datetime { get; set; }
    }
}
