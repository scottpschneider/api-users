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
 public VaultKeeps CreateVaultKeep(VaultKeeps newVaultKeeps)
        //need to ask about this, should be (vaultkeep newVaultKeep)
        {
            int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaultkeeps (vaultId, keepId, userId)
                VALUES (@VaultId, @KeepId, @UserId);
                SELECT LAST_INSERT_ID();
            ", newVaultKeeps);
            newVaultKeeps.Id = id;
            return newVaultKeeps;
        }
}
}