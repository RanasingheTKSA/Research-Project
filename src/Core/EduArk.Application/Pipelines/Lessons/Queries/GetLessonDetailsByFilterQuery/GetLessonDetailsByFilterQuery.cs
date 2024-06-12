using EduArk.Application.Common.Interfaces;
using EduArk.Application.DTOs.CommonDTOs;
using EduArk.Application.DTOs.TenantDTOs;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;

namespace EduArk.Application.Pipelines.Lessons.Queries.GetLessonDetailsByFilterQuery
{
    public record GetLessonDetailsByFilterQuery(LessonDetailsFilterDTO filter)
          : IRequest<PaginatedItemDTO<LessonDTO>>;

    public class GetLessonDetailsByFilterQueryQuery
          : IRequestHandler<GetLessonDetailsByFilterQuery, PaginatedItemDTO<LessonDTO>>
    {
        private readonly ILessonQueryRepository _lessonQueryRepository;
        private readonly ICurrentUserService _currentUserService;

        public GetLessonDetailsByFilterQueryQuery(ILessonQueryRepository lessonQueryRepository, ICurrentUserService currentUserService)
        {
            this._lessonQueryRepository = lessonQueryRepository;
            this._currentUserService = currentUserService;
        }

        public async Task<PaginatedItemDTO<LessonDTO>> Handle(GetLessonDetailsByFilterQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var totalRecordCount = 0;
               

                var listOfLessons = await _lessonQueryRepository.Query(x => x.IsActive &&  x.CreatedByUserId == _currentUserService.UserId.Value);

              if(request.filter.SubjectId > 0)
              {
                    listOfLessons = listOfLessons.Where(x => x.SubjectId == request.filter.SubjectId);
              }

              if(request.filter.AcademicLevelId > 0)
              {
                    listOfLessons = listOfLessons.Where(x => x.AcademicLevelId == request.filter.AcademicLevelId);
              }


                totalRecordCount = listOfLessons.Count();

                var listOfAvailableLessons = listOfLessons.OrderByDescending(x => x.CreatedDate)
                                          .Skip(request.filter.CurrentPage * request.filter.PageSize)
                                          .Take(request.filter.PageSize)
                                          .ToList();

                var lessonData = listOfAvailableLessons.Select(x => new LessonDTO()
                {
                    Id = x.Id,
                    LessonName = x.LessonName,
                    SubjectId = x.SubjectId,
                    AcademicLevelId = x.AcademicLevelId,
                    SubjectName = x.Subject.Name,
                    AcademicLevelName = x.AcademicLevel.Name,

                }).ToList();

                return new PaginatedItemDTO<LessonDTO>
                    (lessonData, totalRecordCount, request.filter.CurrentPage + 1, request.filter.PageSize);
            }
            catch(Exception ex)
            {
                throw;
            }
        }

    }
}
