using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IActionHistoryService : IBaseService<Guid, ActionHistoryInputModel, ActionHistoryViewModel>
    {
        Task<ActionHistoryViewModel?> InsertAsync(ActionHistoryInputModel model, bool is_force_save);
        Task<ActionHistoryViewModel?> UpdateAsync(Guid id, ActionHistoryInputModel model, bool is_force_save);
     	Task<List<ActionHistoryViewModel>> GetListBySearchAsync(ActionHistorySearchModel model);
		Task<int> UpdateMultipleAsync(List<ActionHistoryInputModel> model, bool is_force_save);
        Task<ActionHistoryWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<ActionHistoryWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<ActionHistoryEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(ActionHistoryReportRequestModel model);



    }
}

