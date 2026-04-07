using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface IRepairTicketService
    {
        Task<RepairTicketDto?> CreateRepairTicket(CreateRepairTicketDto request);
        Task<List<RepairTicketDto>> GetAllRepairTickets();
        Task<RepairTicketDto?> GetRepairTicketById(int id);
        Task<RepairTicketDto?> UpdateStatus(int id, UpdateRepairStatusDto request);
        Task<RepairNoteDto?> AddNote(int repairTicketId, CreateRepairNoteDto request);
        Task<List<RepairNoteDto>> GetNotes(int repairTicketId);

        Task<List<RevenueReportDto>> GetRevenueReport();
        
    }
}