namespace RepairOps.API.Models
{
    public class RepairTicket
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;

        public int DeviceId { get; set; }
        public Device Device { get; set; } = null!;

        public int AssignedUserId { get; set; }
        public User AssignedUser { get; set; } = null!;

        public string Status { get; set; } = "New Intake";
        public string IssueDescription { get; set; } = string.Empty;
        public string IntakeNotes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}