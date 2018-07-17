using Microsoft.AspNetCore.Mvc;
using API_Users.Repositories;
using API_Users.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API_Users.Controllers
{
  [Route("api/[controller]")]
  public class VaultKeepsController : Controller
  {
    private readonly VaultKeepsRepository _db;
    public VaultKeepsController(VaultKeepsRepository repo)
    {
      _db = repo;  
    }
    [HttpPost]
    [Authorize]
    public VaultKeeps CreateVaultKeeps([FromBody]VaultKeeps newVaultKeeps)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVaultKeeps.UserId = user.Identity.Name;
        return _db.CreateVaultKeeps(newVaultKeeps);
      }
      return null;
    }
    //get all vaultkeeps
    [HttpGet]
    public IEnumerable<VaultKeeps> GetAll()
    {
      return _db.GetAll();
    }
    //get vaultkeep by id
    [HttpGet("{id}")]
    public VaultKeeps GetbyVaultKeepsId(int id)
    {
      return _db.GetbyVaultKeepsId(id);
    }
    //get vault by author
    [HttpGet("author/{id}")]
    public IEnumerable<VaultKeeps> GetByAuthorId(int id)
    {
      return _db.GetbyAuthorId(id);
    }
    //edit vault
    [HttpPut("{id}")]
    public VaultKeeps EditVaultKeeps(int id, [FromBody]VaultKeeps newVaultKeeps)
    {
      return _db.EditVaultKeeps(id, newVaultKeeps);
    }
  }
}