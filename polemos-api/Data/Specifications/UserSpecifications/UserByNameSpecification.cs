using polemos_api.Data.Models;

namespace polemos_api.Data.Specifications.UserSpecifications;

public class UserByNameSpecification : BaseSpecification<ApplicationUser>
{
    public UserByNameSpecification(string name) : base(x => x.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
    {
    }
}
