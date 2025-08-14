using BackEnd_Proveedores.Data;
using BackEnd_Proveedores.Models;
using BackEnd_Proveedores.Models.DTO;
using BackEnd_Proveedores.Repository.Interfaces;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Proveedores.Repository.Implementations
{
    public class CountryRepository : ICountryRepository
    {
        private readonly SupplierDBContext _dbContext; //Database context
        private readonly IMapper _mapper; //Mapster mapper

        public CountryRepository(SupplierDBContext dbContext, IMapper mapper) //Constructor
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<List<CountryDTO>> GetAllCountries()
        {
            List<Country> countries = await _dbContext.Countries.ToListAsync(); //Get all suppliers from BD
            return _mapper.Map<List<CountryDTO>>(countries);
        }

        public async Task<CountryDTO> GetCountryByID(int id)
        {
            Country country = await _dbContext.Countries.FindAsync(id);
            if (country == null) return null;
            else return _mapper.Map<CountryDTO>(country);
        }
    }
}
