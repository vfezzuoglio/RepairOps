namespace RepairOps.API.DTOs
{
    public class RevenueReportDto
    {
        public int UserId { get; set; }
        public string RepName { get; set; } = string.Empty;
        public int TicketsCreated { get; set; }
        public decimal TotalRevenue { get; set; }
    }
}