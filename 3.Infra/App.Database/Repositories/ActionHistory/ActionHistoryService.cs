using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;
using System.IO;
using System.Web;
using System.Net;
using Microsoft.Extensions.Options;
using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using App.Core;
using Microsoft.AspNetCore.Http;
using IdentityModel;
using TTSW.Utils;
using TTSW.Constant;

namespace App.Database
{
    public class ActionHistoryService : IActionHistoryService
    {
        private IBaseRepository<ActionHistoryEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ActionHistoryService(
            IBaseRepository<ActionHistoryEntity, Guid> repository, 
            IMapper mapper, 
            IConfiguration configuration,
            DataContext dataContext,
            IHttpContextAccessor httpContextAccessor
            )
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;
        }

        #region Private Functions

        private string? UserId => _httpContextAccessor?.HttpContext?.User?.FindFirst(JwtClaimTypes.Id)?.Value;
        private string? Role => _httpContextAccessor?.HttpContext?.User?.FindFirst(JwtClaimTypes.Role)?.Value;

        private ActionHistoryEntity GetEntity(ActionHistoryInputModel model)
        {
            return _mapper.Map<ActionHistoryEntity>(model);
        }
        private ActionHistoryViewModel GetDto(ActionHistoryEntity entity)
        {
            return _mapper.Map<ActionHistoryViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<ActionHistoryViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<ActionHistoryEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<ActionHistoryWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<ActionHistoryWithSelectionViewModel>(entity);
            i.item_userId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();
            i.item_actionId = await _dataContext.ActionTypes.Select(x => _mapper.Map<ActionTypeViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<ActionHistoryWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new ActionHistoryWithSelectionViewModel();
            i.item_userId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();
            i.item_actionId = await _dataContext.ActionTypes.Select(x => _mapper.Map<ActionTypeViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<ActionHistoryViewModel>> GetListBySearchAsync(ActionHistorySearchModel model)
        {
            var data = await (
                from m_actionhistory in _dataContext.ActionHistorys

                join fk_user3 in _dataContext.Users on m_actionhistory.userId equals fk_user3.id
                into userResult3
                from fk_userResult3 in userResult3.DefaultIfEmpty()

                join fk_actiontype4 in _dataContext.ActionTypes on m_actionhistory.actionId equals fk_actiontype4.id
                into actiontypeResult4
                from fk_actiontypeResult4 in actiontypeResult4.DefaultIfEmpty()


				where
                1 == 1 
                && (!model.actionDate.HasValue || m_actionhistory.actionDate == model.actionDate)
                && (string.IsNullOrEmpty(model.note) || m_actionhistory.note.Contains(model.note))
                && (!model.userId.HasValue || m_actionhistory.userId == model.userId)
                && (!model.actionId.HasValue || m_actionhistory.actionId == model.actionId)


                orderby m_actionhistory.created descending
                select new ActionHistoryViewModel()
                {
                    id = m_actionhistory.id,
                    actionDate = m_actionhistory.actionDate,
                    note = m_actionhistory.note,
                    userId = m_actionhistory.userId,
                    actionId = m_actionhistory.actionId,

                    userId_User_nickname = fk_userResult3.nickname,
                    actionId_ActionType_name = fk_actiontypeResult4.name,

                    isActive = m_actionhistory.isActive,
                    created = m_actionhistory.created,
                    updated = m_actionhistory.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<ActionHistoryViewModel?> InsertAsync(ActionHistoryInputModel model, bool is_force_save)
        {
            var entity = GetEntity(model);
            entity.id = Guid.NewGuid();


            
            if (is_force_save)
            {
                var inserted = await _repository.InsertAsync(entity);
                return await GetAsync(inserted.id);
            }
            else
            {
                await _repository.InsertWithoutCommitAsync(entity);
                return _mapper.Map<ActionHistoryViewModel>(entity);
            }
        }

        public async Task<ActionHistoryViewModel?> UpdateAsync(Guid id, ActionHistoryInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.actionDate = model.actionDate;
                existingEntity.note = model.note;
                existingEntity.userId = model.userId;
                existingEntity.actionId = model.actionId;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<ActionHistoryViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<ActionHistoryInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.actionDate = i.actionDate;
                existingEntity.note = i.note;
                existingEntity.userId = i.userId;
                existingEntity.actionId = i.actionId;


                        await _repository.UpdateWithoutCommitAsync(i.id.Value, existingEntity);
                    }
                }
                else if (i.active_mode == "1" && !i.id.HasValue) // add
                {
                    var entity = GetEntity(i);
                    entity.id = Guid.NewGuid();
                    await _repository.InsertWithoutCommitAsync(entity);
                }
                else if (i.active_mode == "0" && i.id.HasValue) // remove
                {                    
                    await _repository.DeleteWithoutCommitAsync(i.id.Value);
                }
                else if (i.active_mode == "0" && !i.id.HasValue)
                {
                    // nothing to do
                }                
            }
            if (is_force_save)
            {
                await _dataContext.SaveChangesAsync();
            } 

            return model.Count;
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);

            return;
        }

		public async Task RefreshAutoFieldOfAllDataAsync()
        {
            var all_items = _dataContext.ActionHistorys;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(ActionHistoryReportRequestModel model)
        {
            using (var httpclient = new HttpClient())
            {
                string mainurl = MyHelper.GetConfig(_configuration, "JasperReportServer:MainURL");
                string reportsite = MyHelper.GetConfig(_configuration, "JasperReportServer:reportsite");
                string username = MyHelper.GetConfig(_configuration, "JasperReportServer:username");
                string password = MyHelper.GetConfig(_configuration, "JasperReportServer:password");

                string url = $"{mainurl}{reportsite}/xxใส่ชื่อรายงานตรงนี้xx.{model.filetype}?{MyHelper.GetParameterForJasperReport(model)}&j_username={username}&j_password={password}";

                if (model.filetype == "xlsx")
                {
                    url += "&ignorePagination=true";
                }

                using (var data = await httpclient.GetAsync(url))
                using (var content = data.Content)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        var stream = await content.ReadAsStreamAsync();
                        stream.CopyTo(memoryStream);
                        return memoryStream.ToArray();
                    }
                }
                
            }
        }

    }
}