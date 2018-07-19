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
    [HttpGet("{vaultId}")]
    public IEnumerable<Keep> getKeepsByVaultId(int vaultId)
    {
      return _db.GetKeepsByVaultId(vaultId);
    }



    // //get vaultkeep by id
    // [HttpGet("{id}")]
    // public IEnumerable<Keep> GetbyVaultKeepsId(int id)
    // {
    //   return _db.GetbyVaultKeepsId(id);
    // }
    // //get vault by author
    // [HttpGet("author/{id}")]
    // public IEnumerable<VaultKeeps> GetByuserId(int id)
    // {
    //   return _db.GetbyuserId(id);
    // }
    // //edit vault
    // [HttpPut("{id}")]
    // public VaultKeeps EditVaultKeeps(int id, [FromBody]VaultKeeps newVaultKeeps)
    // {
    //   return _db.EditVaultKeeps(id, newVaultKeeps);
    // }
  }
}