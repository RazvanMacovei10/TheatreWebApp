using BusinessLogic.Abstract;
using Core.AbstractServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DataLayer.DTOs;

namespace TheatreAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RegisterFormController : ControllerBase
    {
        private readonly IRegisterFormBL _registerFormBL;
        private readonly IUserBL _userBL;
        private readonly ITheatreBL _theatreBL;
        private readonly IMapper _mapper;
        public RegisterFormController(IRegisterFormBL registerFormBL, IMapper mapper, IUserBL userBL, ITheatreBL theatreBL)
        {
            _registerFormBL = registerFormBL;
            _mapper = mapper;
            _userBL = userBL;
            _theatreBL = theatreBL;
        }

        [HttpGet]
        public async Task<IActionResult> GetRegisterForms()
        {
            List<RegisterForm> forms = (List<RegisterForm>)await _registerFormBL.GetAll();
            List<RegisterFormDTO> formsDTO = _mapper.Map<List<RegisterFormDTO>>(forms);
            return Ok(formsDTO);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateUserFromRegisterForm(int id)
        {
            RegisterForm registerForm = await _registerFormBL.GetById(id);
            await _registerFormBL.DeleteAsync(id);
            if (registerForm == null)
            {
                return BadRequest("Form not found");
            }
            User user = new User()
            {
                UserName = registerForm.Username,
                Email = registerForm.Email,
                PasswordHash = registerForm.PasswordHash,
                PasswordSalt = registerForm.PasswordSalt,
                RoleId = 3
            };

            await _userBL.Add(user);
            Theatre theatre = new Theatre()
            {
                Name= registerForm.Name,
                Address = registerForm.Address,
                TotalSeats = registerForm.TotalSeats,
                Image = registerForm.Image,
                User = user
            };
            
            await _theatreBL.Add(theatre);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            await _registerFormBL.DeleteAsync(id);
            return Ok();
        }
    }
}

