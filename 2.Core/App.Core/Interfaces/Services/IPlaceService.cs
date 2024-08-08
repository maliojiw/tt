using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IPlaceService : IBaseService<Guid, PlaceInputModel, PlaceViewModel>
    {
        Task<PlaceViewModel?> InsertAsync(PlaceInputModel model, bool is_force_save);
        Task<PlaceViewModel?> UpdateAsync(Guid id, PlaceInputModel model, bool is_force_save);
     	Task<List<PlaceViewModel>> GetListBySearchAsync(PlaceSearchModel model);
		Task<int> UpdateMultipleAsync(List<PlaceInputModel> model, bool is_force_save);
        Task<PlaceWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<PlaceWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<PlaceEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(PlaceReportRequestModel model);



    }
}

