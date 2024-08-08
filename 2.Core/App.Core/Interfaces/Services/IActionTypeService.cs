using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IActionTypeService : IBaseService<Guid, ActionTypeInputModel, ActionTypeViewModel>
    {
        Task<ActionTypeViewModel?> InsertAsync(ActionTypeInputModel model, bool is_force_save);
        Task<ActionTypeViewModel?> UpdateAsync(Guid id, ActionTypeInputModel model, bool is_force_save);
     	Task<List<ActionTypeViewModel>> GetListBySearchAsync(ActionTypeSearchModel model);
		Task<int> UpdateMultipleAsync(List<ActionTypeInputModel> model, bool is_force_save);
        Task<ActionTypeWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<ActionTypeWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<ActionTypeEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(ActionTypeReportRequestModel model);



    }
}

