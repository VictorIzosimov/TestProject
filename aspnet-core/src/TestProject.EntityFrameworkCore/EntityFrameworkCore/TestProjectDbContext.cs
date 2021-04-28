using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using TestProject.Authorization.Roles;
using TestProject.Authorization.Users;
using TestProject.MultiTenancy;
using TestProject.Contacts;

namespace TestProject.EntityFrameworkCore
{
    public class TestProjectDbContext : AbpZeroDbContext<Tenant, Role, User, TestProjectDbContext>
    {
        /* Define a DbSet for each entity of the application */


        public DbSet<Contact> Contacts {get;set; }

        public TestProjectDbContext(DbContextOptions<TestProjectDbContext> options)
            : base(options)
        {
        }
    }
}
