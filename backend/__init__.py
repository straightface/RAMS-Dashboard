"""
RAMS Automater Backend Package

This package contains the FastAPI backend logic for the RAMS Automater web application.
It includes:
 - main.py → FastAPI entrypoint
 - utils/ → helper modules (security, file handling, etc.)
 - data/ → local JSON storage for users, templates, projects, and RAMS records
"""

# Optional: Pre-initialize directories
import os

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")

# Ensure the data directory exists when the backend is imported
os.makedirs(DATA_DIR, exist_ok=True)
