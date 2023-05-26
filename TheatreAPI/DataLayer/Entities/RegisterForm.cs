using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities
{
    public class RegisterForm
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public byte[] Image { get; set; }
        public int TotalSeats { get; set; }
    }
}
