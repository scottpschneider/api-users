using Microsoft.AspNetCore.Mvc;
using API_Users.Repositories;
using API_Users.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API_Users.Controllers
{
  [Route("api/[controller]")]
  public class KeepController : Controller
  {
    private readonly KeepRepository _db;
    public KeepController(KeepRepository repo)
    {
      _db = repo;  
    }
    [HttpPost]
    [Authorize]
    public Keep CreateKeep([FromBody]Keep newKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newKeep.userId = user.Identity.Name;
        return _db.CreateKeep(newKeep);
      }
      return null;
    }
    //get all keeps
    [HttpGet]
    public IEnumerable<Keep> GetAll()
    {
      return _db.GetAll();
    }
    //get keep by id
    [HttpGet("{id}")]
    public Keep GetById(int id)
    {
      return _db.GetbyKeepId(id);
    }
    //get keep by author
    [HttpGet("author/{id}")]
    public IEnumerable<Keep> GetByuserId(int id)
    {
      return _db.GetbyuserId(id);
    }
    //edit keep
    [HttpPut("{id}")]
    public Keep EditKeep(int id, [FromBody]Keep newKeep)
    {
      return _db.EditKeep(id, newKeep);
    }
  }
}