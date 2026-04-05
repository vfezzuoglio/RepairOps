namespace RepairOps.API.DTOs
{
    public class CreateRepairNoteDto
    {
        public int UserId { get; set; }
        public string Note { get; set; } = string.Empty;
    }
}