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
    public class UserService : IUserService
    {
        private IBaseRepository<UserEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(
            IBaseRepository<UserEntity, Guid> repository, 
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

        private UserEntity GetEntity(UserInputModel model)
        {
            return _mapper.Map<UserEntity>(model);
        }
        private UserViewModel GetDto(UserEntity entity)
        {
            return _mapper.Map<UserViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<UserViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<UserEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<UserWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<UserWithSelectionViewModel>(entity);


            return i;
        }

        public async Task<UserWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new UserWithSelectionViewModel();


            return i;
        }

        public async Task<List<UserViewModel>> GetListBySearchAsync(UserSearchModel model)
        {
            var data = await (
                from m_user in _dataContext.Users


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.nickname) || m_user.nickname.Contains(model.nickname))
                && (string.IsNullOrEmpty(model.phone) || m_user.phone.Contains(model.phone))


                orderby m_user.created descending
                select new UserViewModel()
                {
                    id = m_user.id,
                    nickname = m_user.nickname,
                    fullname = m_user.fullname,
                    phone = m_user.phone,
                    email = m_user.email,
                    password = m_user.password,
                    isAdmin = m_user.isAdmin,
                    isWorker = m_user.isWorker,
                    isResearcher = m_user.isResearcher,


                    isActive = m_user.isActive,
                    created = m_user.created,
                    updated = m_user.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<UserViewModel?> InsertAsync(UserInputModel model, bool is_force_save)
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
                return _mapper.Map<UserViewModel>(entity);
            }
        }

        public async Task<UserViewModel?> UpdateAsync(Guid id, UserInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.nickname = model.nickname;
                existingEntity.fullname = model.fullname;
                existingEntity.phone = model.phone;
                existingEntity.email = model.email;
                existingEntity.password = model.password;
                existingEntity.isAdmin = model.isAdmin;
                existingEntity.isWorker = model.isWorker;
                existingEntity.isResearcher = model.isResearcher;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<UserViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<UserInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.nickname = i.nickname;
                existingEntity.fullname = i.fullname;
                existingEntity.phone = i.phone;
                existingEntity.email = i.email;
                existingEntity.password = i.password;
                existingEntity.isAdmin = i.isAdmin;
                existingEntity.isWorker = i.isWorker;
                existingEntity.isResearcher = i.isResearcher;


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
            var all_items = _dataContext.Users;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(UserReportRequestModel model)
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