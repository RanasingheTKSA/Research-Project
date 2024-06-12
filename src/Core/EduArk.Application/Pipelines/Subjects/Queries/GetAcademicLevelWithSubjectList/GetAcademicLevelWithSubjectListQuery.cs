/*using EduArk.Application.DTOs.SubjectDTOs;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;

namespace EduArk.Application.Pipelines.Subjects.Queries.GetAcademicLevelWithSubjectList
{
    public record GetAcademicLevelWithSubjectListQuery : IRequest<List<SubjectDTO>> { }

    public class GetAcademicLevelWithSubjectListQueryHandler
        : IRequestHandler<GetAcademicLevelWithSubjectListQuery, List<SubjectDTO>>
    {
        private readonly ISubjectQueryRepository _subjectQueryRepository;

        public GetAcademicLevelWithSubjectListQueryHandler(ISubjectQueryRepository subjectQueryRepository)
        {
            _subjectQueryRepository = subjectQueryRepository;
        }

        private async Task<List<SubjectDTO>> Handle(GetAcademicLevelWithSubjectListQuery request, CancellationToken cancellationToken)
        {
            var subjects = await _subjectQueryRepository.GetAll(cancellationToken);

            var filteredSubject = subjects
                    .Where(sub => sub.Id == 1)
                    .ToList();

            var subjectData = filteredSubject.Select(sub => new SubjectDTO
            {
                Id = sub.Id,
                Name = sub.Name,
                SubjectCode = sub.SubjectCode,
                SubjectCategory = sub.SubjectCategory,
                SubjectStreamId = sub.SubjectStreamId,

            }).ToList();

            return subjectData;
        }

    }
}
*/