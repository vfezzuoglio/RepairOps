using Microsoft.EntityFrameworkCore;
using RepairOps.API.Data;
using RepairOps.API.DTOs;
using RepairOps.API.Interfaces;
using RepairOps.API.Models;

namespace RepairOps.API.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _context;

        public CustomerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CustomerDto?> CreateCustomer(CreateCustomerDto request)
        {
            var customer = new Customer
            {
                FullName = request.FullName,
                Phone = request.Phone,
                Email = request.Email,
                CreatedAt = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                Id = customer.Id,
                FullName = customer.FullName,
                Phone = customer.Phone,
                Email = customer.Email
            };
        }

        public async Task<List<CustomerDto>> SearchCustomers(string searchTerm)
        {
            return await _context.Customers
                .Where(c => c.FullName.Contains(searchTerm) ||
                            c.Phone.Contains(searchTerm) ||
                            c.Email.Contains(searchTerm))
                .Select(c => new CustomerDto
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    Phone = c.Phone,
                    Email = c.Email
                })
                .ToListAsync();
        }
    }
}