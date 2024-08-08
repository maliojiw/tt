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
    public class ActionTypeService : IActionTypeService
    {
        private IBaseRepository<ActionTypeEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ActionTypeService(
            IBaseRepository<ActionTypeEntity, Guid> repository, 
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

        private ActionTypeEntity GetEntity(ActionTypeInputModel model)
        {
            return _mapper.Map<ActionTypeEntity>(model);
        }
        private ActionTypeViewModel GetDto(ActionTypeEntity entity)
        {
            return _mapper.Map<ActionTypeViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<ActionTypeViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<ActionTypeEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<ActionTypeWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<ActionTypeWithSelectionViewModel>(entity);


            return i;
        }

        public async Task<ActionTypeWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new ActionTypeWithSelectionViewModel();


            return i;
        }

        public async Task<List<ActionTypeViewModel>> GetListBySearchAsync(ActionTypeSearchModel model)
        {
            var data = await (
                from m_actiontype in _dataContext.ActionTypes


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.name) || m_actiontype.name.Contains(model.name))


                orderby m_actiontype.created descending
                select new ActionTypeViewModel()
                {
                    id = m_actiontype.id,
                    name = m_actiontype.name,


                    isActive = m_actiontype.isActive,
                    created = m_actiontype.created,
                    updated = m_actiontype.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<ActionTypeViewModel?> InsertAsync(ActionTypeInputModel model, bool is_force_save)
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
                return _mapper.Map<ActionTypeViewModel>(entity);
            }
        }

        public async Task<ActionTypeViewModel?> UpdateAsync(Guid id, ActionTypeInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.name = model.name;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<ActionTypeViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<ActionTypeInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.name = i.name;


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
            var all_items = _dataContext.ActionTypes;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(ActionTypeReportRequestModel model)
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