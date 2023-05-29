using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.EmailService
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public Message(IEnumerable<string> to, string subject, string content)
        {
            To = new List<MailboxAddress>();
            foreach (string address in to)
            {
                MailboxAddress mailboxAddress = new MailboxAddress(address, address);
                To.Add(mailboxAddress);
            }
            Subject = subject;
            Content = content;
        }
    }
}
