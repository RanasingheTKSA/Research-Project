namespace EduArk.Application.Common.Interfaces
{
    public interface IEduArkMachineLearningAPIService
    {
        Task<decimal> StudentPerformanceAnalyzeAsync(List<int> inputData);
        Task<string> LearningStrategiesAnalyzeAsync(List<string> inputData);
        Task PersonalizedAssessmentApproachAnalyzeAsync();
        Task MostSuitedSubjectStreamAnalyzeAsync();
    }
}
