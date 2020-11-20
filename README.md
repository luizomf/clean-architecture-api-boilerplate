**Disclaimer:** this API may change a lot since it is still under development. Feel free to help me to create the best boilerplate possible.

# Clean Architecture API with TypeScript

This is my attempt to create an API with [node.js](https://nodejs.org/en/) and [typescript](https://www.typescriptlang.org/) following the principles of [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). I'm using [express.js](https://expressjs.com/pt-br/), but the idea is that you can replace it with any framework you want.

For data storage, I'm using [knex query builder](http://knexjs.org/), so you can use Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift. Again, you can change the data storage with anything you want. As an example, I created a "InMemoryRepository" for testing. You can create new repositories in `src/infrastructure/repositories`. You can add NoSQL too if needed, but you have to create your own repository (I might create an example in the future).

There's also another layer called "common" that you can use as a [cross-cutting concern](https://en.wikipedia.org/wiki/Cross-cutting_concern) layer. In this layer, you may add things that can be used in all other layers, as validations and helpers.

Read more about clean architecture in [this article](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Clean Architecture Layers

The folder structure may change in the future, but currently we have that:

### domain

This is the "domain" or "entities" layer. Here's the description by Uncle Bob:

> Entities encapsulate Enterprise wide business rules. An entity can be an object with methods, or it can be a set of data structures and functions. It doesn’t matter so long as the entities could be used by many different applications in the enterprise.
>
> If you don’t have an enterprise, and are just writing a single application, then these entities are the business objects of the application. They encapsulate the most general and high-level rules. They are the least likely to change when something external changes. For example, you would not expect these objects to be affected by a change to page navigation, or security. No operational change to any particular application should affect the entity layer. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

### application

This is the **"Use Cases"** layer. Here you may add the application **Use cases**. Here's the description by Uncle Bob:

>The software in this layer contains application specific business rules. It encapsulates and implements all of the use cases of the system. These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their enterprise wide business rules to achieve the goals of the use case.
>
>We do not expect changes in this layer to affect the entities. We also do not expect this layer to be affected by changes to externalities such as the database, the UI, or any of the common frameworks. This layer is isolated from such concerns.
>
>We do, however, expect that changes to the operation of the application will affect the use-cases and therefore the software in this layer. If the details of a use-case change, then some code in this layer will certainly be affected. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

### adapters

This is the "Interface Adapters" layer. I don't really like that name, because I think it's confusing (it may change in the future). The behavior of software in this layer is not the same as the "Adapter" design pattern by Gof, as it must not depend on external layers.

Here's the description by Uncle Bob:

> The software in this layer is a set of adapters that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the Database or the Web. It is this layer, for example, that will wholly contain the MVC architecture of a GUI. The Presenters, Views, and Controllers all belong in here. The models are likely just data structures that are passed from the controllers to the use cases, and then back from the use cases to the presenters and views.
>
> Similarly, data is converted, in this layer, from the form most convenient for entities and use cases, into the form most convenient for whatever persistence framework is being used. i.e. The Database. No code inward of this circle should know anything at all about the database. If the database is a SQL database, then all the SQL should be restricted to this layer, and in particular to the parts of this layer that have to do with the database.
>
> Also in this layer is any other adapter necessary to convert data from some external form, such as an external service, to the internal form used by the use cases and entities. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))


I tried my best to follow this description, but It's a bit confusing to me.

### infrastructure

This folder (layer) is where we add everything related to external "**Frameworks and Drivers**". Here you can add the repositories, external frameworks, web and so on.

Here's the description by Uncle Bob:

>The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc. Generally you don’t write much code in this layer other than glue code that communicates to the next circle inwards.
>
>This layer is where all the details go. The Web is a detail. The database is a detail. We keep these things on the outside where they can do little harm. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

## Clean Architecture visual guide

Here is a visual guide that may help you:

[![Clean Architecture - By Uncle Bob](https://raw.githubusercontent.com/luizomf/clean-architecture-api-boilerplate/master/docs/clean-architecture.png)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

Notice the "Dependency rule" (the arrows pointing inwards to the Entities). Here's the description of this rule:

> ## The Dependency Rule
>The concentric circles represent different areas of software. In general, the further in you go, the higher level the software becomes. The outer circles are mechanisms. The inner circles are policies.
>
>The overriding rule that makes this architecture work is The Dependency Rule. This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in the an inner circle. That includes, functions, classes. variables, or any other named software entity.
>
>By the same token, data formats used in an outer circle should not be used by an inner circle, especially if those formats are generate by a framework in an outer circle. We don’t want anything in an outer circle to impact the inner circles. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

In our case, data enter the system via "express routes" (infrastructure layer) to the "controllers" (adapters layer), to the "use cases" (application layer), to the "domain" (domain/entities layer).

## Folder Structure in detail

```
src - root directory
├── adapters - Interface Adapters (described in clean architecture layers)
│   ├── controllers - all controller implementations (interface is in application layer)
│   │   └── user - controllers for "User" entity
│   ├── presenters - all presenters implementations
│   │   └── responses - all response models
│   │       ├── generic - generic response models
│   │       └── user - "User" entity response models
│   └── validation - validations for this layer
│       ├── common - common validation that may be used by other entities
│       └── user - "User" entity validations
│           ├── composites - validations that may be composed by other validations
│           └── single-validations - validations that are specific for some cases
├── application - Use Cases (described in clean architecture layers)
│   ├── errors - all application related errors
│   ├── ports - the name is from "Hexagonal Architecture". Just interfaces here.
│   │   ├── controllers - interfaces for controllers
│   │   ├── presenters - interfaces for presenters
│   │   ├── repositories - interfaces for repositories
│   │   ├── request - interfaces for request models
│   │   ├── response - interfaces for response models
│   │   ├── security - interfaces for any security concern
│   │   ├── user - data model for users (interfaces)
│   │   └── validators - validator interfaces
│   └── use-cases - all application use cases
│       └── user - all use cases for user entity
├── common - Cross-cutting concerns (add things that can be used in all layers)
│   └── validators - mostly adapters (by Gof) for any validator
├── domain - Domain/Entities (described in clean architecture layers)
│   └── user - the entity "User"
└── infrastructure - Frameworks and Drivers (described in clean architecture layers)
    ├── console-application - this is nothing really, just me testing the controllers
    ├── express - all express configs
    │   ├── middlewares - express middlewares
    │   ├── routes - express routes
    │   ├── setup - express setups
    │   └── utils - express helper functions
    ├── factories - factories to put all classes together (generally controllers)
    │   └── user - factories for user controllers
    ├── knex - knex configurations
    │   └── migrations - knex migrations
    └── repositories - add your repositories here
        └── user - repositories for "User" entity
            ├── sql - repositories related to SQL (I'm using PostgreSQL)
            └── testing-repository - an in memory repository made just for fun
```
