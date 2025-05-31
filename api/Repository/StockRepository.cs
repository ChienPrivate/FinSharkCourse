using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{

    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDbContext _context;
        public StockRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Stock> CreateAsync(Stock stock)
        {
            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();

            return stock;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync(s => s.Id == id);

            if (stock is null)
            {
                return null;
            }

            _context.Remove(stock);
            await _context.SaveChangesAsync();

            return stock;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            var stock = _context.Stocks.Include(c => c.Comments).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stock = stock.Where(s => s.CompanyName.Contains(query.CompanyName));
            }

            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stock = stock.Where(s => s.Symbol.Contains(query.Symbol));
            }

            if (!string.IsNullOrEmpty(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stock = query.IsDescending ? stock.OrderByDescending(s => s.Symbol) : stock.OrderBy(s => s.Symbol);
                }

                if (query.SortBy.Equals("CompanyName", StringComparison.OrdinalIgnoreCase))
                {
                    stock = query.IsDescending ? stock.OrderByDescending(s => s.CompanyName) : stock.OrderBy(s => s.CompanyName);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await stock.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol == symbol);
        }

        public async Task<bool> StockExists(int id)
        {
            return await _context.Stocks.AnyAsync(s => s.Id == id);
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto requestDto)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (existingStock is null)
            {
                return null;
            }

            existingStock.Symbol = requestDto.Symbol;
            existingStock.CompanyName = requestDto.CompanyName;
            existingStock.Purchase = requestDto.Purchase;
            existingStock.LastDiv = requestDto.LastDiv;
            existingStock.Industry = requestDto.Industry;
            existingStock.MarketCap = requestDto.MarketCap;

            await _context.SaveChangesAsync();

            return existingStock;
        }
    }
}