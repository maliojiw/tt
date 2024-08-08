using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface ICountGroupService : IBaseService<Guid, CountGroupInputModel, CountGroupViewModel>
    {
        Task<CountGroupViewModel?> InsertAsync(CountGroupInputModel model, bool is_force_save);
        Task<CountGroupViewModel?> UpdateAsync(Guid id, CountGroupInputModel model, bool is_force_save);
     	Task<List<CountGroupViewModel>> GetListBySearchAsync(CountGroupSearchModel model);
		Task<int> UpdateMultipleAsync(List<CountGroupInputModel> model, bool is_force_save);
        Task<CountGroupWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<CountGroupWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<CountGroupEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(CountGroupReportRequestModel model);



    }
}

