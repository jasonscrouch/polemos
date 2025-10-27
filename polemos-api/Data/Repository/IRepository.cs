using polemos_api.Data.Specifications;

namespace polemos_api.Data.Repository;

public interface IRepository<T>
{
    T Add(T entity);

    Task<T?> FirstOrDefaultAsync(ISpecification<T> specification);

    Task<T> SingleAsync(ISpecification<T> specification);

    Task<List<T>> ListAsync(ISpecification<T> specification);

    T Remove(T entity);

    IEnumerable<T> RemoveRange(IEnumerable<T> entities);

    Task<int> SaveChangesAsync();
}
