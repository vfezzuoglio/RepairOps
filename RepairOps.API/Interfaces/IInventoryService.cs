using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface IInventoryService
    {
        Task<PartDto?> CreatePart(CreatePartDto request);
        Task<List<PartDto>> GetAllParts();
        Task<PartDto?> UsePart(UsePartDto request);
    }
}