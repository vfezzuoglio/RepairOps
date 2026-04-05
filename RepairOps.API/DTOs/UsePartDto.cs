namespace RepairOps.API.DTOs
{
    public class UsePartDto
    {
        public int PartId { get; set; }
        public int RepairTicketId { get; set; }
        public int Quantity { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}