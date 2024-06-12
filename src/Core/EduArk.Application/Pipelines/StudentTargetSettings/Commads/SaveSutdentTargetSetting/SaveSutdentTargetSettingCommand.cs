using EduArk.Application.Common.Interfaces;
using EduArk.Application.DTOs.CommonDTOs;
using EduArk.Application.DTOs.StudentTargetSettingDTOs;
using EduArk.Domain.Entities.Tenant;
using EduArk.Domain.Repositories.Command.Tenant;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using System.Text;
using System.Text.Json;

namespace EduArk.Application.Pipelines.StudentTargetSettings.Commads.SaveSutdentTargetSetting
{
    public record SaveSutdentTargetSettingCommand(StudentTargetSettingConfigureDTO studentTargetSettingData) : IRequest<ResultDTO>
    {
    }


    public class SaveSutdentTargetSettingCommandHandler : IRequestHandler<SaveSutdentTargetSettingCommand, ResultDTO>
    {
        private readonly IStudentQueryRepository _studentQueryRepository;
        private readonly ISubjectTargetSettingQueryRepository _subjectTargetSettingQueryRepository;
        private readonly ISubjectTargetSettingCommandRepository _subjectTargetSettingCommandRepository;
        private readonly IStudentClassQueryRepository _studentClassQueryRepository;
        private readonly IExamMarkQueryRepository _examMarkQueryRepository;
        private readonly IEduArkMachineLearningAPIService _eduArkMachineLearningAPIService;
        private readonly IConfiguration _configuration;

        public SaveSutdentTargetSettingCommandHandler
        (
            IStudentQueryRepository studentQueryRepository,
            ISubjectTargetSettingQueryRepository subjectTargetSettingQueryRepository,
            ISubjectTargetSettingCommandRepository subjectTargetSettingCommandRepository,
            IStudentClassQueryRepository studentClassQueryRepository,
            IExamMarkQueryRepository examMarkQueryRepository,
            IEduArkMachineLearningAPIService eduArkMachineLearningAPIService,
            IConfiguration configuration
        )
        {
            this._studentQueryRepository = studentQueryRepository;
            this._subjectTargetSettingQueryRepository = subjectTargetSettingQueryRepository;
            this._subjectTargetSettingCommandRepository = subjectTargetSettingCommandRepository;
            this._studentClassQueryRepository = studentClassQueryRepository;
            this._examMarkQueryRepository = examMarkQueryRepository;
            this._eduArkMachineLearningAPIService = eduArkMachineLearningAPIService;
            this._configuration = configuration;

        }
        public async Task<ResultDTO> Handle(SaveSutdentTargetSettingCommand request, CancellationToken cancellationToken)
        {
            try
            {
                ConfigureFilter(request);

                var listOfStudents = (await _studentClassQueryRepository
                                    .Query(x => x.AcademicYearId == request.studentTargetSettingData.CurrentAcademicYear &&
                                    x.AcademicLevelId == request.studentTargetSettingData.AcademicLevel &&
                                    x.IsActive == true)).ToList();

                

                foreach(var item in listOfStudents)
                {
                    
                    var inputData = await ProcessMachineLearningServiceInput(item, request);

                   
                    var analyzedMark = await _eduArkMachineLearningAPIService.StudentPerformanceAnalyzeAsync(inputData);

                    var subjectTargetSetting = new SubjectTargetSetting()
                    {
                        AcademicLevelId = item.AcademicLevelId,
                        SubjectId = request.studentTargetSettingData.Subject,
                        PredictedMark = analyzedMark,
                        AcademicYearId =item.AcademicYearId,
                        StudentId = item.Student.Id,
                        SemesterId = request.studentTargetSettingData.CurrentSemester,
                    };

                    
                    await _subjectTargetSettingCommandRepository
                            .AddAsync(subjectTargetSetting, cancellationToken);

                }

                return ResultDTO.Success(string.Empty);
            }
            catch (Exception ex)
            {

                throw;
            }
         
        }

        private async  Task<List<int>> ProcessMachineLearningServiceInput(StudentClass item, SaveSutdentTargetSettingCommand request)
        {
            var markTerm1 = (int)Math.Round((await _examMarkQueryRepository
                                    .Query(x => x.Exam.AcademicYearId == request.studentTargetSettingData.PreviousSemesterOneAcademicYear &&
                                     x.Exam.ExamTypeId == request.studentTargetSettingData.ExamTypeId &&
                                     x.SubjectId == request.studentTargetSettingData.Subject &&
                                     x.Exam.SemesterId == request.studentTargetSettingData.PreviousSemesterOne &&
                                     x.Student.User.Id == item.StudentId)).FirstOrDefault()?.Marks ?? 0);

            var markTerm2 = (int)Math.Round((await _examMarkQueryRepository
                            .Query(x => x.Exam.AcademicYearId == request.studentTargetSettingData.PreviousSemesterTwoAcademicYear &&
                             x.Exam.ExamTypeId == request.studentTargetSettingData.ExamTypeId &&
                             x.SubjectId == request.studentTargetSettingData.Subject &&
                             x.Exam.SemesterId == request.studentTargetSettingData.PreviousSemesterTwo &&
                             x.Student.User.Id == item.StudentId)).FirstOrDefault()?.Marks ?? 0);

            var markTerm3 = (int)Math.Round((await _examMarkQueryRepository
                            .Query(x => x.Exam.AcademicYearId == request.studentTargetSettingData.PreviousSemesterThreeAcademicYear &&
                             x.Exam.ExamTypeId == request.studentTargetSettingData.ExamTypeId &&
                             x.SubjectId == request.studentTargetSettingData.Subject &&
                             x.Exam.SemesterId == request.studentTargetSettingData.PreviousSemesterThree &&
                             x.Student.User.Id == item.StudentId)).FirstOrDefault()?.Marks ?? 0);

            var markTerm4 = (int)Math.Round((await _examMarkQueryRepository
                            .Query(x => x.Exam.AcademicYearId == request.studentTargetSettingData.PreviousSemesterFourAcademicYear &&
                             x.Exam.ExamTypeId == request.studentTargetSettingData.ExamTypeId &&
                             x.SubjectId == request.studentTargetSettingData.Subject &&
                             x.Exam.SemesterId == request.studentTargetSettingData.PreviousSemesterFour &&
                             x.Student.User.Id == item.StudentId)).FirstOrDefault()?.Marks ?? 0);

            var markTerm5 = (int)Math.Round((await _examMarkQueryRepository
                            .Query(x => x.Exam.AcademicYearId == request.studentTargetSettingData.PreviousSemesterFiveAcademicYear &&
                             x.Exam.ExamTypeId == request.studentTargetSettingData.ExamTypeId &&
                             x.SubjectId == request.studentTargetSettingData.Subject &&
                             x.Exam.SemesterId == request.studentTargetSettingData.PreviousSemesterFive &&
                             x.Student.User.Id == item.StudentId)).FirstOrDefault()?.Marks ?? 0);

            var average = (markTerm1 + markTerm2 + markTerm3 + markTerm4 + markTerm5) / 5 * 9;

            var total = markTerm1 + markTerm2 + markTerm3 + markTerm4 + markTerm5;

            var initMark = markTerm1;

            var studyHours = item.Student.StudyHours;
            var confidentAcademicPerformance = item.Student.ConfidentAcademicPerformance;
            var importantFactorsAcademicPerformance = 6;

            var inputData = new List<int> { markTerm1, markTerm2, markTerm3, markTerm4, markTerm5, total, average, importantFactorsAcademicPerformance, 3, 2 };

            return inputData;
        }

        public void ConfigureFilter(SaveSutdentTargetSettingCommand request)
        {
            var currentSemesterId = 2;
            var currentAcademicYearId = request.studentTargetSettingData.CurrentAcademicYear;

            switch (currentSemesterId)
            {
                case 1:
                    request.studentTargetSettingData.PreviousSemesterOne = 3;
                    request.studentTargetSettingData.PreviousSemesterOneAcademicYear = currentAcademicYearId - 1;

                    request.studentTargetSettingData.PreviousSemesterTwo = 2;
                    request.studentTargetSettingData.PreviousSemesterTwoAcademicYear = currentAcademicYearId - 1;

                    request.studentTargetSettingData.PreviousSemesterThree = 1;
                    request.studentTargetSettingData.PreviousSemesterThreeAcademicYear = currentAcademicYearId - 1;

                    request.studentTargetSettingData.PreviousSemesterFour = 3;
                    request.studentTargetSettingData.PreviousSemesterFourAcademicYear = currentAcademicYearId - 2;

                    request.studentTargetSettingData.PreviousSemesterFive = 2;
                    request.studentTargetSettingData.PreviousSemesterFiveAcademicYear = currentAcademicYearId - 2;

                    break;
                case 2:
                    request.studentTargetSettingData.PreviousSemesterOne = 1;
                    request.studentTargetSettingData.PreviousSemesterOneAcademicYear = currentAcademicYearId;

                    request.studentTargetSettingData.PreviousSemesterTwo = 3;
                    request.studentTargetSettingData.PreviousSemesterTwoAcademicYear = currentAcademicYearId - 1;

                    request.studentTargetSettingData.PreviousSemesterThree = 2;
                    request.studentTargetSettingData.PreviousSemesterThreeAcademicYear = currentAcademicYearId - 1;

                    request.studentTargetSettingData.PreviousSemesterFour = 1;
                    request.studentTargetSettingData.PreviousSemesterFourAcademicYear = currentAcademicYearId - 1;

                    request.studentTargetSettingData.PreviousSemesterFive = 3;
                    request.studentTargetSettingData.PreviousSemesterFiveAcademicYear = currentAcademicYearId - 2;
                    break;
                case 3:
                    request.studentTargetSettingData.PreviousSemesterOne = 2;
                    request.studentTargetSettingData.PreviousSemesterOneAcademicYear = currentAcademicYearId ;

                    request.studentTargetSettingData.PreviousSemesterTwo = 1;
                    request.studentTargetSettingData.PreviousSemesterTwoAcademicYear = currentAcademicYearId;

                    request.studentTargetSettingData.PreviousSemesterThree = 1;
                    request.studentTargetSettingData.PreviousSemesterThreeAcademicYear = currentAcademicYearId - 1;

                    request.studentTargetSettingData.PreviousSemesterFour = 3;
                    request.studentTargetSettingData.PreviousSemesterFourAcademicYear = currentAcademicYearId - 2;

                    request.studentTargetSettingData.PreviousSemesterFive = 2;
                    request.studentTargetSettingData.PreviousSemesterFiveAcademicYear = currentAcademicYearId - 2;
                    break;

            }
        }

        private async Task<string> ProceessSubjectTargetSettingMLApi()
        {
            var responseData = string.Empty;
            int[] numbers = { 95, 78, 96, 63, 78, 1200, 80 };
            string jsonData = JsonSerializer.Serialize(numbers);

            using (HttpClient httpClient = new HttpClient())
            {

                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                var apiUrl = _configuration["MarkPredictionApiUrl"].ToString();
                HttpResponseMessage response = await httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {

                    string responseContent = await response.Content.ReadAsStringAsync();
                    responseData = responseContent;
                    Console.WriteLine("POST request successful. Response:");
                    Console.WriteLine(responseContent);


                }
                else
                {

                    Console.WriteLine($"Get request failed. Status code: {response.StatusCode}");
                }
            }

            return responseData;

        }

    }
}
