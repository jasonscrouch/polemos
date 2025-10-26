using System.Linq.Expressions;

namespace polemos_api.Data.Specifications;

public abstract class BaseSpecification<T> : ISpecification<T>
{
    public Expression<Func<T, bool>> Criteria { get; }

    public List<Expression<Func<T, object>>> Includes { get; } = [];

    public BaseSpecification(Expression<Func<T, bool>> criteria)
    {
        Criteria = criteria;
    }

    public void AddInclude(Expression<Func<T, object>> include)
    {
        Includes.Add(include);
    }
}
