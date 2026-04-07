using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TicketServiceController : ControllerBase
    {
        private readonly ITicketServiceService _ticketServiceService;

        public TicketServiceController(ITicketServiceService ticketServiceService)
        {
            _ticketServiceService = ticketServiceService;
        }

        [HttpGet("{repairTicketId}/services")]
        public async Task<IActionResult> GetTicketServices(int repairTicketId)
        {
            var services = await _ticketServiceService.GetTicketServices(repairTicketId);
            return Ok(services);
        }

        [HttpPost("{repairTicketId}/services")]
        public async Task<IActionResult> AddTicketService(int repairTicketId, AddTicketServiceDto request)
        {
            var result = await _ticketServiceService.AddTicketService(repairTicketId, request);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveTicketService(int id)
        {
            var result = await _ticketServiceService.RemoveTicketService(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("{repairTicketId}/total")]
        public async Task<IActionResult> GetTicketTotal(int repairTicketId)
        {
            var total = await _ticketServiceService.GetTicketTotal(repairTicketId);
            return Ok(total);
        }
    }
}