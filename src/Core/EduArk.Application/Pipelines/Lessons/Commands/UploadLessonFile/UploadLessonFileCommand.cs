using EduArk.Application.Common.Enums;
using EduArk.Application.Common.Interfaces;
using EduArk.Application.DTOs.CommonDTOs;
using EduArk.Domain.Repositories.Command.Tenant;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;

namespace EduArk.Application.Pipelines.Lessons.Commands.UploadLessonFile
{
    public record UploadLessonFileCommand (BlobContainerDTO BlobContainer) 
                            : IRequest<ResultDTO>;
    public class UploadLessonFileCommandHandler : IRequestHandler<UploadLessonFileCommand, ResultDTO>
    {
        private readonly IAzureBlobStorageService _azureBlobStorageService;
        private readonly ILessonCommandRepository _lessonCommandRepository;
        private readonly ILessonQueryRepository _lessonQueryRepository;

        public UploadLessonFileCommandHandler
            (
                IAzureBlobStorageService azureBlobStorageService,
                ILessonCommandRepository lessonCommandRepository,
                ILessonQueryRepository lessonQueryRepository
            )
        {
            this._azureBlobStorageService = azureBlobStorageService;
            this._lessonQueryRepository = lessonQueryRepository;
            this._lessonCommandRepository = lessonCommandRepository;
        }

        public async Task<ResultDTO> Handle(UploadLessonFileCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var response = await _azureBlobStorageService
                                  .UploadAsync(request.BlobContainer);

                var lesson = await _lessonQueryRepository
                                  .GetById(request.BlobContainer.Id, cancellationToken);

                switch ((LessonFileType)request.BlobContainer.TypeId)
                {
                    case LessonFileType.Text:
                        lesson.TextFileUrl = response.Url; 
                        break;

                    case LessonFileType.Video:
                        lesson.VideoFileUrl = response.Url;
                        break;

                    case LessonFileType.Audio:
                        lesson.AudioFileUrl = response.Url;
                        break;

                }
                
                await _lessonCommandRepository.UpdateAsync(lesson, cancellationToken);

                return ResultDTO.Success(string.Empty);
            }
            catch ( Exception ex )
            {
                throw;
            }
        }
    }
}
