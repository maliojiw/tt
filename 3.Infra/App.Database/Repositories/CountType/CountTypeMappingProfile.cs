using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class CountTypeMappingProfile : Profile
    {
        public CountTypeMappingProfile()
        {
            CreateMap<CountTypeInputModel, CountTypeEntity>();
            CreateMap<CountTypeEntity, CountTypeInputModel>();
            CreateMap<CountTypeEntity, CountTypeViewModel>();
            CreateMap<CountTypeEntity, CountTypeWithSelectionViewModel>();
        }
    }
}
