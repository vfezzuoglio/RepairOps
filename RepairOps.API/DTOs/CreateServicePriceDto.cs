namespace RepairOps.API.DTOs
{
    public class CreateServicePriceDto
    {
        public string ServiceName { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}