namespace RepairOps.API.DTOs
{
    public class CreatePartDto
    {
        public string Name { get; set; } = string.Empty;
        public int PartNumber { get; set; }
        public int Quantity { get; set; }
        public int LowStockThreshold { get; set; }
    }
}