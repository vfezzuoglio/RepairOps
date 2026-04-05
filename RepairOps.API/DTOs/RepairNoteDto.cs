namespace RepairOps.API.DTOs
{
    public class RepairNoteDto
    {
        public int Id { get; set; }
        public int RepairTicketId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}