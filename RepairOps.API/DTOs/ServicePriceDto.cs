namespace RepairOps.API.DTOs
{
    public class ServicePriceDto
    {
        public int Id { get; set; }
        public string ServiceName { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}