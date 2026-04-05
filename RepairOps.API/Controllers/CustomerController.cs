using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(CreateCustomerDto request)
        {
            var result = await _customerService.CreateCustomer(request);
            return Ok(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchCustomers([FromQuery] string searchTerm)
        {
            var results = await _customerService.SearchCustomers(searchTerm);
            return Ok(results);
        }
    }
}