using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> Register(RegisterRequestDto request);
        Task<AuthResponseDto?> Login(LoginRequestDto request);
    }
}