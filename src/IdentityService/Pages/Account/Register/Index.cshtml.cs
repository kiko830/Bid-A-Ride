using System.Security.Claims;
using Duende.IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace IdentityService.Pages.Account.Register
{
    [SecurityHeaders]
    [AllowAnonymous]
    public class Index(UserManager<ApplicationUser> _userManager) : PageModel
    {

        [BindProperty]
        public RegisterViewModel Input { get; set; }=new();
        [BindProperty]
        public bool RegisterSuccess { get; set; } 
        public IActionResult OnGet(string ReturnUrl)
        {
            Input = new RegisterViewModel
            {
                ReturnUrl = ReturnUrl
            };
            return Page();
        }

        public async Task<IActionResult> OnPost()
        {
            if (Input.Button !="register") return Redirect("~/");

            if(ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = Input.Username,
                    Email = Input.Email,
                    EmailConfirmed = true,
                };
                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddClaimsAsync(user, new Claim[]
                    {
                        new Claim(JwtClaimTypes.Name, Input.FullName)
                    });
                    RegisterSuccess = true;
                }
                
            }
            return Page();

        }
    }
}
