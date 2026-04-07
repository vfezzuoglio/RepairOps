using Microsoft.EntityFrameworkCore;
using RepairOps.API.Data;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;
using RepairOps.API.Models;

namespace RepairOps.API.Services
{
    public class ServicePriceService : IServicePriceService
    {
        private readonly AppDbContext _context;

        public ServicePriceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ServicePriceDto>> GetAllServicePrices()
        {
            return await _context.ServicePrices
                .Select(s => MapToDto(s))
                .ToListAsync();
        }

        public async Task<List<ServicePriceDto>> SearchServicePrices(string brand, string model)
        {
            return await _context.ServicePrices
                .Where(s => s.Brand.Contains(brand) && s.Model.Contains(model))
                .Select(s => MapToDto(s))
                .ToListAsync();
        }

        public async Task<ServicePriceDto?> CreateServicePrice(CreateServicePriceDto request)
        {
            var servicePrice = new ServicePrice
            {
                ServiceName = request.ServiceName,
                Brand = request.Brand,
                Model = request.Model,
                Price = request.Price,
                CreatedAt = DateTime.UtcNow
            };

            _context.ServicePrices.Add(servicePrice);
            await _context.SaveChangesAsync();

            return MapToDto(servicePrice);
        }

        public async Task<bool> DeleteServicePrice(int id)
        {
            var servicePrice = await _context.ServicePrices.FindAsync(id);
            if (servicePrice == null) return false;

            _context.ServicePrices.Remove(servicePrice);
            await _context.SaveChangesAsync();
            return true;
        }

        private static ServicePriceDto MapToDto(ServicePrice s)
        {
            return new ServicePriceDto
            {
                Id = s.Id,
                ServiceName = s.ServiceName,
                Brand = s.Brand,
                Model = s.Model,
                Price = s.Price
            };
        }
    }
}