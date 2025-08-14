using BackEnd_Proveedores.Models.DTO;

namespace BackEnd_Proveedores.Repository.Interfaces
{
    public interface ISupplierRepository
    {
        Task<List<SupplierDTO>> GetAllSuppliers(); //Get all suppliers
        Task<SupplierDTO> GetSupplierByID(int id); //Get supplier by id
        Task<SupplierDTO> CreateSupplier(SupplierDTO supplier); //Create new supplier
        Task<SupplierDTO> UpdateSupplier(int id, SupplierDTO supplier); //Update existing supplier
        Task<bool> DeleteSupplier(); //Delete selected supplier
    }
}
