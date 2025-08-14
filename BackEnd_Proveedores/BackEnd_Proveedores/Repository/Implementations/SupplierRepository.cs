using BackEnd_Proveedores.Data;
using BackEnd_Proveedores.Models;
using BackEnd_Proveedores.Models.DTO;
using BackEnd_Proveedores.Repository.Interfaces;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Proveedores.Repository.Implementations
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly SupplierDBContext _dbContext; //Database context
        private readonly IMapper _mapper; //Mapster mapper

        public SupplierRepository(SupplierDBContext dbContext, IMapper mapper) //Constructor
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<SupplierDTO> CreateSupplier(SupplierDTO supplier) 
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteSupplier()
        {
            throw new NotImplementedException();
        }

        public async Task<List<SupplierDTO>> GetAllSuppliers() //Get All Suppliers
        {
            List<Supplier> suppliers = await _dbContext.Suppliers.ToListAsync(); //Get all suppliers from BD
            return _mapper.Map<List<SupplierDTO>>(suppliers);
            
        }

        public Task<SupplierDTO> GetSupplierByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task<SupplierDTO> UpdateSupplier(int id, SupplierDTO supplier)
        {
            throw new NotImplementedException();
        }
    }
}
