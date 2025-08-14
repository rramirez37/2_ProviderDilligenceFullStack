namespace BackEnd_Proveedores.Models.DTO
{
    public class ResponseDTO //Class to structure responses
    {
        public bool Success { get; set; } //Determine if process was successful
        public string Message { get; set; } //Details about process execution
        public object Result { get; set; } //Desired result 
        public List<string> Errors { get; set; } //Error(s) presented in execution
    }
}
