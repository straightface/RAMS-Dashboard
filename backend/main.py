import os
import json
import datetime
from typing import List
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Local imports
from utils.security import hash_password, verify_password, create_token, decode_token

# Base paths
BASE = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE, "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")
PROJECTS_FILE = os.path.join(DATA_DIR, "projects.json")
TEMPLATES_FILE = os.path.join(DATA_DIR, "templates.json")
RAMS_FILE = os.path.join(DATA_DIR, "rams_records.json")
FRONTEND_BUILD = os.path.abspath(os.path.join(BASE, "..", "frontend", "build"))

# Ensure data folder exists
os.makedirs(DATA_DIR, exist_ok=True)

app = FastAPI(title="RAMS Automater Combined App")

# CORS (so frontend can talk to API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------
# ✅ API health check
# ---------------------------------------------------------------------
@app.get("/api/health")
def health():
    return {"status": "ok"}

# ---------------------------------------------------------------------
# ✅ Helpers for reading/writing data
# ---------------------------------------------------------------------
def load(path):
    if not os.path.exists(path):
        return []
    with open(path, "r") as f:
        return json.load(f)

def save(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

def require_role(request: Request, allowed_roles: List[str]):
    auth = request.headers.get("authorization") or ""
    token = auth.split(" ", 1)[1] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_roles = payload.get("roles") or []
    if not any(r in allowed_roles for r in user_roles):
        raise HTTPException(status_code=403, detail="Forbidden")
    return payload

# ---------------------------------------------------------------------
# ✅ Authentication
# ---------------------------------------------------------------------
class LoginIn(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(data: LoginIn):
    users = load(USERS_FILE)
    user = next((u for u in users if u["username"] == data.username), None)
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({
        "username": user["username"],
        "roles": user.get("roles", ["creator"]),
    })
    return {"access_token": token, "roles": user.get("roles", ["creator"])}

# ---------------------------------------------------------------------
# ✅ Basic example API routes
# ---------------------------------------------------------------------
@app.get("/api/projects/active")
def projects_active(request: Request):
    require_role(request, ["creator", "approver", "admin"])
    return {"projects": load(PROJECTS_FILE)}

@app.get("/api/templates/active")
def templates_active(request: Request):
    require_role(request, ["creator", "approver", "admin"])
    return {"templates": load(TEMPLATES_FILE)}

@app.get("/api/rams/list")
def rams_list(request: Request):
    require_role(request, ["creator", "approver", "admin"])
    return {"records": load(RAMS_FILE)}

# ---------------------------------------------------------------------
# ✅ Frontend serving (MOUNT LAST!)
# ---------------------------------------------------------------------
# Must be below all /api and /login routes
if os.path.isdir(FRONTEND_BUILD):
    app.mount("/", StaticFiles(directory=FRONTEND_BUILD, html=True), name="frontend")

# Fallback if no frontend build found
@app.get("/")
def root():
    if os.path.isdir(FRONTEND_BUILD) and os.path.exists(os.path.join(FRONTEND_BUILD, "index.html")):
        return FileResponse(os.path.join(FRONTEND_BUILD, "index.html"))
    return HTMLResponse("<h3>RAMS Automater API running (frontend not built)</h3>")

