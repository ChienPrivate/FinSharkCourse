using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        public PortfolioController(UserManager<AppUser> userManager,
        IStockRepository stockRepo,
        IPortfolioRepository portfolio)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolio;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var username = User.GetUserName();

            var appUser = await _userManager.FindByNameAsync(username);

            var userPortfolio = await _portfolioRepo.GetUserPortFolio(appUser);

            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var username = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(username);
            var stock = await _stockRepo.GetBySymbolAsync(symbol);

            if (stock is null)
                return BadRequest();

            var userPortfolio = await _portfolioRepo.GetUserPortFolio(appUser);

            if (userPortfolio.Any(e => e.Symbol.ToLower() == symbol.ToLower()))
                return BadRequest();

            var portfolioModel = new Portfolio
            {
                StockId = stock.Id,
                AppUserId = appUser.Id
            };

            await _portfolioRepo.CreateAsync(portfolioModel);

            if (portfolioModel is null)
                return StatusCode(500, "Could not create");
            else
            {
                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                var locationUrl = $"{baseUrl}/api/portfolios/{symbol}";
                return Created(locationUrl, portfolioModel);
            }    
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            var username = User.GetUserName();

            var user = await _userManager.FindByNameAsync(username);

            var userPortfolio = await _portfolioRepo.GetUserPortFolio(user);

            var filterStock = userPortfolio.Where(s => s.Symbol.ToLower() == symbol.ToLower()).ToList();

            if(filterStock.Count() is 1)
            {
                await _portfolioRepo.DeleteAsync(user, symbol);
            }
            else
            {
                return BadRequest("Stock not in your porfolio");
            }

            return Ok();
        }
    }
}