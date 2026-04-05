namespace RepairOps.API.Models
{
    public class Part
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public int PartNumber { get; set; }
        public int Quantity { get; set; }
        public int LowStockThreshold { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}