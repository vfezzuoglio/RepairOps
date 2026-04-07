using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface ITicketServiceService
    {
        Task<List<TicketServiceDto>> GetTicketServices(int repairTicketId);
        Task<TicketServiceDto?> AddTicketService(int repairTicketId, AddTicketServiceDto request);
        Task<bool> RemoveTicketService(int ticketServiceId);
        Task<decimal> GetTicketTotal(int repairTicketId);

    }
}