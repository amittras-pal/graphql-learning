## GraphQL Schemas

Refer the page from the [documentation](https://graphql.org/learn/schema/)

TL;DR:

It's the blueprint which tells GraphQL

- What Entities are present in the DB,
- What do they look like
- How to read those records
- How those entities relate to each other

### Root Queries

The entry point to allow graphql to start traversing the "graph". From there on, the relations take over in order to find other related pieces of information.

Ench entity store in the DB should ideally have an entry in the RootQuery object.

### Nested Queries

The relations between different entities are resolved using a `resolve` function which allows to find the entity information. Nested queries are executed only when that particular field is being queried.

### Resolving Circular References

For bidirectionally related entities, the `fields` property on the entity description should be function resolving to the object. This is to avoid creating circular references while declaring different object which relate back to each other in the schema file.

By convension, all entities in the system should have their fields being provided by a function in the way mentioned above.

### Writing Queries.

Check out the folder `queries` to see various ways in which queries can be written to execute.
