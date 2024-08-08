using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface ICountTypeService : IBaseService<Guid, CountTypeInputModel, CountTypeViewModel>
    {
        Task<CountTypeViewModel?> InsertAsync(CountTypeInputModel model, bool is_force_save);
        Task<CountTypeViewModel?> UpdateAsync(Guid id, CountTypeInputModel model, bool is_force_save);
     	Task<List<CountTypeViewModel>> GetListBySearchAsync(CountTypeSearchModel model);
		Task<int> UpdateMultipleAsync(List<CountTypeInputModel> model, bool is_force_save);
        Task<CountTypeWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<CountTypeWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<CountTypeEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(CountTypeReportRequestModel model);



    }
}

