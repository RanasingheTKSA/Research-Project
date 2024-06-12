using EduArk.Domain.Entities.Tenant;
using EduArk.Domain.Repositories.Command.Tenant;
using EduArk.Infrastructure.Tenant.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduArk.Infrastructure.Tenant.Repositories.Command.Base
{
    public class RatingCommandRepository : CommandRepository<Rating>, IRatingCommandRepository
    {
        public RatingCommandRepository(TenantDbContext context) : base(context) 
        { 

        }
    }
}
