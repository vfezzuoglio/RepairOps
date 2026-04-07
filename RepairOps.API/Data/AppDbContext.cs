using Microsoft.EntityFrameworkCore;
using RepairOps.API.Models;

namespace RepairOps.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<RepairTicket> RepairTickets { get; set; }
        public DbSet<RepairNote> RepairNotes { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
        public DbSet<ServicePrice> ServicePrices { get; set; }
        public DbSet<TicketService> TicketServices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ServicePrice>()
                .Property(s => s.Price)
                .HasColumnType("decimal(10,2)");

            modelBuilder.Entity<TicketService>()
                .Property(ts => ts.Price)
                .HasColumnType("decimal(10,2)");
        }
    }
}