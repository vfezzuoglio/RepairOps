using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;

namespace RepairOps.API.Controllers
{
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsers();
        return Ok(users);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var result = await _userService.DeleteUser(id);
        if (!result) return NotFound();
        return NoContent();
    }

    [HttpPut("{id}/role")]
    public async Task<IActionResult> UpdateUserRole(int id, UpdateUserRoleDto request)
    {
        var result = await _userService.UpdateUserRole(id, request.Role);
        if (result == null) return NotFound();
        return Ok(result);
    }
}
}  
