using BackEnd_Proveedores.Models;
using BackEnd_Proveedores.Models.DTO;
using BackEnd_Proveedores.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Proveedores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpPost("Register")]
        public async Task<ActionResult> RegisterUser(UserDTO userDTO)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            var user = await _userRepository.registerNewUser(userDTO, userDTO.Password);
            if (user == -1) { //User already created
                _apiResponse.Success = false;
                _apiResponse.Message = "User already exists";
                return BadRequest(_apiResponse);
            } else if (user == -500){ //Error while creating user
                _apiResponse.Success = false;
                _apiResponse.Message = "Error while creating user";
                return BadRequest(_apiResponse);
            } else {
                _apiResponse.Success = true;
                _apiResponse.Message = "Succesfully created user";
                return Ok(_apiResponse);
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(UserDTO userDTO)
        {
            ResponseDTO _apiResponse = new ResponseDTO();
            var user = await _userRepository.loginUser(userDTO.Username, userDTO.Password);
            if (user == "nouser")
            {
                _apiResponse.Success = false;
                _apiResponse.Message = "User does not exist";
                _apiResponse.Result = 1;
                return BadRequest(_apiResponse);
            }
            else if (user == "wrongpass")
            {
                _apiResponse.Success = false;
                _apiResponse.Message = "Wrong password submitted";
                _apiResponse.Result = 2;
                return BadRequest(_apiResponse);
            }
            _apiResponse.Success = true;
            _apiResponse.Result = user;
            _apiResponse.Message = "User correctly logged in";
            return Ok(_apiResponse);
        }

    }
}
