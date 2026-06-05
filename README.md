# Marginalia

A quiet place on the web to read short literary pieces and leave notes in the margin.

---

## What is this?

**Marginalia** are the notes people write in the margins of a book—thoughts, reactions, questions. This project is a small website inspired by that idea.

Each **entry** is one reading: a book cover, the title and author, a short description, and the main text. Anyone can browse and read. If you sign up, you can comment and reply to other readers. Some users can also **add new entries** for everyone to see.

The goal is simple: make it easy to share readings you care about and talk about them with others, without noise or clutter.

---

## What can you do?

- **Explore** the home page and search by book, author, or title  
- **Open an entry** and read the full text  
- **Sign up** to post comments and replies  
- **Manage your account** (name, email, password) in settings  
- **Publish entries** if you have an admin account  

---

## What’s inside this project?

The code is split into two parts that work together:

| Part | Folder | What it is |
| --- | --- | --- |
| **Website** | `apps/client` | What you see in the browser |
| **Server** | `apps/server` | Saves data, handles login, stores comments |

When you run the project locally, the website is usually at [http://localhost:3000](http://localhost:3000) and the server at [http://localhost:3001](http://localhost:3001).

Need more detail? See the docs for each part:

- [Website README](./apps/client/README.md)  
- [Server README](./apps/server/README.md)  

---

## Run it on your computer

You’ll need **Node.js**, **npm**, and **Docker** (for the database). Steps:

1. **Install dependencies** (from the project root):

   ```bash
   npm install
   ```

2. **Set up the server** — copy `apps/server/.env.example` to `apps/server/.env`, start the database with Docker, then run the database setup commands listed in the [server README](./apps/server/README.md#getting-started).

3. **Start everything** (from the project root):

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

To run only the website or only the server:

```bash
npm run dev:frontend
npm run dev:server
```

**Want to add entries from the site?** Register a user, then set their role to `ADMIN` in the database. The server README explains how.

---

## Useful commands

From the project root:

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the website and server together |
| `npm run build` | Prepares both apps for production |
| `npm run test` | Runs tests for the server and website |

---
