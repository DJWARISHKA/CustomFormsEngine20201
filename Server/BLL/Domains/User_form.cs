using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace BLL.Domains
{
    public class User_form
    {
        private readonly IMapper _mapper;
        private readonly DAL.Repositories.User_form _repository;

        public User_form(IConfiguration configuration)
        {
            _repository = new DAL.Repositories.User_form(configuration);
            _mapper = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<DAL.Entities.User_form, ViewModels.User_form>();
                    cfg.CreateMap<ViewModels.User_form, DAL.Entities.User_form>();
                })
                .CreateMapper();
        }

        public async Task<IEnumerable<ViewModels.User_form>> Get()
        {
            var users_forms = await _repository.Get();
            return users_forms.Select(User_form =>
                _mapper.Map<DAL.Entities.User_form, ViewModels.User_form>(User_form));
        }

        public async Task<ViewModels.User_form> Get(string userId, int formId)
        {
            var users_forms = await _repository.Get(userId, formId);
            return _mapper.Map<DAL.Entities.User_form, ViewModels.User_form>(users_forms);
        }

        public async Task<ViewModels.User_form> Get(string userId, string formUrl)
        {
            var users_forms = await _repository.Get(userId, formUrl);
            return _mapper.Map<DAL.Entities.User_form, ViewModels.User_form>(users_forms);
        }

        public async Task<IEnumerable<ViewModels.User_form>> Get(string userId)
        {
            var users_forms = await _repository.Get(userId);
            return users_forms.Select(User_form =>
                _mapper.Map<DAL.Entities.User_form, ViewModels.User_form>(User_form));
        }

        public async Task<IEnumerable<ViewModels.User_form>> Get(int formId)
        {
            var users_forms = await _repository.Get(formId);
            return users_forms.Select(User_form =>
                _mapper.Map<DAL.Entities.User_form, ViewModels.User_form>(User_form));
        }

        public async Task<ViewModels.User_form> Create(ViewModels.User_form users_forms)
        {
            var newUF = await _repository.Create(
                _mapper.Map<ViewModels.User_form, DAL.Entities.User_form>(users_forms));
            if (newUF == null) return null;
            return _mapper.Map<DAL.Entities.User_form, ViewModels.User_form>(newUF);
        }

        public async Task<ViewModels.User_form> Update(ViewModels.User_form users_forms)
        {
            var newUF = await _repository.Create(
                _mapper.Map<ViewModels.User_form, DAL.Entities.User_form>(users_forms));
            if (newUF == null) return null;
            return _mapper.Map<DAL.Entities.User_form, ViewModels.User_form>(newUF);
        }

        public bool Delete(int id)
        {
            return _repository.Delete(id);
        }
    }
}