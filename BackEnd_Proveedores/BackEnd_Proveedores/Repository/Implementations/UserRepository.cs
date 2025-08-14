using BackEnd_Proveedores.Data;
using BackEnd_Proveedores.Models;
using BackEnd_Proveedores.Models.DTO;
using BackEnd_Proveedores.Repository.Interfaces;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BackEnd_Proveedores.Repository.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly SupplierDBContext _dbContext; //Database context
        private readonly IMapper _mapper; //Mapster mapper
        private readonly IConfiguration _configuration; //App config

        public UserRepository(SupplierDBContext dbContext, IMapper mapper, IConfiguration configuration) //Constructor
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<string> loginUser(string username, string password)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username.ToLower().Equals(username.ToLower()));
            if (user == null) return "nouser";
            else if (!verifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) return "wrongpass";
            else return createToken(user);
        }

        public async Task<int> registerNewUser(UserDTO user, string password)
        {
            try
            {
                User newUser = new User() { Username = user.Username };
                if (await userRegistered(newUser.Username)) return -1;
                createPasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                newUser.PasswordSalt = passwordSalt;
                newUser.PasswordHash = passwordHash;
                await _dbContext.Users.AddAsync(newUser);
                await _dbContext.SaveChangesAsync();
                return newUser.Id;

            } catch (Exception ex) { return -500; }

        }

        public async Task<bool> userRegistered(string username)
        {
            if (await _dbContext.Users.AnyAsync(user => user.Username.ToLower().Equals(username.ToLower()))) return true;
            else return false;
        }

        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        private string createToken(User user)
        {
            var claims = new List<Claim>() {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier,user.Username)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
