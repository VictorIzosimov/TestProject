using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace TestProject.Contacts
{
    public class ContactDto : EntityDto<int>
    {
        public string ContactName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
    }
}