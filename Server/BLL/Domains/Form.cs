using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace BLL.Domains
{
    public class Form
    {
        private readonly IMapper _mapper;
        private readonly DAL.Repositories.Form _repository;

        public Form(IConfiguration configuration)
        {
            _repository = new DAL.Repositories.Form(configuration);
            _mapper = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<DAL.Entities.Form, ViewModels.Form>();
                    cfg.CreateMap<ViewModels.Form, DAL.Entities.Form>();
                })
                .CreateMapper();
        }

        public async Task<IEnumerable<ViewModels.Form>> Get()
        {
            var forms = await _repository.Get();
            return forms.Select(form => _mapper.Map<DAL.Entities.Form, ViewModels.Form>(form));
        }

        public async Task<ViewModels.Form> Get(int id)
        {
            var form = await _repository.Get(id);
            return _mapper.Map<DAL.Entities.Form, ViewModels.Form>(form);
        }

        public async Task<ViewModels.Form> Get(string url)
        {
            var form = await _repository.Get(url);
            return _mapper.Map<DAL.Entities.Form, ViewModels.Form>(form);
        }

        public async Task<ViewModels.Form> Create(ViewModels.Form form)
        {
            var newForm = await _repository.Create(_mapper.Map<ViewModels.Form, DAL.Entities.Form>(form));
            if (newForm == null) return null;
            return _mapper.Map<DAL.Entities.Form, ViewModels.Form>(newForm);
        }

        public async Task<ViewModels.Form> Update(ViewModels.Form form)
        {
            var newForm = await _repository.Create(_mapper.Map<ViewModels.Form, DAL.Entities.Form>(form));
            if (newForm == null) return null;
            return _mapper.Map<DAL.Entities.Form, ViewModels.Form>(newForm);
        }

        public bool Delete(int id)
        {
            return _repository.Delete(id);
        }
    }
}