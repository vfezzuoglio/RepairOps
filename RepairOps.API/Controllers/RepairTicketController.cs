using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RepairTicketController : ControllerBase
    {
        private readonly IRepairTicketService _repairTicketService;

        public RepairTicketController(IRepairTicketService repairTicketService)
        {
            _repairTicketService = repairTicketService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRepairTicket(CreateRepairTicketDto request)
        {
            var result = await _repairTicketService.CreateRepairTicket(request);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRepairTickets()
        {
            var results = await _repairTicketService.GetAllRepairTickets();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRepairTicketById(int id)
        {
            var result = await _repairTicketService.GetRepairTicketById(id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateRepairStatusDto request)
        {
            var result = await _repairTicketService.UpdateStatus(id, request);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost("{id}/notes")]
        public async Task<IActionResult> AddNote(int id, CreateRepairNoteDto request)
        {
            var result = await _repairTicketService.AddNote(id, request);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("{id}/notes")]
        public async Task<IActionResult> GetNotes(int id)
        {
            var results = await _repairTicketService.GetNotes(id);
            return Ok(results);
        }
        [HttpGet("reports/revenue")]
        public async Task<IActionResult> GetRevenueReport()
        {
            var report = await _repairTicketService.GetRevenueReport();
            return Ok(report);
        }

    }
}