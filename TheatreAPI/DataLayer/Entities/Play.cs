﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities
{
    public class Play
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public bool Active { get; set; }

        public int PlayTypeId { get; set; }
        public PlayType Type { get; set; }
        public int TheatreId { get; set; }
        public Theatre Theatre { get; set; }

    }
}
