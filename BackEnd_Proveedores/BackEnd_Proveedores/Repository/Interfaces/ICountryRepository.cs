using BackEnd_Proveedores.Models.DTO;

namespace BackEnd_Proveedores.Repository.Interfaces
{
    public interface ICountryRepository
    {
        Task<List<CountryDTO>> GetAllCountries(); //Get all suppliers
        Task<CountryDTO> GetCountryByID(int id); //Get supplier by id
    }
}
