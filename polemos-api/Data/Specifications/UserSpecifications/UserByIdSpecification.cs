namespace polemos_api.Data.Specifications.UserSpecifications;

public class UserByIdSpecification : BaseSpecification<User>
{
    public UserByIdSpecification(int id) : base(x => x.User_SK == id)
    {

    }
}
