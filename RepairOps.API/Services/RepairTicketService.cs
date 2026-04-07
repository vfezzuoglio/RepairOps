using Microsoft.EntityFrameworkCore;
using RepairOps.API.Data;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;
using RepairOps.API.Models;

namespace RepairOps.API.Services
{
    public class RepairTicketService : IRepairTicketService
    {
        private readonly AppDbContext _context;

        public RepairTicketService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<RepairTicketDto?> CreateRepairTicket(CreateRepairTicketDto request)
        {
            var ticket = new RepairTicket
            {
                CustomerId = request.CustomerId,
                DeviceId = request.DeviceId,
                AssignedUserId = request.AssignedUserId,
                IssueDescription = request.IssueDescription,
                IntakeNotes = request.IntakeNotes,
                Status = "New Intake",
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = request.CreatedByUserId
            };

            _context.RepairTickets.Add(ticket);
            await _context.SaveChangesAsync();

            await _context.Entry(ticket).Reference(t => t.Customer).LoadAsync();
            await _context.Entry(ticket).Reference(t => t.Device).LoadAsync();
            await _context.Entry(ticket).Reference(t => t.AssignedUser).LoadAsync();

            return MapToDto(ticket);
        }

        public async Task<List<RepairTicketDto>> GetAllRepairTickets()
        {
            return await _context.RepairTickets
                .Include(t => t.Customer)
                .Include(t => t.Device)
                .Include(t => t.AssignedUser)
                .Select(t => MapToDto(t))
                .ToListAsync();
        }

        public async Task<RepairTicketDto?> GetRepairTicketById(int id)
        {
            var ticket = await _context.RepairTickets
                .Include(t => t.Customer)
                .Include(t => t.Device)
                .Include(t => t.AssignedUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null) return null;
            return MapToDto(ticket);
        }

        private static RepairTicketDto MapToDto(RepairTicket ticket)
        {
            return new RepairTicketDto
            {
                Id = ticket.Id,
                CustomerId = ticket.CustomerId,
                CustomerName = ticket.Customer.FullName,
                DeviceId = ticket.DeviceId,
                DeviceBrand = ticket.Device.Brand,
                DeviceModel = ticket.Device.Model,
                AssignedUserId = ticket.AssignedUserId,
                AssignedUserName = ticket.AssignedUser.FullName,
                Status = ticket.Status,
                IssueDescription = ticket.IssueDescription,
                IntakeNotes = ticket.IntakeNotes,
                CreatedAt = ticket.CreatedAt,
                UpdatedAt = ticket.UpdatedAt
            };
        }
        public async Task<RepairTicketDto?> UpdateStatus(int id, UpdateRepairStatusDto request)
        {
            var ticket = await _context.RepairTickets
                .Include(t => t.Customer)
                .Include(t => t.Device)
                .Include(t => t.AssignedUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null) return null;

            ticket.Status = request.Status;
            ticket.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToDto(ticket);
        }
        public async Task<RepairNoteDto?> AddNote(int repairTicketId, CreateRepairNoteDto request)
        {
            var ticket = await _context.RepairTickets.FindAsync(repairTicketId);
            if (ticket == null) return null;

            var note = new RepairNote
            {
                RepairTicketId = repairTicketId,
                UserId = request.UserId,
                Note = request.Note,
                CreatedAt = DateTime.UtcNow
            };

            _context.RepairNotes.Add(note);
            await _context.SaveChangesAsync();

            await _context.Entry(note).Reference(n => n.User).LoadAsync();

            return new RepairNoteDto
            {
                Id = note.Id,
                RepairTicketId = note.RepairTicketId,
                UserId = note.UserId,
                UserName = note.User.FullName,
                Note = note.Note,
                CreatedAt = note.CreatedAt
            };
        }
        public async Task<List<RepairNoteDto>> GetNotes(int repairTicketId)
        {
            return await _context.RepairNotes
                .Where(n => n.RepairTicketId == repairTicketId)
                .Include(n => n.User)
                .Select(n => new RepairNoteDto
                {
                    Id = n.Id,
                    RepairTicketId = n.RepairTicketId,
                    UserId = n.UserId,
                    UserName = n.User.FullName,
                    Note = n.Note,
                    CreatedAt = n.CreatedAt
                })
                .ToListAsync();
    }
    public async Task<List<RevenueReportDto>> GetRevenueReport()
{
    var tickets = await _context.RepairTickets
        .Include(t => t.CreatedByUser)
        .Include(t => t.TicketServices)
        .ToListAsync();

    return tickets
        .GroupBy(t => t.CreatedByUserId)
        .Select(g => new RevenueReportDto
        {
            UserId = g.Key,
            RepName = g.First().CreatedByUser.FullName,
            TicketsCreated = g.Count(),
            TotalRevenue = g.SelectMany(t => t.TicketServices).Sum(ts => ts.Price)
        })
        .ToList();
}
}
}