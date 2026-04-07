using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface IServicePriceService
    {
        Task<List<ServicePriceDto>> GetAllServicePrices();
        Task<List<ServicePriceDto>> SearchServicePrices(string brand, string model);
        Task<ServicePriceDto?> CreateServicePrice(CreateServicePriceDto request);
        Task<bool> DeleteServicePrice(int id);

    }
}