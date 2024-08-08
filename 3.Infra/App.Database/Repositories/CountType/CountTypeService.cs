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
    public class CountTypeService : ICountTypeService
    {
        private IBaseRepository<CountTypeEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CountTypeService(
            IBaseRepository<CountTypeEntity, Guid> repository, 
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

        private CountTypeEntity GetEntity(CountTypeInputModel model)
        {
            return _mapper.Map<CountTypeEntity>(model);
        }
        private CountTypeViewModel GetDto(CountTypeEntity entity)
        {
            return _mapper.Map<CountTypeViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<CountTypeViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<CountTypeEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<CountTypeWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<CountTypeWithSelectionViewModel>(entity);


            return i;
        }

        public async Task<CountTypeWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new CountTypeWithSelectionViewModel();


            return i;
        }

        public async Task<List<CountTypeViewModel>> GetListBySearchAsync(CountTypeSearchModel model)
        {
            var data = await (
                from m_counttype in _dataContext.CountTypes


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.name) || m_counttype.name.Contains(model.name))


                orderby m_counttype.created descending
                select new CountTypeViewModel()
                {
                    id = m_counttype.id,
                    name = m_counttype.name,


                    isActive = m_counttype.isActive,
                    created = m_counttype.created,
                    updated = m_counttype.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<CountTypeViewModel?> InsertAsync(CountTypeInputModel model, bool is_force_save)
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
                return _mapper.Map<CountTypeViewModel>(entity);
            }
        }

        public async Task<CountTypeViewModel?> UpdateAsync(Guid id, CountTypeInputModel model, bool is_force_save)
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
                    return _mapper.Map<CountTypeViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<CountTypeInputModel> model, bool is_force_save)
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
            var all_items = _dataContext.CountTypes;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(CountTypeReportRequestModel model)
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