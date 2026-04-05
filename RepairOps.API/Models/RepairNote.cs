namespace RepairOps.API.Models
{
    public class RepairNote
    {
        public int Id { get; set; }

        public int RepairTicketId { get; set; }
        public RepairTicket RepairTicket { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public string Note { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}