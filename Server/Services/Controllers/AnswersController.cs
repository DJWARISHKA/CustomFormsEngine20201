using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Domains;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly IConfiguration _conf;
        private readonly Dao _context;
        private readonly Form _formDomain;
        private readonly IMapper _mapper;
        private readonly User_form _userFormDomain;

        public AnswersController(Dao context, IConfiguration configuration)
        {
            _context = context;
            _conf = configuration;
            _userFormDomain = new User_form(configuration);
            _formDomain = new Form(configuration);
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<AnswerModel, BLL.ViewModels.User_form>();
                cfg.CreateMap<BLL.ViewModels.User_form, AnswerModel>();
            }).CreateMapper();
        }


        // GET: api/Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnswerModel>>> GetAnswers()
        {
            var answers = await _userFormDomain.Get();
            var a = answers.Select(answer => _mapper.Map<BLL.ViewModels.User_form, AnswerModel>(answer));
            return Ok(a);
        }

        // GET: api/Answers/5
        [HttpGet]
        [Route("useranswers")]
        public async Task<ActionResult<IEnumerable<AnswerModel>>> GetUserAnswers()
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (userId == null) return NotFound();
            var answers = await _context.Users_forms.Where(uf => uf.User_id == userId).ToListAsync();
            if (answers == null) return NotFound();

            return Ok(answers);
        }

        // PUT: api/Answers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer(int id, AnswerModel answerModel)
        {
            if (id != answerModel.Id) return BadRequest();

            //искоренить ересь!!!

            _context.Entry(answerModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Answers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AnswerModel>> PostAnswer(AnswerModel answer)
        {
            var uf = new BLL.ViewModels.User_form();
            uf.User_id = User.Claims.First(c => c.Type == "UserID").Value;
            if (uf.User_id == null) return NotFound();
            var form = await _formDomain.Get(answer.FormUrl);
            if (form == null) return NotFound();
            uf.Form_id = form.Id;

            uf.AnswerDate = answer.AnswerDate;

            uf.jsonAnswer = answer.jAnswer;
            await _userFormDomain.Create(uf);

            return Ok();
        }

        // DELETE: api/Answers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAnswer(int id)
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (userId == null) return NotFound();
            var answer = await _context.Users_forms.FindAsync(id);
            if (answer == null) return NotFound();
            if (answer.User_id != userId) return BadRequest();

            _context.Users_forms.Remove(answer);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool AnswerExists(int id)
        {
            return _context.Users_forms.Any(e => e.Id == id);
        }
    }
}