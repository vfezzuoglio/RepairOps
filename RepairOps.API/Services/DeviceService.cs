using Microsoft.EntityFrameworkCore;
using RepairOps.API.Data;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;
using RepairOps.API.Models;

namespace RepairOps.API.Services
{
    public class DeviceService : IDeviceService
    {
        private readonly AppDbContext _context;

        public DeviceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DeviceDto?> CreateDevice(CreateDeviceDto request)
        {
            var device = new Device
            {
                CustomerId = request.CustomerId,
                Brand = request.Brand,
                Model = request.Model,
                SerialNumber = request.SerialNumber,
                CreatedAt = DateTime.UtcNow
            };

            _context.Devices.Add(device);
            await _context.SaveChangesAsync();

            return new DeviceDto
            {
                Id = device.Id,
                CustomerId = device.CustomerId,
                Brand = device.Brand,
                Model = device.Model,
                SerialNumber = device.SerialNumber
            };
        }

        public async Task<List<DeviceDto>> GetDevicesByCustomer(int customerId)
        {
            return await _context.Devices
                .Where(d => d.CustomerId == customerId)
                .Select(d => new DeviceDto
                {
                    Id = d.Id,
                    CustomerId = d.CustomerId,
                    Brand = d.Brand,
                    Model = d.Model,
                    SerialNumber = d.SerialNumber
                })
                .ToListAsync();
        }
    }
}