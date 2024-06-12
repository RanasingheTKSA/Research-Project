using EduArk.Application.DTOs.TenantDTOs;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;

namespace EduArk.Application.Pipelines.Lessons.Queries.GetLessonFromGradeSubject
{
    public record GetLessonFromGradeSubjectQuery : IRequest<List<LessonDTO>>
    {
        public int AcademicLevelId { get; set; }
        public int SubjectId { get; set; }
    }

    public class GetLessonFromGradeSubjectQueryHandler 
                : IRequestHandler<GetLessonFromGradeSubjectQuery, List<LessonDTO>>
    {
        private readonly ILessonQueryRepository _lessonQueryRepository;
        public GetLessonFromGradeSubjectQueryHandler(ILessonQueryRepository lessonQueryRepository)
        {
            this._lessonQueryRepository = lessonQueryRepository;
        }
        public async Task<List<LessonDTO>> Handle(GetLessonFromGradeSubjectQuery request, CancellationToken cancellationToken)
        {
            var lessons = (await _lessonQueryRepository
                         .Query(x => x.AcademicLevelId == request.AcademicLevelId && 
                         x.SubjectId == request.SubjectId)).ToList();

            return lessons.Select(x => new LessonDTO()
            {
                Id = x.Id,
                LessonName = x.LessonName,
                LessonDescription = x.LessonDescription,
                LessonGrade = x.AcademicLevel.Name,
                LessonSubject = x.Subject.Name,
                LessonStatus = x.LessonStatus,


            }).ToList();

        }
    }
}
