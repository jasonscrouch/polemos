# Project Title

Polemos

# Project Description

A battle simulation system

# Features

1. Ability to add a combatant
2. Ability to remove a combatant
3. Ability to battle any two and get a result
4. Ability to get win and loss rate
5. Console or UI display to perform the above actions / display results

# Technologies Used

React
Vite
EntityFramework
C#
TS

# Requirements

VS Code or other IDE capable of running .exe files

# Installation Instructions

1. Pull the project
2. Open in IDE (e.g., Visual Studio Code with C# Dev Tools Extension)
3. Run

# Special Thanks

I'd like to thank [DevIQ](https://deviq.com/) for help with the Respository Pattern and the Specification Pattern.

Usage Instructions

Documentation

Problem Statement: Battle Simulation System - Transformer
You are tasked with developing a simple battle simulation system. The system is intended to be
for transformers. The system should allow users to add transformers, remove transformers,
simulate and display battle results, and display information about transformers.
System requirements

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
