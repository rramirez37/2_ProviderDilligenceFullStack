using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd_Proveedores.Models
{
    public class Supplier
    {
        [Key]
        public int Id { get; set; } //Database identifier
        [Required]
        public string CompanyName { get; set; } //Company legal name (Razón Social)
        public string CommercialName { get; set; } //Company commercial name (Nombre comercial)
        [Required]
        public long TaxIdentifier { get; set; } //Identifier (Identificacion tributaria)
        [Phone]
        public string PhoneNumber { get; set; } //Phone number (Número telefónico)
        [EmailAddress]
        public string Email { get; set; } //Contact email address (Correo electrónico)
        [Url]
        public string Website { get; set; } //Website (Sitio web)
        public string Address { get; set; } //Physical address (dirección física)
        [Required]
        public int CountryId { get; set; } //Country Id associated with Country table (País)
        public Country Country { get; set; } //Navigation property for Country details
        [DataType(DataType.Currency)]
        public decimal AnnualBilling { get; set; } //Annual billing in dollars (Facturación anual en dólares)
        [Required]
        public DateTime LastEditedDateTime { get; set; } //Date and time of last edit (Fecha de última edicion)
    }
}
