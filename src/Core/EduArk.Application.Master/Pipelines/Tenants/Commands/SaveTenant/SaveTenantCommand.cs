﻿using EduArk.Application.Master.Common.Constants;
using EduArk.Application.Master.DTOs.CommonDTOs;
using EduArk.Application.Master.DTOs.TenantsDTO;
using EduArk.Domain.Entities.Master;
using EduArk.Domain.Repositories.Command.Master;
using EduArk.Domain.Repositories.Query.Master;
using MediatR;

namespace EduArk.Application.Master.Pipelines.Tenants.Commands.SaveTenant
{
    public record SaveTenantCommand(TenantDetailsDTO tenantDetails) : IRequest<ResultDTO>;


    public class SaveTenantCommandHandler : IRequestHandler<SaveTenantCommand, ResultDTO>
    {
        private readonly ITenantCompanyQueryRepository _tenantCompanyQueryRepository;
        private readonly ITenantCompanyCommandRepository _tenantsCompanyCommandRepository;
        public SaveTenantCommandHandler(
            ITenantCompanyQueryRepository tenantCompanyQueryRepository,
            ITenantCompanyCommandRepository tenantsCompanyCommandRepository) 
        {
            this._tenantCompanyQueryRepository = tenantCompanyQueryRepository;
            this._tenantsCompanyCommandRepository = tenantsCompanyCommandRepository;
        }

        public async Task<ResultDTO> Handle(SaveTenantCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var tenant = await _tenantCompanyQueryRepository
                            .GetById(request.tenantDetails.Id, cancellationToken);

                if(tenant == null)
                {
                    tenant = request.tenantDetails.ToEntity();

                    ConfigurTenantConnectionString(tenant, request.tenantDetails);

                    tenant = await _tenantsCompanyCommandRepository.AddAsync(tenant, cancellationToken);

                    return ResultDTO.Success
                        (ApplicationResponseConstant.TENANT_DETAILS_SAVE_SUCCESS_RESPONSE_MESSAGE, tenant.Id);

                }
                else
                {
                    tenant = request.tenantDetails.ToEntity(tenant);

                    await _tenantsCompanyCommandRepository.UpdateAsync(tenant, cancellationToken);

                    return ResultDTO.Success
                      (ApplicationResponseConstant.TENANT_DETAILS_UPDATE_SUCCESS_RESPONSE_MESSAGE, tenant.Id);
                }


                
            }
            catch (Exception ex)
            {

                return ResultDTO.Failure(new List<string>() 
                {
                    ApplicationResponseConstant.COMMON_EXCEPTION_RESPONSE_MESSAGE
                });
            }
        }

        private void ConfigurTenantConnectionString(TenantCompany tenant, TenantDetailsDTO tenantDetails)
        {
            var connectionStringFormat = AppSettingsConstant.TENANT_DATABASE_CONNECTION_STRING_FORMAT;
            tenant.ConnectionString = string.Format(connectionStringFormat, tenantDetails.DatabaseServer, tenant.Domain);
        }
    }
}
