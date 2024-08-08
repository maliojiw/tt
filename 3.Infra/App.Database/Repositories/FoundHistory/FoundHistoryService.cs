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
    public class FoundHistoryService : IFoundHistoryService
    {
        private IBaseRepository<FoundHistoryEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FoundHistoryService(
            IBaseRepository<FoundHistoryEntity, Guid> repository, 
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

        private FoundHistoryEntity GetEntity(FoundHistoryInputModel model)
        {
            return _mapper.Map<FoundHistoryEntity>(model);
        }
        private FoundHistoryViewModel GetDto(FoundHistoryEntity entity)
        {
            return _mapper.Map<FoundHistoryViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<FoundHistoryViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<FoundHistoryEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<FoundHistoryWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<FoundHistoryWithSelectionViewModel>(entity);
            i.item_countTypeId = await _dataContext.CountTypes.Select(x => _mapper.Map<CountTypeViewModel>(x)).ToListAsync();
            i.item_placeId = await _dataContext.Places.Select(x => _mapper.Map<PlaceViewModel>(x)).ToListAsync();
            i.item_totalFound = await _dataContext.CountGroups.Select(x => _mapper.Map<CountGroupViewModel>(x)).ToListAsync();
            i.item_userId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<FoundHistoryWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new FoundHistoryWithSelectionViewModel();
            i.item_countTypeId = await _dataContext.CountTypes.Select(x => _mapper.Map<CountTypeViewModel>(x)).ToListAsync();
            i.item_placeId = await _dataContext.Places.Select(x => _mapper.Map<PlaceViewModel>(x)).ToListAsync();
            i.item_totalFound = await _dataContext.CountGroups.Select(x => _mapper.Map<CountGroupViewModel>(x)).ToListAsync();
            i.item_userId = await _dataContext.Users.Select(x => _mapper.Map<UserViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<FoundHistoryViewModel>> GetListBySearchAsync(FoundHistorySearchModel model)
        {
            var data = await (
                from m_foundhistory in _dataContext.FoundHistorys

                join fk_counttype2 in _dataContext.CountTypes on m_foundhistory.countTypeId equals fk_counttype2.id
                into counttypeResult2
                from fk_counttypeResult2 in counttypeResult2.DefaultIfEmpty()

                join fk_place3 in _dataContext.Places on m_foundhistory.placeId equals fk_place3.id
                into placeResult3
                from fk_placeResult3 in placeResult3.DefaultIfEmpty()

                join fk_countgroup4 in _dataContext.CountGroups on m_foundhistory.totalFound equals fk_countgroup4.id
                into countgroupResult4
                from fk_countgroupResult4 in countgroupResult4.DefaultIfEmpty()

                join fk_user6 in _dataContext.Users on m_foundhistory.userId equals fk_user6.id
                into userResult6
                from fk_userResult6 in userResult6.DefaultIfEmpty()


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.note) || m_foundhistory.note.Contains(model.note))


                orderby m_foundhistory.created descending
                select new FoundHistoryViewModel()
                {
                    id = m_foundhistory.id,
                    foundDate = m_foundhistory.foundDate,
                    countTypeId = m_foundhistory.countTypeId,
                    placeId = m_foundhistory.placeId,
                    totalFound = m_foundhistory.totalFound,
                    note = m_foundhistory.note,
                    userId = m_foundhistory.userId,

                    countTypeId_CountType_name = fk_counttypeResult2.name,
                    placeId_Place_name = fk_placeResult3.name,
                    totalFound_CountGroup_name = fk_countgroupResult4.name,
                    userId_User_nickname = fk_userResult6.nickname,

                    isActive = m_foundhistory.isActive,
                    created = m_foundhistory.created,
                    updated = m_foundhistory.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<FoundHistoryViewModel?> InsertAsync(FoundHistoryInputModel model, bool is_force_save)
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
                return _mapper.Map<FoundHistoryViewModel>(entity);
            }
        }

        public async Task<FoundHistoryViewModel?> UpdateAsync(Guid id, FoundHistoryInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.foundDate = model.foundDate;
                existingEntity.countTypeId = model.countTypeId;
                existingEntity.placeId = model.placeId;
                existingEntity.totalFound = model.totalFound;
                existingEntity.note = model.note;
                existingEntity.userId = model.userId;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<FoundHistoryViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<FoundHistoryInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.foundDate = i.foundDate;
                existingEntity.countTypeId = i.countTypeId;
                existingEntity.placeId = i.placeId;
                existingEntity.totalFound = i.totalFound;
                existingEntity.note = i.note;
                existingEntity.userId = i.userId;


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
            var all_items = _dataContext.FoundHistorys;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(FoundHistoryReportRequestModel model)
        {
            using (var httpclient = new HttpClient())
            {
                string mainurl = MyHelper.GetConfig(_configuration, "JasperReportServer:MainURL");
                string reportsite = MyHelper.GetConfig(_configuration, "JasperReportServer:reportsite");
                string username = MyHelper.GetConfig(_configuration, "JasperReportServer:username");
                string password = MyHelper.GetConfig(_configuration, "JasperReportServer:password");

                string url = $"{mainurl}{reportsite}/foundHistory.{model.filetype}?{MyHelper.GetParameterForJasperReport(model)}&j_username={username}&j_password={password}";

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