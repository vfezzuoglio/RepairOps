namespace RepairOps.API.DTOs
{
    public class PartDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int PartNumber { get; set; }
        public int Quantity { get; set; }
        public int LowStockThreshold { get; set; }
        public bool IsLowStock { get; set; }
    }
}