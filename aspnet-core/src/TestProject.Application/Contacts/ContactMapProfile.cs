using System.Linq;
using AutoMapper;
using Abp.Authorization;
using Abp.Authorization.Roles;
using TestProject.Authorization.Roles;

namespace TestProject.Contacts
{
    public class ContactMapProfile : Profile
    {
        public ContactMapProfile()
        {
            CreateMap<Contact, ContactDto>();
            CreateMap<ContactDto, Contact>();

        }
    }
}
