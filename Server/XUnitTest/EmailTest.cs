using Services.Controllers;
using Xunit;

namespace XUnitTest
{
    public class EmailTest
    {
        [Fact]
        public void EmailsValidating()
        {
            Assert.True(MessageController.IsValidEmail("test@test.ua"));
            Assert.False(MessageController.IsValidEmail(""));
            Assert.False(MessageController.IsValidEmail(" "));
            Assert.False(MessageController.IsValidEmail(" @  .  "));
            Assert.False(MessageController.IsValidEmail("test@test@ua"));
            Assert.False(MessageController.IsValidEmail("test.test@ua"));
            Assert.False(MessageController.IsValidEmail("testtest.ua"));
            Assert.False(MessageController.IsValidEmail("test@testua"));
        }
    }
}