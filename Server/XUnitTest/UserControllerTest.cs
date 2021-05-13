using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Services.Controllers;
using Services.JwtService;
using Services.Models;
using Xunit;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace XUnitTest
{
    public class FakeSignInManager : SignInManager<User>
    {
        public FakeSignInManager(IHttpContextAccessor contextAccessor, UserManager<User> um)
            : base(um,
                contextAccessor,
                new Mock<IUserClaimsPrincipalFactory<User>>().Object,
                new Mock<IOptions<IdentityOptions>>().Object,
                new Mock<ILogger<SignInManager<User>>>().Object,
                null,
                new Mock<DefaultUserConfirmation<User>>().Object)
        {
        }

        public override Task SignInAsync(User user, bool isPersistent, string authenticationMethod = null)
        {
            return Task.FromResult(0);
        }

        public override Task<SignInResult> PasswordSignInAsync(string userName, string password, bool isPersistent,
            bool lockoutOnFailure)
        {
            return Task.FromResult(SignInResult.Success);
        }

        public override Task SignOutAsync()
        {
            return Task.FromResult(0);
        }
    }

    public class UserControllerText
    {
        // ReSharper disable once FieldCanBeMadeReadOnly.Local
        private static List<User> _users = new List<User>
        {
            new User {Id = "1", FullName = "User1", Email = "user1@bv.com", Password = "user1@bv.com"},
            new User {Id = "2", FullName = "User2", Email = "user2@bv.com", Password = "user2@bv.com"}
        };

        private readonly UserController _userController;

        private readonly UserManager<User> _userManager = MockUserManager(_users).Object;

        public UserControllerText()
        {
            var context = new Mock<HttpContext>();
            var contextAccessor = new Mock<IHttpContextAccessor>();
            contextAccessor.Setup(x => x.HttpContext).Returns(context.Object);
            _userController = new UserController(_userManager,
                //new FakeUserManager(_users),
                new FakeSignInManager(contextAccessor.Object, _userManager),
                new JwtService("[INSERT JWT KEY HERE]", 30, "http://localhost"));
        }

        public static Mock<UserManager<TUser>> MockUserManager<TUser>(List<TUser> ls) where TUser : User
        {
            var store = new Mock<IUserStore<TUser>>();
            var mgr = new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);
            mgr.Object.UserValidators.Add(new UserValidator<TUser>());
            mgr.Object.PasswordValidators.Add(new PasswordValidator<TUser>());

            mgr.Setup(x => x.DeleteAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);
            mgr.Setup(x => x.CreateAsync(It.IsAny<TUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success)
                .Callback<TUser, string>((x, y) => ls.Add(x));
            mgr.Setup(x => x.UpdateAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);
            mgr.Setup(x => x.CheckPasswordAsync(It.IsAny<TUser>(), It.IsAny<string>()))
                .ReturnsAsync((TUser x, string y) => ls.Any(u => u.Email == x.Email && u.Password == y));
            mgr.Setup(x => x.FindByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((string y) => ls.FirstOrDefault(u => u.Email == y));
            return mgr;
        }

        [Fact]
        public async Task CreateUser()
        {
            var u = new UserModel
            {
                FullName = "Test",
                UserName = "Test",
                Email = "test@test.ua",
                Password = "testPassword"
            };
            await _userController.PostUser(u);
            Assert.Equal(3, _users.Count);
        }

        [Fact]
        public async Task LoginUser()
        {
            var u = new LoginModel
            {
                Email = "user1@bv.com",
                Password = "user1@bv.com"
            };
            var ok = new OkObjectResult(null);
            var resultOk = await _userController.Login(u);
            Assert.Equal(ok.GetType(), resultOk.GetType());

            u.Password = "123456";
            var bad = new BadRequestObjectResult(new {message = "Emails or password is incorrect!"});

            var resultBad = await _userController.Login(u);
            Assert.Equal(bad.GetType(), resultBad.GetType());
            Assert.NotEqual(resultOk.GetType(), resultBad.GetType());
        }
    }
}