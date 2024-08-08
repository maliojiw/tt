using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class ActionTypeMappingProfile : Profile
    {
        public ActionTypeMappingProfile()
        {
            CreateMap<ActionTypeInputModel, ActionTypeEntity>();
            CreateMap<ActionTypeEntity, ActionTypeInputModel>();
            CreateMap<ActionTypeEntity, ActionTypeViewModel>();
            CreateMap<ActionTypeEntity, ActionTypeWithSelectionViewModel>();
        }
    }
}
