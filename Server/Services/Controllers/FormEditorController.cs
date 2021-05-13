using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Internal;
using BLL.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/home/formeditor")]
    [ApiController]
    public class FormEditorController : ControllerBase
    {
        private readonly AnswerModel _answerModelDomain;
        private readonly IConfiguration _config;
        private readonly Form _formDomain;
        private readonly IMapper _mapper;
        private readonly User_form _userFormDomain;

        public FormEditorController(IConfiguration configuration)
        {
            _formDomain = new Form(configuration);
            _userFormDomain = new User_form(configuration);
            _config = configuration;
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<PostFormModel, BLL.ViewModels.Form>();
                cfg.CreateMap<BLL.ViewModels.Form, PostFormModel>();
            }).CreateMapper();
        }


        private static string Hash(string str)
        {
            var allowedSymbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".ToCharArray();
            var hash = new char[6];

            for (var i = 0; i < str.Length; i++) hash[i % 6] = (char) (hash[i % 6] ^ str[i]);

            for (var i = 0; i < 6; i++) hash[i] = allowedSymbols[hash[i] % allowedSymbols.Length];

            return new string(hash);
        }

        // GET: api/Forms1
        [HttpGet]
        public async Task<IEnumerable<BLL.ViewModels.Form>> GetForms()
        {
            var form = await _formDomain.Get();
            return form;
        }

        [HttpGet("answered")]
        public async Task<IEnumerable<BLL.ViewModels.Form>> GetAnsweredForms()
        {
            var answeredForms = new List<BLL.ViewModels.Form>();
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var answers = await _userFormDomain.Get(userId);

            foreach (var answer in answers)
            {
                var answerForm = await _formDomain.Get(answer.Form_id);
                if (answerForm != null) answeredForms.Add(answerForm);
            }

            return answeredForms;
        }

        [HttpPost("Get")]
        public async Task<ActionResult<PostFormModel>> GetForm(PostFormModel formModel)
        {
            if (string.IsNullOrEmpty(formModel.url) ||
                formModel.url.Length != 6)
                return BadRequest();
            var form = await _formDomain.Get(formModel.url);
            if (form == null) return NotFound();
            if (form.Private)
            {
                var user = User.Claims.First(c => c.Type == "UserID").Value;
                if (user == null) return NotFound();
            }

            formModel = _mapper.Map<BLL.ViewModels.Form, PostFormModel>(form);
            return formModel;
        }

        [HttpPut]
        public async Task<IActionResult> PutForm(PostFormModel formModel)
        {
            if (string.IsNullOrEmpty(formModel.name))
                return BadRequest();
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (userId == null) return NotFound();
            var form = await _formDomain.Get(formModel.url);
            if (form == null) return NotFound();
            var uf = await _userFormDomain.Get(userId, form.Id);
            if (uf == null) return NotFound();
            if (!uf.Can_edit) return BadRequest();

            var formNew = _mapper.Map<BLL.ViewModels.Form>(formModel);
            await _formDomain.Update(formNew);
            (await _userFormDomain.Get(form.Id)).ForAll(usf => _userFormDomain.Delete(usf.Id));
            var userForm = new BLL.ViewModels.User_form
            {
                Form_id = form.Id,
                User_id = userId,
                Can_edit = true
            };
            await new User_form(_config).Create(userForm);
            return Ok();
        }

        [HttpPost("Create")]
        public async Task<ActionResult<BLL.ViewModels.Form>> PostForm(PostFormModel formModel)
        {
            if (string.IsNullOrEmpty(formModel.name))
                return BadRequest();
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (userId == null) return NotFound();
            var form = _mapper.Map<PostFormModel, BLL.ViewModels.Form>(formModel);
            form.Url = Hash(DateTime.Now + formModel.name);
            form = await _formDomain.Create(form);

            var userForm = new BLL.ViewModels.User_form
            {
                Form_id = form.Id,
                User_id = userId,
                Can_edit = true
            };
            await new User_form(_config).Create(userForm);

            return Ok();
        }

        [HttpDelete("{url}")]
        public async Task<IActionResult> DeleteForm(string url)
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (userId == null) return NotFound();
            var form = await _formDomain.Get(url);
            var uf = await _userFormDomain.Get(userId, form.Id);
            if (uf == null) return NotFound();
            if (!uf.Can_edit) return BadRequest();
            (await _userFormDomain.Get(form.Id)).ForAll(usf => _userFormDomain.Delete(usf.Id));
            if (!_formDomain.Delete(form.Id)) BadRequest();
            return Ok();
        }
    }
}