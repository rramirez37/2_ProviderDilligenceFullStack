using System.ComponentModel.DataAnnotations;

namespace BackEnd_Proveedores.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } //User id
        [Required]
        public string Username { get; set; } //Username
        [Required]
        public byte[] PasswordHash { get; set; } //PasswordHash for password encryption
        [Required]
        public byte[] PasswordSalt { get; set; } //PasswordSalt for password encryption

    }
}
