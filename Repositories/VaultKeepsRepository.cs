using System.Collections.Generic;
using System.Data;
using API_Users.Models;
using Dapper;

namespace API_Users.Repositories
{
  public class VaultKeepsRepository : DbContext
  {
    public VaultKeepsRepository(IDbConnection db) : base(db)
    {

    }
    // Create Vault
    public Vault CreateVaultKeep(Vault newVault)
    //need to ask about this, should be (vaultkeep newVaultKeep)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaults (name, description, userId)
                VALUES (@Name, @Body, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", newVault);
      newVault.Id = id;
      return newVault;
    }
    // GetAll Vault
    public IEnumerable<Vault> GetAll()
    {
      return _db.Query<Vault>("SELECT * FROM vaults;");
    }
    // GetbyAuthor
    public IEnumerable<Vault> GetbyAuthorId(int id)
    {
      return _db.Query<Vault>("SELECT * FROM vaults WHERE authorId = @id;", new { id });
    }
    // GetbyId
    public Vault GetbyVaultId(int id)
    {
      return _db.QueryFirstOrDefault<Vault>("SELECT * FROM vaults WHERE id = @id;", new { id });
    }
    // Edit
    public Vault EditVault(int id, Vault vault)
    {
      vault.Id = id;
      var i = _db.Execute(@"
                UPDATE vaults SET
                    title = @Title,
                    body = @Body
                WHERE id = @Id
            ", vault);
      if (i > 0)
      {
        return vault;
      }
      return null;
    }
    // Delete
    public bool DeleteVault(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM vaults
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        return true;
      }
      return false;
    }

    // Add get user favs to user
  }





}
