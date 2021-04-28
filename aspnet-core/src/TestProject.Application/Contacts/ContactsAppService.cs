using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using System.Threading.Tasks;
using TestProject.Authorization;

namespace TestProject.Contacts
{
    [AbpAuthorize(PermissionNames.Pages_Contacts)]
    public class ContactsAppService : CrudAppService<Contact, ContactDto>
    {
        public  ContactsAppService(IRepository<Contact, int> repository) : base(repository)
        {


        }

    }
}
