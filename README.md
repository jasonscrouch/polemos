# Project Title

Polemos

# Project Description

A battle simulation in which a user creates combatants and battles them.

# Features

1. Add a combatant
2. Remove a combatant
3. Battle combatants
4. View battle statistics

# Technologies Used

React
React Router
Vite
Bootstrap
Bootstrap Icons
EntityFramework

# Languages Used

C#
TS

# Requirements

VS Code or another IDE.

Docker Desktop and the VS Code Containers extension are encouraged. These will make it easy to select the `docker-compose.yml` file and `compose up`.

# Installation Instructions using Docker

1. Start Docker Desktop
2. Pull the project
3. Open project in IDE
4. Using the VS Code Containers extension, right click the `docker-compose.yml` file and select `compose up`.
5. Navigate to Docker Desktop's Containers and select the frontend's port.

# Special Thanks

I'd like to thank [DevIQ](https://deviq.com/) for help with the Respository Pattern and the Specification Pattern.

# Images

All images from https://stock.adobe.com/

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
