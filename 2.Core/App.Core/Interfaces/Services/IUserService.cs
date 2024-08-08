using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;

namespace App.Core
{
    public interface IUserService : IBaseService<Guid, UserInputModel, UserViewModel>
    {
        Task<UserViewModel?> InsertAsync(UserInputModel model, bool is_force_save);
        Task<UserViewModel?> UpdateAsync(Guid id, UserInputModel model, bool is_force_save);
     	Task<List<UserViewModel>> GetListBySearchAsync(UserSearchModel model);
		Task<int> UpdateMultipleAsync(List<UserInputModel> model, bool is_force_save);
        Task<UserWithSelectionViewModel> GetWithSelectionAsync(Guid id);
        Task<UserWithSelectionViewModel> GetBlankItemAsync();
		Task RefreshAutoFieldOfAllDataAsync();
        Task<UserEntity?> GetEntityAsync(Guid id);
        Task<byte[]> GetReportStreamAsync(UserReportRequestModel model);



    }
}

