# 📘 mockini Usage Guide

mockini is a lightweight mock API server that helps you quickly spin up fake REST endpoints for testing and development purposes.

## 📦 Installation

Install mockini globally via npm:

```bash
npm install -g mockini
```

Or use it with npx without installation:

```bash
npx mockini init
```

## 🚀 Quick Start

### 1. Initialize a New Project

Create a default configuration file in your project:

```bash
mockini init
```

This will create a `mockini.config.json` file with a basic setup:

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

### 2. Customize Your Configuration

Edit the generated `mockini.config.json` file or create your own:

```json
{
  "port": 3000,
  "routes": [
    {
      "method": "GET",
      "path": "/api/users",
      "status": 200,
      "response": {
        "users": [
          { "id": 1, "name": "John Doe", "email": "john@example.com" },
          { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
        ]
      }
    }
  ]
}
```

### 3. Start the Mock Server

Run mockini to start your mock API server:

```bash
mockini start
```

By default, mockini will look for `mockini.config.json` in the current directory. The server will start on the specified port (default: 3000) and you'll see output like:

```
🚀 mockini server running on http://localhost:3000
```

### 4. Using a Custom Configuration File

You can specify a custom configuration file using the `--config` flag:

```bash
mockini start --config /path/to/your/config.json
```

Or use a relative path:

```bash
mockini start --config ./configs/development.json
```

### 3. Test Your Endpoints

You can now make HTTP requests to your mock endpoints:

```bash
curl http://localhost:3000/hello
```

## 🔧 CLI Commands

### Initialize Project

```bash
# Create default config file
mockini init

# Or using npx
npx mockini init
```

### Start Server

```bash
# Start with default config (mockini.config.json)
mockini start

# Start with custom config file
mockini start --config /path/to/config.json

# Start with custom config and custom port
mockini start --config ./my-config.json --port 8080
```

## 📋 Common Usage Patterns

### REST API Endpoints

Create a complete REST API for a resource:

```json
{
  "port": 3000,
  "routes": [
    {
      "method": "GET",
      "path": "/api/posts",
      "response": {
        "posts": [
          { "id": 1, "title": "Hello World", "content": "First post!" },
          { "id": 2, "title": "mockini Guide", "content": "Using mockini..." }
        ]
      }
    },
    {
      "method": "GET",
      "path": "/api/posts/1",
      "response": {
        "id": 1,
        "title": "Hello World",
        "content": "First post!",
        "author": "John Doe"
      }
    },
    {
      "method": "POST",
      "path": "/api/posts",
      "status": 201,
      "response": {
        "id": 3,
        "title": "New Post",
        "message": "Post created successfully"
      }
    },
    {
      "method": "PUT",
      "path": "/api/posts/1",
      "response": {
        "id": 1,
        "title": "Updated Post",
        "message": "Post updated successfully"
      }
    },
    {
      "method": "DELETE",
      "path": "/api/posts/1",
      "status": 204,
      "response": {}
    }
  ]
}
```

### Authentication Endpoints

Mock authentication flows:

```json
{
  "port": 3000,
  "routes": [
    {
      "method": "POST",
      "path": "/auth/login",
      "response": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
          "id": 1,
          "email": "user@example.com",
          "name": "John Doe"
        }
      }
    },
    {
      "method": "POST",
      "path": "/auth/register",
      "status": 201,
      "response": {
        "message": "User created successfully",
        "user": {
          "id": 2,
          "email": "newuser@example.com",
          "name": "Jane Smith"
        }
      }
    },
    {
      "method": "GET",
      "path": "/auth/profile",
      "response": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "role": "user"
      }
    }
  ]
}
```

### Error Responses

Mock error scenarios for testing:

```json
{
  "port": 3000,
  "routes": [
    {
      "method": "GET",
      "path": "/api/error/400",
      "status": 400,
      "response": {
        "error": "Bad Request",
        "message": "Invalid parameters provided"
      }
    },
    {
      "method": "GET",
      "path": "/api/error/401",
      "status": 401,
      "response": {
        "error": "Unauthorized",
        "message": "Authentication required"
      }
    },
    {
      "method": "GET",
      "path": "/api/error/404",
      "status": 404,
      "response": {
        "error": "Not Found",
        "message": "Resource not found"
      }
    },
    {
      "method": "GET",
      "path": "/api/error/500",
      "status": 500,
      "response": {
        "error": "Internal Server Error",
        "message": "Something went wrong"
      }
    }
  ]
}
```

## 🔧 Configuration Options

### Custom Port

Change the default port by modifying the `port` field:

```json
{
  "port": 8080,
  "routes": [...]
}
```

### Custom Configuration File

Use a different configuration file name or path:

```bash
# Using relative path
mockini start --config ./configs/development.json

# Using absolute path
mockini start --config /home/user/project/custom-config.json

# Using different filename in current directory
mockini start --config my-api-mock.json
```

## 💡 Best Practices

### 1. Organize by Feature

Structure your routes logically:

```json
{
  "port": 3000,
  "routes": [
    // User management
    { "method": "GET", "path": "/api/users", "response": {...} },
    { "method": "POST", "path": "/api/users", "response": {...} },

    // Product catalog
    { "method": "GET", "path": "/api/products", "response": {...} },
    { "method": "GET", "path": "/api/products/1", "response": {...} },

    // Orders
    { "method": "GET", "path": "/api/orders", "response": {...} },
    { "method": "POST", "path": "/api/orders", "response": {...} }
  ]
}
```

### 2. Use Realistic Data

Include realistic sample data that matches your actual API:

```json
{
  "method": "GET",
  "path": "/api/users",
  "response": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "avatar": "https://example.com/avatars/john.jpg",
        "created_at": "2024-01-15T10:30:00Z",
        "is_active": true
      }
    ],
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}
```

### 3. Include Different HTTP Status Codes

Test various scenarios by including different status codes:

```json
{
  "routes": [
    {
      "method": "POST",
      "path": "/api/users",
      "status": 201,
      "response": { "message": "User created" }
    },
    {
      "method": "PUT",
      "path": "/api/users/1",
      "status": 200,
      "response": { "message": "User updated" }
    },
    {
      "method": "DELETE",
      "path": "/api/users/1",
      "status": 204,
      "response": {}
    }
  ]
}
```

## 🛠️ Development Workflow

### 1. Project Setup

```bash
# Create a new project directory
mkdir my-api-project
cd my-api-project

# Initialize mockini configuration
mockini init

# Edit the generated config file
vim mockini.config.json
```

### 2. Frontend Development

Use mockini while developing your frontend before the backend is ready:

```bash
# Terminal 1: Start mockini
mockini start

# Terminal 2: Start your frontend dev server
npm run dev
```

### 3. Testing with Different Configurations

Create different configuration files for various scenarios:

```bash
# Test with success scenarios
mockini --config ./configs/test-success.json

# Test with error scenarios
mockini --config ./configs/test-errors.json

# Test with development data
mockini --config ./configs/development.json
```

### 4. Using with npx (No Installation)

You can use mockini without global installation:

```bash
# Initialize config
npx mockini init

# Start server
npx mockini

# Start with custom config
npx mockini --config ./my-config.json
```

## 📁 Example Project Structure

```
my-project/
├── mockini.config.json          # Default config file
├── configs/
│   ├── development.json         # Development environment
│   ├── testing.json            # Testing scenarios
│   ├── production-demo.json    # Production demo
│   └── error-scenarios.json    # Error testing
├── src/
└── package.json
```

### Using Different Configurations

```bash
# Development
mockini --config ./configs/development.json

# Testing
mockini --config ./configs/testing.json

# Default (uses mockini.config.json)
mockini
```

## 🚨 Common Issues

### Port Already in Use

If you get a port error, either:

1. Change the port in your config file
2. Kill the process using the port
3. Use a different port: `mockini --port 3001`

### Invalid JSON

Ensure your configuration file is valid JSON:

- Use double quotes for strings
- No trailing commas
- Proper nesting structure

### Route Not Found

Check that your route path matches exactly, including:

- Leading slash (/)
- Correct HTTP method
- Case sensitivity

## 🔄 Hot Reloading

mockini automatically reloads when you change your configuration file, so you can update your mock responses without restarting the server.

---

**Need help?** Check the [Configuration Schema](./config-schema.md) for detailed field descriptions.
