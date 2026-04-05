namespace RepairOps.API.DTOs
{
    public class DeviceDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
    }
}