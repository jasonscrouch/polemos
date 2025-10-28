# Project Title

Polemos

# Project Description

A battle simulation in which a user creates combatants and battles them.

# Features

1. Sign Up and Sign In
2. Add a combatant (coming soon)
3. Remove a combatant (coming soon)
4. Battle combatants (coming soon)
5. View battle statistics (coming soon)

# Technologies Used

## Client

- React
- React Router
- Vite
- Bootstrap
- Bootstrap Icons
- Apollo Client
- GraphQL
- SASS

## Server

- EntityFramework
- HotChocolate

# Languages Used

- C#
- TS

# System Requirements

- VS Code or another IDE

## Encouraged

- Docker Desktop and the VS Code Containers extension are both encouraged. With Docker Desktop running and VS Code Containers installed, it will be easy to select the `docker-compose.yml` file and `compose up`.

# Installation Instructions using Docker Desktop and VS Code Containers

1. Start Docker Desktop
2. Pull the project
3. Open project in VS Code
4. Using the Containers extension, right click the `docker-compose.yml` file and select `compose up`.
5. Navigate to Docker Desktop's Containers and select the frontend's port.

# Developing

## API and SPA

When developing the API, use [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer), making sure to enable CORS in the API's `Program.cs`. The sandbox will build out operations (e.g., query, mutation) using the GraphQL syntax. This will make it easy to manually test these operations and copy paste them into the SPA.

# Special Thanks

- [DevIQ](https://deviq.com/) for help with the Respository and Specification Pattern.
- [Intro to GraphQL with .NET (C#) & Hot Chocolate](https://www.apollographql.com/tutorials/intro-hotchocolate/01-overview-setup) for explaining GraphQL and HotChocolate.
- [Introduction to Apollo Client](https://www.apollographql.com/docs/react) for the Apollo Client walkthrough.

# Images

All images from https://stock.adobe.com/

---

# ToDo

Additional requirements 6. Your “boss” would like the simulation system to support other types of battles in the
future.

Some implementation guidelines 7. Implement AT LEAST the following interfaces: (You may have more)
o ITransformer: Interface representing a transformer with properties such as name,
faction, strength, etc. It MUST include name, number of wins/losses, and faction.
o IBattleSimulator – Minimally should have a method to battle two transformers
and return a battle result. This can just be a simple random win/lose.
o IRepository – Ability to store, update, and retrieve any data object you create
(Transformer, Battle results, etc) 8. Implement concrete classes for the interfaces. 9. Ensure the Battle Simulator utilizes the repository. 10. Write a unit test for the battle simulator battle function. 11. Optionally, you can enhance the system by adding features such as ranking transformers,
better simulation etc.
Your solution should demonstrate a clear understanding of Object-Oriented principles such as
encapsulation, inheritance, and polymorphism. Make use of generics to ensure code reusability
and type safety. Additionally, utilize Inversion of Control to decouple dependencies and facilitate
easier testing and maintenance. Keep in mind the goals of your “boss” while building your
system.
