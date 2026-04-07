using Microsoft.EntityFrameworkCore;
using RepairOps.API.Data;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;
using RepairOps.API.Models;

namespace RepairOps.API.Services
{
    public class TicketServiceService : ITicketServiceService
    {
        private readonly AppDbContext _context;

        public TicketServiceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TicketServiceDto>> GetTicketServices(int repairTicketId)
        {
            return await _context.TicketServices
                .Where(ts => ts.RepairTicketId == repairTicketId)
                .Include(ts => ts.ServicePrice)
                .Select(ts => MapToDto(ts))
                .ToListAsync();
        }

        public async Task<TicketServiceDto?> AddTicketService(int repairTicketId, AddTicketServiceDto request)
        {
            ServicePrice? servicePrice = null;
            if (request.ServicePriceId != null)
            {
                servicePrice = await _context.ServicePrices.FindAsync(request.ServicePriceId);
                if (servicePrice == null) return null;
            }

            var ticketService = new TicketService
            {
                RepairTicketId = repairTicketId,
                ServicePriceId = servicePrice?.Id,
                CustomDescription = request.CustomDescription,
                Price = servicePrice?.Price ?? request.CustomPrice ?? 0,
                CreatedAt = DateTime.UtcNow
            };

            _context.TicketServices.Add(ticketService);
            await _context.SaveChangesAsync();

            if (servicePrice != null)
                ticketService.ServicePrice = servicePrice;

            return MapToDto(ticketService);
        }

        public async Task<bool> RemoveTicketService(int ticketServiceId)
        {
            var ticketService = await _context.TicketServices.FindAsync(ticketServiceId);
            if (ticketService == null) return false;

            _context.TicketServices.Remove(ticketService);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<decimal> GetTicketTotal(int repairTicketId)
        {
            return await _context.TicketServices
                .Where(ts => ts.RepairTicketId == repairTicketId)
                .SumAsync(ts => ts.Price);
        }

        private static TicketServiceDto MapToDto(TicketService ts)
        {
            return new TicketServiceDto
            {
                Id = ts.Id,
                RepairTicketId = ts.RepairTicketId,
                ServicePriceId = ts.ServicePriceId,
                ServiceName = ts.ServicePrice != null
                    ? ts.ServicePrice.ServiceName
                    : ts.CustomDescription,
                CustomDescription = ts.CustomDescription,
                Price = ts.Price,
                CreatedAt = ts.CreatedAt
            };
        }
    }
}