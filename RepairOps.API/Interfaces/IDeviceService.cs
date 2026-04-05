using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface IDeviceService
    {
        Task<DeviceDto?> CreateDevice(CreateDeviceDto request);
        Task<List<DeviceDto>> GetDevicesByCustomer(int customerId);
    }
}