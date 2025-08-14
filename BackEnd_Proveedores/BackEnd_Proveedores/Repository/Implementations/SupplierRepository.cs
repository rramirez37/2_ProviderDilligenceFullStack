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

        public async Task<SupplierDTO> CreateSupplier(SupplierDTO supplier)
        {
            //Create new supplier
            Supplier newSupplier = _mapper.Map<Supplier>(supplier);
            await _dbContext.Suppliers.AddAsync(newSupplier);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<SupplierDTO>(newSupplier);

        }

        public async Task<bool> DeleteSupplier(int id)
        {
            try
            {
                Supplier supplier = await _dbContext.Suppliers.FindAsync(id);
                if (supplier == null) return false;
                _dbContext.Suppliers.Remove(supplier);
                await _dbContext.SaveChangesAsync();
                return true;
            } catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<SupplierDTO>> GetAllSuppliers() //Get All Suppliers
        {
            List<Supplier> suppliers = await _dbContext.Suppliers.ToListAsync(); //Get all suppliers from BD
            return _mapper.Map<List<SupplierDTO>>(suppliers);

        }

        public async Task<SupplierDTO> GetSupplierByID(int id)
        {
            Supplier supplier = await _dbContext.Suppliers.FindAsync(id);
            if (supplier == null)  return null; 
            else return _mapper.Map<SupplierDTO>(supplier);
        }

        public async Task<SupplierDTO> UpdateSupplier(int id, SupplierDTO supplier)
        {
            Supplier newSupplier = _mapper.Map<Supplier>(supplier);
            _dbContext.Suppliers.Update(newSupplier);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<SupplierDTO>(newSupplier);
        }

        public async Task<bool> DoesSupplierExistName(string name)
        {
            //Check if supplier with same legal name already exists
            return await _dbContext.Suppliers.AnyAsync(s => s.CompanyName == name);
        }
        public async Task<bool> DoesSupplierExistId(int id)
        {
            //Check if supplier with same legal name already exists
            return await _dbContext.Suppliers.AnyAsync(s => s.Id == id);
        }
    }
}
