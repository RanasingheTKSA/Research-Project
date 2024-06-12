using EduArk.Application.DTOs.RatingDTOs;
using EduArk.Domain.Repositories.Query.Tenant;
using MediatR;

namespace EduArk.Application.Pipelines.Ratings.Queries
{
    public record GetAllRatingQuery : IRequest<List<RatingDTO>>
    { }

    public class GetAllRatingQueryHandler
        : IRequestHandler<GetAllRatingQuery, List<RatingDTO>>
    {
        private readonly IRatingTypeQueryRepository _ratingTypeQueryRepository;

        public GetAllRatingQueryHandler(IRatingTypeQueryRepository ratingTypeQueryRepository)
        {
            _ratingTypeQueryRepository = ratingTypeQueryRepository;
        }

        public async Task<List<RatingDTO>> Handle(GetAllRatingQuery request, CancellationToken cancellationToken)
        {
            var ratingData = new List<RatingDTO>();
            var rating = await _ratingTypeQueryRepository.GetAll(cancellationToken);

            ratingData = rating
                    .Select(x => new RatingDTO
                    {
                        Id = x.Id,
                        RatingType = x.RatingType,
                        Value = x.Value,
                    }).ToList();

            return ratingData;
        }
    }
}
