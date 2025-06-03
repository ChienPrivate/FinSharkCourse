using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentExisting = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

            if (commentExisting is null)
                return null;

            _context.Comments.Remove(commentExisting);
            await _context.SaveChangesAsync();

            return commentExisting;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQuerryObject querryObject)
        {
            var comments = _context.Comments.Include(c => c.AppUser).AsQueryable();

            if (!string.IsNullOrWhiteSpace(querryObject.Symbol))
            {
                comments = comments.Where(s => s.Stock.Symbol == querryObject.Symbol);
            }

            if (querryObject.IsDescending is true)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }

            return await comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(c => c.AppUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment?> UpdateAsync(int Id, Comment commentModel)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == Id);

            if (comment is null)
            {
                return null;
            }

            comment.Title = commentModel.Title;
            comment.Content = commentModel.Content;

            await _context.SaveChangesAsync();

            return comment;
        }
    }
}