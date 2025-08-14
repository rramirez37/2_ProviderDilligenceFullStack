using BackEnd_Proveedores.Models.DTO;

namespace BackEnd_Proveedores.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<int> registerNewUser(UserDTO user, string password);
        Task<string> loginUser(string username, string password);
        Task<bool> userRegistered(string username);
    }
}
