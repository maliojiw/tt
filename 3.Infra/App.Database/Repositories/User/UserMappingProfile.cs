using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<UserInputModel, UserEntity>();
            CreateMap<UserEntity, UserInputModel>();
            CreateMap<UserEntity, UserViewModel>();
            CreateMap<UserEntity, UserWithSelectionViewModel>();
        }
    }
}
