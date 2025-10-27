using polemos_api.Data.Models;

namespace polemos_api.Data.Specifications.UserSpecifications;

public class UserByIdSpecification : BaseSpecification<ApplicationUser>
{
    public UserByIdSpecification(int id) : base(x => x.User_SK == id)
    {
    }
}
