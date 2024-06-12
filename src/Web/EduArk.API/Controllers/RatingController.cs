using EduArk.Application.DTOs.RatingDTOs;
using EduArk.Application.Pipelines.Ratings.Commands.SaveRating;
using EduArk.Application.Pipelines.Ratings.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace EduArk.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IMediator _mediator;
        public RatingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //get all rating
        [HttpGet("getRating")]
        public async Task<IActionResult> getRating()
        {
            var response = await _mediator.Send(new GetAllRatingQuery());
            return Ok(response);
        }

        //save 
        [HttpPost("saveRating")]
        public async Task<IActionResult> SaveRating([FromBody] RatingDTO ratingDTO)
        {
            var response = await _mediator.Send(new SaveRatingCommand(ratingDTO));
            return Ok(response);
        }
    }
}
