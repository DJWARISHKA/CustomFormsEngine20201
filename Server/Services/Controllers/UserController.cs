using System;
using System.Threading.Tasks;
using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly JwtService.JwtService _jwtService;
        private readonly UserManager<User> _userManager;
        private SignInManager<User> _signInManager;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager,
            JwtService.JwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<object> PostUser(UserModel model)
        {
            var user = new User
            {
                FullName = model.FullName,
                UserName = model.UserName,
                Email = model.Email,
                Password = model.Password
            };

            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = _jwtService.GenerateJwtToken(user.Email, user);
                return Ok(new {token});
            }

            return BadRequest(new {message = "Emails or password is incorrect!"});
        }
    }
}