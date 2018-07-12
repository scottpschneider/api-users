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
    private readonly VaultRepository _db;
    public VaultKeepsController(VaultRepository repo)
    {
      _db = repo;  
    }
    [HttpPost]
    [Authorize]
    public Vault CreateVault([FromBody]Vault newVault)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVault.AuthorId = user.Identity.Name;
        return _db.CreateVault(newVault);
      }
      return null;
    }
    //get all vaults
    [HttpGet]
    public IEnumerable<Vault> GetAll()
    {
      return _db.GetAll();
    }
    //get vault by id
    [HttpGet("{id}")]
    public Vault GetById(int id)
    {
      return _db.GetbyVaultId(id);
    }
    //get vault by author
    [HttpGet("author/{id}")]
    public IEnumerable<Vault> GetByAuthorId(int id)
    {
      return _db.GetbyAuthorId(id);
    }
    //edit vault
    [HttpPut("{id}")]
    public Vault EditVault(int id, [FromBody]Vault newVault)
    {
      return _db.EditVault(id, newVault);
    }
  }
}