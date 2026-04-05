using RepairOps.API.DTOs;

namespace RepairOps.API.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto?> CreateCustomer(CreateCustomerDto request);
        Task<List<CustomerDto>> SearchCustomers(string searchTerm);
    }
}