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
        public VaultKeeps CreateVaultKeeps(VaultKeeps newVaultKeeps)
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

        // GetAll VaultKeeps
        public IEnumerable<VaultKeeps> GetAll()
        {
            return _db.Query<VaultKeeps>("SELECT * FROM keeps;");
        }

        //GetbyVaultKeepsId
        public IEnumerable<Keep> GetbyVaultKeepsId(int id)
        {
            return _db.Query<Keep>("SELECT * FROM vaultkeeps");
        }

        // GetbyAuthor
        public IEnumerable<VaultKeeps> GetbyAuthorId(int id)
        {
            return _db.Query<VaultKeeps>("SELECT * FROM vaultkeeps WHERE userId = @id;", new { id });
        }

        // Edit
        public VaultKeeps EditVaultKeeps(int id, VaultKeeps vaultkeeps)
        {
            vaultkeeps.Id = id;
            var i = _db.Execute(@"
                UPDATE vaultkeeps SET
                    title = @Title,
                    body = @Body
                WHERE id = @Id
            ", vaultkeeps);
            if (i > 0)
            {
                return vaultkeeps;
            }
            return null;
        }
    }
}