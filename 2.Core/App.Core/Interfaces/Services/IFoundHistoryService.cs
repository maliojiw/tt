using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IFoundHistoryService : IBaseService<Guid, FoundHistoryInputModel, FoundHistoryViewModel>
    {
        Task<FoundHistoryViewModel?> InsertAsync(FoundHistoryInputModel model, bool is_force_save);
        Task<FoundHistoryViewModel?> UpdateAsync(Guid id, FoundHistoryInputModel model, bool is_force_save);
     	Task<List<FoundHistoryViewModel>> GetListBySearchAsync(FoundHistorySearchModel model);
		Task<int> UpdateMultipleAsync(List<FoundHistoryInputModel> model, bool is_force_save);
        Task<FoundHistoryWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<FoundHistoryWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<FoundHistoryEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(FoundHistoryReportRequestModel model);



    }
}

