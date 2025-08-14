using BackEnd_Proveedores.Models.DTO;
using BackEnd_Proveedores.Repository.Implementations;
using BackEnd_Proveedores.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Proveedores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CountryController : ControllerBase
    {
        private ICountryRepository _countryRepository;

        public CountryController(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }
        // GET: api/Countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseDTO>>> GetCountries()
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            try
            {
                var suppliers = await _countryRepository.GetAllCountries(); //Get all suppliers from repository
                //Generate and return successful query
                _apiResponse.Success = true;
                _apiResponse.Result = suppliers;
                _apiResponse.Message = "Successfully extracted countries";
                return Ok(_apiResponse);
            }
            catch (Exception exception)
            {
                //Return internal error
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while extracting countries";
                /*
                _apiResponse.Errors = new List<string>
                {
                    exception.ToString()
                };*/ //If desired, print specific errors
                return StatusCode(500, _apiResponse);
            }
        }

        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDTO>> GetCountry(int id)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            try
            {
                var supplier = await _countryRepository.GetCountryByID(id);
                if (supplier == null)
                {
                    _apiResponse.Success = false;
                    _apiResponse.Message = "Country not found";
                    return NotFound(_apiResponse);
                }
                else
                {
                    _apiResponse.Success = true;
                    _apiResponse.Result = supplier;
                    _apiResponse.Message = "Successfully extracted country";
                    return Ok(_apiResponse);
                }

            }
            catch (Exception ex)
            {
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while extracting countries";
                return StatusCode(500, _apiResponse);
            }
        }
    }
}
