using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsers();
        Task<bool> DeleteUser(int id);
        Task<UserDto?> UpdateUserRole(int id, string role);
    }
}