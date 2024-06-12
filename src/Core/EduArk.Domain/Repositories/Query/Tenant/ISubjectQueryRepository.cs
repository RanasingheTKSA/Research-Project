using EduArk.Domain.Repositories.Query.Base;

namespace EduArk.Domain.Repositories.Query.Tenant
{
    public interface ISubjectQueryRepository : IQueryRepository<Subject>
    {
       /* Task<IQueryable<Subject>> GetAllListofSubjectsAsync(CancellationToken cancellationToken);*/
    }
}
