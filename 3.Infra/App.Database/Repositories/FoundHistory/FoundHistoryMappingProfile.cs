using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class FoundHistoryMappingProfile : Profile
    {
        public FoundHistoryMappingProfile()
        {
            CreateMap<FoundHistoryInputModel, FoundHistoryEntity>();
            CreateMap<FoundHistoryEntity, FoundHistoryInputModel>();
            CreateMap<FoundHistoryEntity, FoundHistoryViewModel>();
            CreateMap<FoundHistoryEntity, FoundHistoryWithSelectionViewModel>();
        }
    }
}
