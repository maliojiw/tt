using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class CountGroupMappingProfile : Profile
    {
        public CountGroupMappingProfile()
        {
            CreateMap<CountGroupInputModel, CountGroupEntity>();
            CreateMap<CountGroupEntity, CountGroupInputModel>();
            CreateMap<CountGroupEntity, CountGroupViewModel>();
            CreateMap<CountGroupEntity, CountGroupWithSelectionViewModel>();
        }
    }
}
