

namespace BackEnd_Proveedores.Models.DTO
{
    public class SupplierDTO
    {
        public int Id { get; set; } //Database identifier
        public string CompanyName { get; set; } //Company legal name (Razón Social)
        public string CommercialName { get; set; } //Company commercial name (Nombre comercial)
        public long TaxIdentifier { get; set; } //Identifier (Identificacion tributaria)
        public string PhoneNumber { get; set; } //Phone number (Número telefónico)
        public string Email { get; set; } //Contact email address (Correo electrónico)
        public string Website { get; set; } //Website (Sitio web)
        public string Address { get; set; } //Physical address (dirección física)
        public int CountryId { get; set; } //Country Id associated with Country table (País)
        public Country Country { get; set; } //Navigation property for Country details
        public decimal AnnualBilling { get; set; } //Annual billing in dollars (Facturación anual en dólares)
        public DateTime LastEditedDateTime { get; set; } //Date and time of last edit (Fecha de última edicion)
    }
}
