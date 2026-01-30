# Functional React Patterns with fp-ts 🧱

A collection of practical examples demonstrating how to use **Category Theory** and **Algebraic Data Types (ADTs)** to build robust, type-safe React applications.

### Why fp-ts?
Standard React state management often relies on "defensive programming" (checking for nulls) and brittle error handling. This project explores a more deterministic approach:
- **`Option` / `Either`**: For handling optionality and errors without `try/catch` or `null` checks.
- **`Task` / `TaskEither`**: For managing asynchronous side effects with pure functional composition.
- **`Pipe` / `Flow`**: For building clean, readable data transformations.

### What's inside
- Handling API responses with **`TaskEither`**.
- Eliminating "Impossible States" in UI components using ADTs.
- Type-safe form validation using **`Apply`** and **`Validation`**.

---
*“Making the right thing easy and the wrong thing impossible.”*
