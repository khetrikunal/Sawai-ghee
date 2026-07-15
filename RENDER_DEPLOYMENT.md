# Render Deployment Notes (Port Binding + API URL)

This project is deployed on **Render** as **separate Web Services** for:
- `backend` (Spring Boot)
- `frontend` (React + Nginx)

## 1) Backend: Port binding on Render

Render assigns the listening port at runtime and expects your app to bind to that port.

### What Render requires
From Render docs: **use the `PORT` environment variable** and listen on that port.

### What this repo already does
In `backend/src/main/resources/application.properties`:

```properties
server.port=${PORT:8080}
```

- When Render sets `PORT`, Spring Boot will listen on it.
- If `PORT` is not set (local dev), it falls back to `8080`.

### Dockerfile alignment
In `backend/Dockerfile` the container exposes `8080`:

```dockerfile
EXPOSE 8080
```

This is fine—the actual runtime port binding on Render is still controlled by `PORT` via Spring configuration.

## 2) Frontend: Use backend PUBLIC Render URL

Because the services are separate, your frontend cannot call the backend using:
- `http://localhost:8080`
- `http://backend:9090`
- Docker internal hostnames

Instead, your frontend must call the backend using the **public Render URL**:

- Example:
  - `https://<backend-service>.onrender.com`

and then append your API paths (commonly `/api/...`).

## 3) Update frontend API base URL

The repo’s docker-compose setup uses an internal service URL (`backend:9090`). That works only inside the same Docker network.

On Render (separate services), you should set a frontend environment variable (configured in your Render frontend service) so that the React app uses the backend public URL.

### Expected configuration
Set something like:
- `VITE_API_BASE_URL=https://<backend-service>.onrender.com/api`

Then ensure your frontend’s `src/utils/api.js` (or wherever it builds request URLs) uses `import.meta.env.VITE_API_BASE_URL`.

## 4) Troubleshooting

### A) 502 / app not reachable
- Confirm the backend listens on `PORT` (Spring config should be `server.port=${PORT:8080}`).
- Confirm Render service is exposing the same web port (Render will map it).

### B) Frontend works but API calls fail
- Verify the frontend is using the backend **public** Render URL.
- Check CORS settings in the backend (`app.cors.allowed-origins`).

## 5) Reference
- Render doc (port binding):
  https://render.com/docs/web-services#port-binding

