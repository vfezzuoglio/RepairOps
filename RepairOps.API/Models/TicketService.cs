namespace RepairOps.API.Models
{
    public class TicketService
    {
        public int Id { get; set; }

        public int RepairTicketId { get; set; }
        public RepairTicket RepairTicket { get; set; } = null!;

        public int? ServicePriceId { get; set; }
        public ServicePrice? ServicePrice { get; set; }

        public string CustomDescription { get; set; } = string.Empty;

        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}