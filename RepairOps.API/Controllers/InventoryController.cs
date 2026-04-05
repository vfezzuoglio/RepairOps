using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpPost("parts")]
        public async Task<IActionResult> CreatePart(CreatePartDto request)
        {
            var result = await _inventoryService.CreatePart(request);
            return Ok(result);
        }

        [HttpGet("parts")]
        public async Task<IActionResult> GetAllParts()
        {
            var results = await _inventoryService.GetAllParts();
            return Ok(results);
        }

        [HttpPost("parts/use")]
        public async Task<IActionResult> UsePart(UsePartDto request)
        {
            var result = await _inventoryService.UsePart(request);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}