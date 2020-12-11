**Disclaimer:** this API may change a lot since it is still under development. Feel free to help me to create the best boilerplate possible. My goal is to put at least an authentication system. CRUD operations for users, token and refresh tokens.

# Clean Architecture API with TypeScript

This is my attempt to create an API with [node.js](https://nodejs.org/en/) and [typescript](https://www.typescriptlang.org/) following the principles of [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). I'm using [express.js](https://expressjs.com/pt-br/), but the idea is that you can replace it with any framework you want.

For data storage, I'm using [knex query builder](http://knexjs.org/), so you can use Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift. Again, you can change the data storage with anything you want. You can create new repositories in `src/infrastructure/repositories`. You can add NoSQL too if needed, but you'll have to create your own repository (I might create an example in the future).

There's also another layer called "common" that you can use as a [cross-cutting concern](https://en.wikipedia.org/wiki/Cross-cutting_concern) layer. In this layer, you may add things that can be used in all other layers, as validations and helpers.

Read more about clean architecture in [this article](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Clean Architecture Layers

The folder structure may change in the future, but currently we have that:

### domain layer

This is the "domain" or "entities" layer. Here's the description by Uncle Bob:

> Entities encapsulate Enterprise wide business rules. An entity can be an object with methods, or it can be a set of data structures and functions. It doesn’t matter so long as the entities could be used by many different applications in the enterprise.
>
> If you don’t have an enterprise, and are just writing a single application, then these entities are the business objects of the application. They encapsulate the most general and high-level rules. They are the least likely to change when something external changes. For example, you would not expect these objects to be affected by a change to page navigation, or security. No operational change to any particular application should affect the entity layer. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

### application layer

This is the **"Use Cases"** layer. Here you may add the application **Use cases**. Here's the description by Uncle Bob:

>The software in this layer contains application specific business rules. It encapsulates and implements all of the use cases of the system. These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their enterprise wide business rules to achieve the goals of the use case.
>
>We do not expect changes in this layer to affect the entities. We also do not expect this layer to be affected by changes to externalities such as the database, the UI, or any of the common frameworks. This layer is isolated from such concerns.
>
>We do, however, expect that changes to the operation of the application will affect the use-cases and therefore the software in this layer. If the details of a use-case change, then some code in this layer will certainly be affected. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

### adapters (presentation) layer

This is the "Interface Adapters" layer. I don't really like that name, because I think it's confusing (it's now called presentation). The behavior of software in this layer is not the same as the "Adapter" design pattern by Gof, as it must not depend on external layers.

I'm using the name **"Presentation"** for this layer.

Here's the description by Uncle Bob:

> The software in this layer is a set of adapters that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the Database or the Web. It is this layer, for example, that will wholly contain the MVC architecture of a GUI. The Presenters, Views, and Controllers all belong in here. The models are likely just data structures that are passed from the controllers to the use cases, and then back from the use cases to the presenters and views.
>
> Similarly, data is converted, in this layer, from the form most convenient for entities and use cases, into the form most convenient for whatever persistence framework is being used. i.e. The Database. No code inward of this circle should know anything at all about the database. If the database is a SQL database, then all the SQL should be restricted to this layer, and in particular to the parts of this layer that have to do with the database.
>
> Also in this layer is any other adapter necessary to convert data from some external form, such as an external service, to the internal form used by the use cases and entities. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

### infrastructure layer

This folder (layer) is where we add everything related to external "**Frameworks and Drivers**". Here you can add the repositories, external frameworks, web and so on.

Here's the description by Uncle Bob:

>The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc. Generally you don’t write much code in this layer other than glue code that communicates to the next circle inwards.
>
>This layer is where all the details go. The Web is a detail. The database is a detail. We keep these things on the outside where they can do little harm. ([Read the source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

### main layer

This layer is where we put everything together. It's the "dirty layer", because most factories will be here. It may depend on all other layers in the system.

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

In our case, data enter the system via "express routes" (infrastructure layer) to the "controllers" (adapters layer), to the "use cases" (application layer), to the "domain" (domain/entities layer). Then the system outputs via "domain" -> "use cases" -> "presentation" -> "infrastructure". I'm using the "main" layer to create factories for "middlewares", and "controllers" (and possibly other factories).

## Folder Structure in detail

**Disclaimer** - I'm currently developing this software and I may not keep changing this README. But it's good for you to see how the application is evolving.

```
src - ROOT
├── application - Application or Use cases layer
│   ├── errors - Errors only
│   ├── ports - Interfaces for everything the use cases need
│   │   ├── controllers - Interfaces for controllers
│   │   ├── middlewares - Interfaces for middlewares
│   │   ├── repositories - Interfaces for repositories
│   │   │   ├── token - Interfaces for token repositories
│   │   │   └── user - Interfaces for user repositories
│   │   ├── requests - Interfaces for requests
│   │   ├── responses - Interfaces for responses
│   │   ├── sanitizers - Interfaces for sanitizers
│   │   ├── security - Interfaces for everything security
│   │   └── validation - Interfaces for validations
│   ├── use-cases - Concrete use cases
│   │   ├── sign-in - Sign-in use cases
│   │   ├── token - Token use cases
│   │   └── user - User use cases
│   └── validation - Concrete validations
│       ├── common - Common validations
│       │   └── leaf - Concrete Validations (single)
│       ├── sign-in - Sign-in validations
│       │   └── composite - Composite sign-in validations
│       └── user - User validations
│           ├── composite - Composite user validations
│           └── leaf - Concrete user validations (single)
├── common - Cross cutting concerns layer
│   ├── adapters - Adapters for external services and libs
│   │   ├── sanitizers - Sanitizers adapters
│   │   │   └── generic - Generic sanitizers
│   │   ├── security - Security Adapters
│   │   └── validators - Validators Adapters
│   └── helpers - Helper functions
│       ├── date - date related helper functions
│       ├── numbers - number related helper functions
│       ├── objects - objects related helper functions
│       └── strings - strings related helper functions
├── domain - Domain Layer
│   ├── models - All models
│   │   ├── role - User role models
│   │   ├── sign-in - Sign-in models
│   │   ├── token - Token models
│   │   └── user - User models
│   └── use-cases - Interfaces for use cases
│       ├── sign-in - Interfaces for sign-in use cases
│       ├── token - Interfaces for token use cases
│       └── user - Interfaces for user use cases
├── infrastructure - Infrastructure layer
│   ├── express - Everything express related
│   │   ├── adapters - Express adapters
│   │   ├── middlewares - Express middlewares
│   │   ├── routes - Express routes
│   │   └── setup - Express setup functions
│   ├── knex - Everything knex related
│   │   ├── migrations - migrations
│   │   └── seeds - seeds
│   └── repositories - Repositories implementations
│       ├── token - Token repositories
│       │   └── sql - SQL Token repositories
│       └── user - User repositories
│           └── sql - SQL user repositories
│               ├── helpers - helper functions
│               ├── models - models
│               └── repositories - repositories
├── main - Main layer
│   └── factories - factories to put everything together
│       ├── controllers - Controller factories
│       │   ├── sign-in - Sign-in factories
│       │   ├── token - Token factories
│       │   └── user - user factories
│       └── middlewares - application specific middlewares
│           └── authentication - authentication middlewares
└── presentation - Presentation layer
    ├── controllers - Concrete controllers
    │   ├── sign-in - Sign-in controller
    │   ├── token - Token controller
    │   └── user - User controller
    ├── middlewares - Concrete application specific middlewares
    │   └── authentication - Authentication middlewares
    └── responses - Response classes
```
## The "User" model

You may notice I created crud operations for a user, added roles, token, refreshTokens and a way to sign-in. You can change it the way you want. I'm adding things on my free time.

## Todo

- [x] Create CRUD operations for "user"
- [x] Create sign-in system with token and refresh token
- [x] Add authorization token to user routes (except "create")
- [x] Create "roles" to allow or disallow access to any route
- [x] Change user routes to allow "Admin" role and owner to access route
- [x] Create a refresh token route to allow regenerate tokens via refresh token

# Routes

Here are routes I already created:

### Users

|`/users`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/users/:id`|get one user|
|GET|`/users`|get all users|
|DELETE|`/users/:id`|delete one user|
|PUT|`/users/:id`|update one user|
|POST|`/users`|create one user|

### Sign-in

|`/sign-in`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|POST|`/sign-in`|return token and refresh token for a user|


