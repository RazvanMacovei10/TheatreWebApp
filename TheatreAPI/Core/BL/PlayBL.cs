using BusinessLogic.Abstract;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BL
{
    public class PlayBL:IPlayBL
    {
        private IPlayRepository _playRepository { get; set; }
        public PlayBL(IPlayRepository playRepository)
        {
            _playRepository = playRepository;
        }

        public async Task<List<Play>> GetAll()
        {
            var results = await _playRepository.GetAll();
            return results;
        }

        public async Task<Play> GetById(int id)
        {
            var result = await _playRepository.GetById(id);
            return result;
        }
        public async Task<Play> Add(Play play)
        {
            return await _playRepository.Add(play);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _playRepository.DeleteAsync(id);
        }
    }
}
