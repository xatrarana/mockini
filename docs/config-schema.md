# 📘 mockini Config Schema

mockini uses a simple JSON config file to define your mock API endpoints.

By default, this file is named:
```
mockini.config.json
```

---

## 🔧 Top-Level Options

| Field | Type   | Description                    |
|-------|--------|--------------------------------|
| port  | number | Port to run the mock server on |
| routes | array | List of route definitions      |

---

## 📚 routes[]

Each object in the `routes` array defines an HTTP endpoint.

| Field    | Type     | Description                                  |
|----------|----------|----------------------------------------------|
| method   | string   | HTTP method (GET, POST, PUT, DELETE, etc.)   |
| path     | string   | Endpoint path (e.g. "/api/user")            |
| status   | number   | HTTP status code (default: 200)              |
| response | object   | JSON response body                           |

---

## ✅ Example

```json
{
  "port": 3000,
  "routes": [
    {
      "method": "GET",
      "path": "/hello",
      "status": 200,
      "response": { "message": "Hello, world!" }
    },
    {
      "method": "POST",
      "path": "/login",
      "status": 200,
      "response": { "token": "abc123" }
    }
  ]
}
```

---

## 📎 Notes
- The config file must be valid JSON.
- The default port is 3000 if not specified.
- All fields in each route object are required (except `status`, which defaults to 200).

