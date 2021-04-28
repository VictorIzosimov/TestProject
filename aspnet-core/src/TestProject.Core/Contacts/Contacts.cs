using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject.Contacts
{
    public class Contact : Entity<int>
    {
        public string ContactName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
    }
}
