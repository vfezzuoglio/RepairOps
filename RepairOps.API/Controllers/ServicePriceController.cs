using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ServicePriceController : ControllerBase
    {
        private readonly IServicePriceService _servicePriceService;

        public ServicePriceController(IServicePriceService servicePriceService)
        {
            _servicePriceService = servicePriceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllServicePrices()
        {
            var results = await _servicePriceService.GetAllServicePrices();
            return Ok(results);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchServicePrices([FromQuery] string brand, [FromQuery] string model)
        {
            var results = await _servicePriceService.SearchServicePrices(brand, model);
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> CreateServicePrice(CreateServicePriceDto request)
        {
            var result = await _servicePriceService.CreateServicePrice(request);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServicePrice(int id)
        {
            var result = await _servicePriceService.DeleteServicePrice(id);
            if (!result) return NotFound();
            return Ok();
        }
    }
}