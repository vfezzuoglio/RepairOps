namespace RepairOps.API.DTOs
{
    public class TicketServiceDto
    {
        public int Id { get; set; }
        public int RepairTicketId { get; set; }
        public int? ServicePriceId { get; set; }
        public string ServiceName { get; set; } = string.Empty;
        public string CustomDescription { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}