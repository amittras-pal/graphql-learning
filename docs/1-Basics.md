## RESTful Routing and its drawbacks

### What is RESTful Routing

For any collection of records on a server, there should be a uniform URL and/or HTTP request method used to utilise that collection of records in a useful manner.

It is a set of conventions for interacting with the database.

Problems arise when dealing with heavily connected entities (complex relations). Heavy relations need to be handled in one of the following ways

- Require heavily nested routes with fragments.
  - Complex resource names.
- Build a lot of very specific query handlers with different params.
- Build highly specific routes for individual types of response structures required.
  - Breaks loose coupling
- Re-use of endpoints also often leads to over-serving of information which is not required by the client.

### Why GraphQL?

- It tries to fix the inconsistencies arising from highly related data in a RESTful routing architecture.
- It tries to fix the issue of over/under-serving the data set.

### What is GraphQL? The super-basic underlying architecture

GraphQL treats any database structure as an interconnected graph of **nodes** _(entities)_ connected to each other via **edges** _(relations)_

Starting from any arbitrary source entry point, it can crawl through edges in order to find all the related information. _Nothing more, nothing less._
