using BackEnd_Proveedores.Data;
using BackEnd_Proveedores.Models;
using BackEnd_Proveedores.Models.DTO;
using BackEnd_Proveedores.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd_Proveedores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierRepository _supplierRepository;

        public SuppliersController(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseDTO>>> GetSuppliers()
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            try
            {
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
                /*
                _apiResponse.Errors = new List<string>
                {
                    exception.ToString()
                };*/ //If desired, print specific errors
                return StatusCode(500, _apiResponse);
            }
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDTO>> GetSupplier(int id)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            try
            {
                var supplier = await _supplierRepository.GetSupplierByID(id);
                if (supplier == null)
                {
                    _apiResponse.Success = false;
                    _apiResponse.Message = "Supplier not found";
                    return NotFound(_apiResponse);
                } else
                {
                    _apiResponse.Success = true;
                    _apiResponse.Result = supplier;
                    _apiResponse.Message = "Successfully extracted supplier";
                    return Ok(_apiResponse);
                }
                    
            } catch (Exception ex)
            {
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while extracting supplier";
                return StatusCode(500, _apiResponse);
            }
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, SupplierDTO supplier)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            try
            {
                bool doesSupplierExist = await _supplierRepository.DoesSupplierExistId(id);
                if (!doesSupplierExist){
                    _apiResponse.Success = false;
                    _apiResponse.Message = "Supplier not found";
                    return NotFound(_apiResponse);
                } else
                {
                    var newSupplier = await _supplierRepository.UpdateSupplier(id,supplier);
                    _apiResponse.Success = true;
                    _apiResponse.Message = "Supplier updated";
                    _apiResponse.Result = newSupplier;
                    return Ok(_apiResponse);

                }

            } catch(Exception ex)
            {
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while updating supplier";
                return StatusCode(500, _apiResponse);
            }

        }

        // POST: api/Suppliers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ResponseDTO>> PostSupplier(SupplierDTO supplier)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            try
            {
                bool doesSupplierAlreadyExist = await _supplierRepository.DoesSupplierExistName(supplier.CompanyName);
                if (doesSupplierAlreadyExist) //If legal name already exists, warn the user
                {
                    _apiResponse.Success = false;
                    _apiResponse.Message = "Supplier with same legal name already in database";
                    return BadRequest(_apiResponse);
                }
                else
                {
                    var newSupplier = await _supplierRepository.CreateSupplier(supplier);
                    _apiResponse.Success = true;
                    _apiResponse.Message = "Supplier created";
                    _apiResponse.Result = newSupplier;
                    return Ok(_apiResponse);
                }
            } catch (Exception ex)
            {
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while creating supplier";
                return StatusCode(500, _apiResponse);
            }
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            try
            {
                bool wasSupplierDeleted = await _supplierRepository.DeleteSupplier(id); 
                if (wasSupplierDeleted)
                {
                    _apiResponse.Result = true;
                    _apiResponse.Message = "Supplier successfully deleted";
                    return Ok(_apiResponse);
                } else
                {
                    _apiResponse.Result = false;
                    _apiResponse.Message = "Supplier not found";
                    return Ok(_apiResponse);
                }
            } catch (Exception ex)
            {
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while creating supplier";
                return StatusCode(500, _apiResponse);
            }

        }

        private bool SupplierExists(int id)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            return false;
        }
    }
}
