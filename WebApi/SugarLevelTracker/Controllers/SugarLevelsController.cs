using System.Collections.Generic;
using SugarLevelTracker.Data;
using SugarLevelTracker.Models;

using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SugarLevelTracker.Controllers
{
    [Authorize]
    public class SugarLevelsController : ApiController
    {
        private readonly ApplicationDbContext _db = new ApplicationDbContext();

        // GET: api/SugarLevels
        public async Task<IList<SugarLevel>> GetSugarLevels()
        {
            return await _db.SugarLevels.ToListAsync();
        }

        // GET: api/SugarLevels/5
        [ResponseType(typeof(SugarLevel))]
        public async Task<IHttpActionResult> GetSugarLevel(int id)
        {
            SugarLevel sugarLevel = await _db.SugarLevels.FindAsync(id);
            if (sugarLevel == null)
            {
                return NotFound();
            }

            return Ok(sugarLevel);
        }

        // PUT: api/SugarLevels/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSugarLevel(int id, SugarLevel sugarLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sugarLevel.Id)
            {
                return BadRequest();
            }

            _db.Entry(sugarLevel).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (SugarLevelExists(id))
                {
                    throw;
                }

                return NotFound();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SugarLevels
        [ResponseType(typeof(SugarLevel))]
        public async Task<IHttpActionResult> PostSugarLevel(SugarLevel sugarLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.SugarLevels.Add(sugarLevel);
            await _db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = sugarLevel.Id }, sugarLevel);
        }

        // DELETE: api/SugarLevels/5
        [ResponseType(typeof(SugarLevel))]
        public async Task<IHttpActionResult> DeleteSugarLevel(int id)
        {
            SugarLevel sugarLevel = await _db.SugarLevels.FindAsync(id);
            if (sugarLevel == null)
            {
                return NotFound();
            }

            _db.SugarLevels.Remove(sugarLevel);
            await _db.SaveChangesAsync();

            return Ok(sugarLevel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SugarLevelExists(int id)
        {
            return _db.SugarLevels.Count(e => e.Id == id) > 0;
        }
    }
}