using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/home/[controller]")]
    [ApiController]
    public class AnswersToFileController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly Form _form;
        private readonly User_form _uf;
        private readonly User _user;

        public AnswersToFileController(IConfiguration configuration)
        {
            _form = new Form(configuration);
            _user = new User(configuration);
            _uf = new User_form(configuration);
            _config = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<List<string>>> Get(PostFormModel formModel)
        {
            if (string.IsNullOrEmpty(formModel.url) ||
                formModel.url.Length != 6)
                return BadRequest();
            var form = await _form.Get(formModel.url);
            var uId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _user.GetId(uId);
            var uf = await _uf.Get(user.Id, form.Id);
            if (uf == null)
                return NotFound();
            if (!uf.Can_edit)
                return BadRequest();
            var str = new List<string> {form.Name, !form.Anonym ? "Public" : "Anonym", form.Jform};
            var answers = await _uf.Get(form.Id);
            foreach (var asnw in answers)
            {
                if (!form.Anonym)
                {
                    var u = await _user.GetId(asnw.User_id);
                    str.Add(u != null ? u.FullName : "");
                }

                str.Add(asnw.jsonAnswer);
            }

            return str;
        }
    }
}