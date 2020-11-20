**Disclaimer:** this API may change a lot since it is still under development. Feel free to help me to create the best boilerplate possible.

# Clean Architecture API with TypeScript

This is my attempt to create an API with [node.js](https://nodejs.org/en/) and [typescript](https://www.typescriptlang.org/) following the principles of [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). I'm using [express.js](https://expressjs.com/pt-br/), but the idea is that you can replace it with any framework you want.

For data storage, I'm using [knex query builder](http://knexjs.org/), so you can use Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift. Again, you can change the data storage with anything you want. As an example, I created a "InMemoryRepository" for testing. You can create new repositories in `src/infrastructure/repositories`. You can add NoSQL too if needed, but you have to create your own repository (I might create an example in the future).

There's also another layer called "common" that you can use as a [cross-cutting concern](https://en.wikipedia.org/wiki/Cross-cutting_concern) layer. In this layer, you may add things that can be used in all other layers, as validations and helpers.

Read more about clean architecture in [this article](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Folder structure

The folder structure may change in the future, but currently we have that:

### `domain`

This is the "domain" or "entities" layer. Here's the description by Uncle Bob:

> Entities encapsulate Enterprise wide business rules. An entity can be an object with methods, or it can be a set of data structures and functions. It doesn’t matter so long as the entities could be used by many different applications in the enterprise.

> If you don’t have an enterprise, and are just writing a single application, then these entities are the business objects of the application. They encapsulate the most general and high-level rules. They are the least likely to change when something external changes. For example, you would not expect these objects to be affected by a change to page navigation, or security. No operational change to any particular application should affect the entity layer.
