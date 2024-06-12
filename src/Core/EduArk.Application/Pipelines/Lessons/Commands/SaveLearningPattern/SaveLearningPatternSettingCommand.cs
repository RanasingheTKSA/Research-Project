/*using EduArk.Application.Common.Interfaces;
using EduArk.Application.DTOs.CommonDTOs;
using EduArk.Application.DTOs.LessonDTOs;
using EduArk.Domain.Entities.Tenant;
using EduArk.Domain.Repositories.Command.Tenant;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;

namespace EduArk.Application.Pipelines.Lessons.Commands.SaveLearningPattern
{
    public record SaveLearningPatternSettingCommand(StudentLearningPatternDTO studentLearningPatternDTO) : IRequest<ResultDTO>
    { }

    public class SaveLearningPatternCommandHandler : IRequestHandler<SaveLearningPatternSettingCommand, ResultDTO>
    {
        private readonly IStudentQueryRepository _studentQueryRepository;
        private readonly IStudentClassQueryRepository _studentClassQueryRepository;
        private readonly IEduArkMachineLearningAPIService _eduArkMachineLearningAPIService;

        private readonly ILearningPlanCommandRepository _learningPlanCommandRepository;
        private readonly ILearningPlanQueryRepository _learningPlanQueryRepository;
        private readonly ILessonCommandRepository _lessonCommandRepository;
        private readonly ILessonQueryRepository _lessonQueryRepository;

        private readonly ILearningPatternSettingCommandRepository _learningPatternSeetingCommandRepository;

        public SaveLearningPatternCommandHandler 
        (
          IStudentQueryRepository studentQueryRepository,
          IStudentClassQueryRepository studentClassQueryRepository,
          IEduArkMachineLearningAPIService eduArkMachineLearningAPIService,

          ILearningPlanCommandRepository learningPlanCommandRepository,
          ILearningPlanQueryRepository learningPlanQueryRepository,
          ILessonCommandRepository lessonCommandRepository,
          ILessonQueryRepository lessonQueryRepository,

          ILearningPatternSettingCommandRepository learningPatternSettingCommandRepository
           
        )
        {
            this._studentQueryRepository = studentQueryRepository;
            this._studentClassQueryRepository = studentClassQueryRepository;
            this._eduArkMachineLearningAPIService = eduArkMachineLearningAPIService;

            this._learningPlanCommandRepository = learningPlanCommandRepository;
            this._learningPlanQueryRepository = learningPlanQueryRepository;
            this._lessonCommandRepository = lessonCommandRepository;
            this._lessonQueryRepository = lessonQueryRepository;

            this._learningPatternSeetingCommandRepository = learningPatternSettingCommandRepository;
        }

        public async Task<ResultDTO> Handle(SaveLearningPatternSettingCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var listOfStudents =  (await _studentClassQueryRepository
                                .Query(x => x.AcademicYearId == request.studentLearningPatternDTO.AcademicLevelId && 
                                x.IsActive == true)).ToList();

                foreach (var item in listOfStudents)
                {
                    // process machine learning service input for learning stratergy
                    var inputData = await ProcessMachineLearningServiceInputLS(item, request);

                    //analazed predicted learing stratergy/pattern 
                    var analyzedLS = await _eduArkMachineLearningAPIService.LearningStrategiesAnalyzeAsync(inputData);

                    var learingPatternSetting = new LearningPatternSetting()
                    {
                        StudentId = item.StudentId,
                        AcademicLevelId = item.AcademicLevelId,
                        LearningPattern = request.studentLearningPatternDTO.LerningPattern,
                    };

                    await _learningPatternSeetingCommandRepository
                            .AddAsync(learingPatternSetting, cancellationToken);
                }

                return ResultDTO.Success(string.Empty);
            }
            catch (Exception ex)
            { 
                throw;
            }

        }

        private async Task<List<string>> ProcessMachineLearningServiceInputLS(object item, SaveLearningPatternSettingCommand request)
        {
            throw new NotImplementedException();
        }
    }
}
*/