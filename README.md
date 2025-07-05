# ⚡ mockini

mockini is a lightweight CLI tool to instantly spin up mock REST APIs using a simple JSON config file.  
Designed for frontend developers, testers, and backend teams who need mock endpoints without writing server logic.

---

## 🚀 Features

- ⚡ Zero-config mock server
- 🛠 Simple JSON-based route definition
- 🧩 Supports GET, POST, PUT, DELETE, etc.
- ✨ CLI: `init` to generate config, `start` to launch server
- 🧠 Convention-based: uses `mockini.config.json` by default
- 🐇 Built with Bun (but runs as a native CLI via npx/npm)

---

## 📦 Getting Started

### 1. Create a config file

```bash
npx mockini init
```

Creates a file: `./mockini.config.json`

You can also manually create it:

```json
{
  "port": 3000,
  "routes": [
    {
      "method": "GET",
      "path": "/hello",
      "status": 200,
      "response": { "message": "Hello, world!" }
    }
  ]
}
```

---

### 2. Start the mock server

```bash
npx mockini start
```

By default, it uses `./mockini.config.json`.  
You can override the path with:
```bash
npx mockini start --config ./myconfig.json
```

You can also install globally:

```bash
npm install -g mockini
mockini init
mockini start
```

---

## 🧩 CLI Commands

| Command           | Description                                |
|------------------|--------------------------------------------|
| `mockini init`   | Generate a default mock config file         |
| `mockini start`  | Start mock server from config file          |

---

## 📁 Project Structure

```bash
mockini/
├── bin/                  # CLI entry point
├── src/                  # Server and init logic
├── docs/                 # Additional documentation
├── mockini.config.json   # Default config (generated)
├── README.md             # This file
```

---

## 🛠 Tech Stack

- 🐇 Bun (development runtime)
- 🧪 Express (mock server)
- 🧾 Commander (CLI parser)

---

## 📄 License

MIT © 2025 Chhatra Rana 

