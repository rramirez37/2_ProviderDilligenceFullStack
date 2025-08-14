using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd_Proveedores.Data;
using BackEnd_Proveedores.Models;
using BackEnd_Proveedores.Repository.Interfaces;
using BackEnd_Proveedores.Models.DTO;

namespace BackEnd_Proveedores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierRepository _supplierRepository;
        protected ResponseDTO _apiResponse;

        public SuppliersController(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
            _apiResponse = new ResponseDTO();
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliers()
        {
            try{
                var suppliers = await _supplierRepository.GetAllSuppliers(); //Get all suppliers from repository
                //Generate and return successful query
                _apiResponse.Success = true;
                _apiResponse.Result = suppliers;
                _apiResponse.Message = "Successfully extracted suppliers";
                return Ok(_apiResponse); 
            } catch (Exception exception)
            {
                //Return internal error
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while extracting suppliers";
                _apiResponse.Errors = new List<string>
                {
                    exception.ToString()
                };
                return StatusCode(500, _apiResponse);
            }
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            return NotFound();
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, Supplier supplier)
        {
            return NotFound();
        }

        // POST: api/Suppliers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(Supplier supplier)
        {
            return NotFound();
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            return NotFound();
        }

        private bool SupplierExists(int id)
        {
            return false;
        }
    }
}
