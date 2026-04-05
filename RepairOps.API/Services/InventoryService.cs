using Microsoft.EntityFrameworkCore;
using RepairOps.API.Data;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;
using RepairOps.API.Models;

namespace RepairOps.API.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly AppDbContext _context;

        public InventoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PartDto?> CreatePart(CreatePartDto request)
        {
            var part = new Part
            {
                Name = request.Name,
                PartNumber = request.PartNumber,
                Quantity = request.Quantity,
                LowStockThreshold = request.LowStockThreshold,
                CreatedAt = DateTime.UtcNow
            };

            _context.Parts.Add(part);
            await _context.SaveChangesAsync();

            return MapToDto(part);
        }

        public async Task<List<PartDto>> GetAllParts()
        {
            return await _context.Parts
                .Select(p => MapToDto(p))
                .ToListAsync();
        }

        public async Task<PartDto?> UsePart(UsePartDto request)
        {
            var part = await _context.Parts.FindAsync(request.PartId);
            if (part == null) return null;

            part.Quantity -= request.Quantity;

            var transaction = new InventoryTransaction
            {
                PartId = request.PartId,
                RepairTicketId = request.RepairTicketId,
                QuantityChanged = -request.Quantity,
                Note = request.Notes,
                CreatedAt = DateTime.UtcNow
            };

            _context.InventoryTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            return MapToDto(part);
        }

        private static PartDto MapToDto(Part part)
        {
            return new PartDto
            {
                Id = part.Id,
                Name = part.Name,
                PartNumber = part.PartNumber,
                Quantity = part.Quantity,
                LowStockThreshold = part.LowStockThreshold,
                IsLowStock = part.Quantity <= part.LowStockThreshold
            };
        }
    }
}