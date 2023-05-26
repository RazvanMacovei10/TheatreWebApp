using BusinessLogic.Abstract;
using BusinessLogic.BL;
using Core.AbstractServices;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace TheatreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController:ControllerBase
    {
        private readonly IUserBL _userBL;
        private readonly ITokenBL _tokenBL;
        private readonly IUserRoleBL _userRoleBL;
        private readonly IRegisterFormBL _registerFormBL;
        public AccountController(IUserBL userBL,ITokenBL tokenBL, IUserRoleBL userRoleBL, IRegisterFormBL registerFormBL)
        {
            _userBL = userBL;
            _tokenBL = tokenBL;
            _userRoleBL = userRoleBL;
            _registerFormBL = registerFormBL;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>>Register(RegisterDTO registerDTO)
        {

            if(await _userBL.UserExists(registerDTO.Username))
            {
                return BadRequest("Username is taken");
            }
            if (await _userBL.UserExistsByEmail(registerDTO.Email))
            {
                return BadRequest("Email is taken");
            }

            using var hmac = new HMACSHA512();

            var user = new User()
            {
                UserName = registerDTO.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
                Email=registerDTO.Email.ToLower(),
                RoleId=1,
                Role=await _userRoleBL.GetById(1)
            };
            _userBL.Add(user);
            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenBL.CreateToken(user),
                Role = user.Role.Name
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = _userBL.GetByUsername(loginDTO.Username);

            if (user.Result == null) return Unauthorized("invalid username");

            using var hmac = new HMACSHA512(user.Result.PasswordSalt);

            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for(int i=0;i<computedhash.Length;i++)
            {
                if (computedhash[i] != user.Result.PasswordHash[i]) return Unauthorized("invalid password");
            }
            return new UserDTO
            {
                Username = user.Result.UserName,
                Token = _tokenBL.CreateToken(user.Result),
                Role = user.Result.Role.Name
            };
        }
        [HttpPost("register-theatre")]
        public async Task<IActionResult> RegisterTheatre(RegisterFormDTO registerFormDTO)
        {

            if (await _userBL.UserExists(registerFormDTO.Username))
            {
                return BadRequest("Username is taken");
            }
            if (await _userBL.UserExistsByEmail(registerFormDTO.Email))
            {
                return BadRequest("Email is taken");
            }
            using var hmac = new HMACSHA512();

            var registerForm = new RegisterForm()
            {
                Username = registerFormDTO.Username.ToLower(),
                Name = registerFormDTO.Name,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerFormDTO.Password)),
                PasswordSalt = hmac.Key,
                Email = registerFormDTO.Email.ToLower(),
                Address = registerFormDTO.Address,
                Image = Convert.FromBase64String(registerFormDTO.Image),
                TotalSeats = registerFormDTO.TotalSeats
            };
            await _registerFormBL.Add(registerForm);
            return Ok(registerForm);
        }

        [HttpPost("change-password/{username}")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePasswordDTO,string username)
        {
            var user = _userBL.GetByUsername(username);

            if (user.Result == null) return BadRequest("invalid username");

            using var hmac = new HMACSHA512(user.Result.PasswordSalt);

            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(changePasswordDTO.OldPassword));

            for (int i = 0; i < computedhash.Length; i++)
            {
                if (computedhash[i] != user.Result.PasswordHash[i]) return BadRequest("Old password is incorrect.");
            }
            if (changePasswordDTO.Password!=changePasswordDTO.ConfirmPassword)
            {
                return BadRequest("New password and confirm password must be the same");
            }


            user.Result.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(changePasswordDTO.Password));
                user.Result.PasswordSalt = hmac.Key;

            await _userBL.UpdateUserAsync(user.Result.Id, user.Result);

            
            return Ok();
        }

    }
}
