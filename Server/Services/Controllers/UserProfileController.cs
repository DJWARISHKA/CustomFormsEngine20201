using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly Dao _context;
        private readonly UserManager<User> _userManager;

        public UserProfileController(UserManager<User> userManager, Dao context)
        {
            _userManager = userManager;
            _context = context;
        }


        [HttpGet]
        [Authorize]
        public async Task<object> GetUserProfile()
        {
            var userID = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userID);

            var userForms = await _context.Users_forms.Where(f => f.User_id == userID).ToListAsync();

            var forms = await _context.Forms.Where(f => userForms.Select(uf => uf.Form_id).Contains(f.Id))
                .ToListAsync();


            return new
            {
                user.Id,
                user.Email,
                user.UserName,
                user.FullName,
                forms
            };
        }
    }
}