using AutoMapper;
using App.Domain;

namespace App.Database
{
    public class PlaceMappingProfile : Profile
    {
        public PlaceMappingProfile()
        {
            CreateMap<PlaceInputModel, PlaceEntity>();
            CreateMap<PlaceEntity, PlaceInputModel>();
            CreateMap<PlaceEntity, PlaceViewModel>();
            CreateMap<PlaceEntity, PlaceWithSelectionViewModel>();
        }
    }
}
