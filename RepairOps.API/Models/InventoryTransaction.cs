namespace RepairOps.API.Models
{
    public class InventoryTransaction
    {
        public int Id { get; set; }

        public int PartId { get; set; }
        public Part Part { get; set; } = null!;

        public int? RepairTicketId { get; set; }
        public RepairTicket? RepairTicket { get; set; }
        public int QuantityChanged { get; set; }
        public string Note { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
       
    }
}