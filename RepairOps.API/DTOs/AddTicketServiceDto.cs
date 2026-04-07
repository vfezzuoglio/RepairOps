namespace RepairOps.API.DTOs
{
    public class AddTicketServiceDto
    {
        public int? ServicePriceId { get; set; }
        public string CustomDescription { get; set; } = string.Empty;
        public decimal? CustomPrice { get; set; }
    }
}