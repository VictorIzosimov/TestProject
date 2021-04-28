using System.Threading.Tasks;
using TestProject.Models.TokenAuth;
using TestProject.Web.Controllers;
using Shouldly;
using Xunit;

namespace TestProject.Web.Tests.Controllers
{
    public class HomeController_Tests: TestProjectWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}