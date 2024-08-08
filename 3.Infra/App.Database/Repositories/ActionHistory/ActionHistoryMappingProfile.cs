using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class ActionHistoryMappingProfile : Profile
    {
        public ActionHistoryMappingProfile()
        {
            CreateMap<ActionHistoryInputModel, ActionHistoryEntity>();
            CreateMap<ActionHistoryEntity, ActionHistoryInputModel>();
            CreateMap<ActionHistoryEntity, ActionHistoryViewModel>();
            CreateMap<ActionHistoryEntity, ActionHistoryWithSelectionViewModel>();
        }
    }
}
