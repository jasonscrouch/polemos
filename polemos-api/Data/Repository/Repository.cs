using Microsoft.EntityFrameworkCore;
using polemos_api.Data.Specifications;

namespace polemos_api.Data.Repository;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly ApplicationContext _appContext;

    public Repository(ApplicationContext appContext)
    {
        _appContext = appContext;
    }

    public T Add(T entity)
    {
        _appContext.Set<T>().Add(entity);

        return entity;
    }

    public async Task<T?> FirstOrDefaultAsync(ISpecification<T> specification)
    {
        return await _appContext.Set<T>().FirstOrDefaultAsync(specification.Criteria);
    }

    public async Task<T> SingleAsync(ISpecification<T> specification)
    {
        return await _appContext.Set<T>().SingleAsync(specification.Criteria);
    }

    public async Task<List<T>> ListAsync(ISpecification<T> specification)
    {
        var queryableResultWithIncludes = specification.Includes
                .Aggregate(_appContext.Set<T>().AsQueryable(),
                    (current, include) => current.Include(include));

        return await queryableResultWithIncludes
                        .Where(specification.Criteria)
                        .ToListAsync();
    }

    public T Remove(T entity)
    {
        _appContext.Set<T>().Remove(entity);

        return entity;
    }

    public IEnumerable<T> RemoveRange(IEnumerable<T> entities)
    {
        _appContext.Set<T>().RemoveRange(entities);

        return entities;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _appContext.SaveChangesAsync();
    }
}
