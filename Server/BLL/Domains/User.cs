using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace BLL.Domains
{
    public class User
    {
        private readonly IMapper _mapper;
        private readonly DAL.Repositories.User _repository;

        public User(IConfiguration configuration)
        {
            _repository = new DAL.Repositories.User(configuration);
            _mapper = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<DAL.Entities.User, ViewModels.User>();
                    cfg.CreateMap<ViewModels.User, DAL.Entities.User>();
                })
                .CreateMapper();
        }

        public async Task<IEnumerable<ViewModels.User>> Get()
        {
            var users = await _repository.Get();
            return users.Select(User => _mapper.Map<DAL.Entities.User, ViewModels.User>(User));
        }

        public async Task<ViewModels.User> Get(string email)
        {
            var user = await _repository.Get(email);
            return _mapper.Map<DAL.Entities.User, ViewModels.User>(user);
        }
        public async Task<ViewModels.User> GetId(string Id)
        {
            var user = await _repository.GetId(Id);
            return _mapper.Map<DAL.Entities.User, ViewModels.User>(user);
        }

        public async Task<ViewModels.User> Create(ViewModels.User user)
        {
            var newUser = await _repository.Create(_mapper.Map<ViewModels.User, DAL.Entities.User>(user));
            if (newUser == null) return null;
            return _mapper.Map<DAL.Entities.User, ViewModels.User>(newUser);
        }

        public async Task<ViewModels.User> Update(ViewModels.User user)
        {
            var newUser = await _repository.Create(_mapper.Map<ViewModels.User, DAL.Entities.User>(user));
            if (newUser == null) return null;
            return _mapper.Map<DAL.Entities.User, ViewModels.User>(newUser);
        }

        public bool Delete(int id)
        {
            return _repository.Delete(id);
        }
    }
}