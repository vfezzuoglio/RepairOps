namespace RepairOps.API.DTOs
{
    public class RepairTicketDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public int DeviceId { get; set; }
        public string DeviceBrand { get; set; } = string.Empty;
        public string DeviceModel { get; set; } = string.Empty;
        public int AssignedUserId { get; set; }
        public string AssignedUserName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string IssueDescription { get; set; } = string.Empty;
        public string IntakeNotes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}