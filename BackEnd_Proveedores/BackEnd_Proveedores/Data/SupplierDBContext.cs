using BackEnd_Proveedores.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Proveedores.Data
{
    public class SupplierDBContext : DbContext
    {
        public SupplierDBContext(DbContextOptions<SupplierDBContext> options) : base(options)
        {
            
        }

        //Create all models related to classes
        public DbSet<Supplier> Suppliers {  get; set; } //Supplier model
        public DbSet<Country> Countries { get; set; } //Country model
        public DbSet<User> Users { get; set; } //User model

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Supplier>().Property(s => s.AnnualBilling).HasPrecision(18, 2);
        }
    }
}
