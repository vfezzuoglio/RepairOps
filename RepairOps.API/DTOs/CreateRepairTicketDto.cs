namespace RepairOps.API.DTOs
{
    public class CreateRepairTicketDto
    {
        public int CustomerId { get; set; }
        public int DeviceId { get; set; }
        public int AssignedUserId { get; set; }
        public string IssueDescription { get; set; } = string.Empty;
        public string IntakeNotes { get; set; } = string.Empty;
        public int CreatedByUserId { get; set; }
        
    }
}