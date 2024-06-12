using EduArk.Application.Common.Constants;
using EduArk.Application.Common.Interfaces;
using EduArk.Application.DTOs.CommonDTOs;
using EduArk.Application.DTOs.RatingDTOs;
using EduArk.Domain.Entities.Tenant;
using EduArk.Domain.Repositories.Command.Tenant;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;

namespace EduArk.Application.Pipelines.Ratings.Commands.SaveRating
{
    public record SaveRatingCommand(RatingDTO RatingDTO) : IRequest<ResultDTO>;

    public class SaveRatingCommandHandler : IRequestHandler<SaveRatingCommand, ResultDTO>
    {
        private readonly IRatingTypeQueryRepository _ratingTypeQueryRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IRatingCommandRepository _ratingCommandRepository;

        public SaveRatingCommandHandler
            (IRatingTypeQueryRepository ratingTypeQueryRepository,
            IRatingCommandRepository ratingCommandRepository,
            ICurrentUserService currentUserService)
        {
            _ratingTypeQueryRepository = ratingTypeQueryRepository;
            _currentUserService = currentUserService;
            _ratingCommandRepository = ratingCommandRepository;
        }

        public async Task<ResultDTO> Handle(SaveRatingCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var rating = await _ratingTypeQueryRepository
                    .GetById(request.RatingDTO.Id, cancellationToken);

                if (rating == null)
                {
                    rating = new Rating()
                    {
                        Value = request.RatingDTO.Value,
                        RatingType = Domain.Enums.RatingType.Audio,
                        IsActive = true,

                    };

                    await _ratingCommandRepository.AddAsync(rating, cancellationToken);

                    return ResultDTO
                        .Success(
                            ApplicationResponseConstant.RATING_SAVE_SUCCESS_RESPONSE_MESSAGE,
                            rating.Id
                        );
                }
                else
                {
                    return ResultDTO
                        .Success
                        (
                            ApplicationResponseConstant.RATING_UPDATE_SUCCESS_RESPONSE_MESSAGE,
                            rating.Id
                        );

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
     }

}

