using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public DeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDevice(CreateDeviceDto request)
        {
            var result = await _deviceService.CreateDevice(request);
            return Ok(result);
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetDevicesByCustomer(int customerId)
        {
            var devices = await _deviceService.GetDevicesByCustomer(customerId);
            return Ok(devices);
        }
    }

}