using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto request)
        {
            var result = await _authService.Register(request);
            if (result == null)
                return BadRequest("Email already exists");
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var result = await _authService.Login(request);
            if (result == null)
                return Unauthorized("Invalid email or password");
            return Ok(result);
        }
    }
}