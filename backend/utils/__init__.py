"""
=====================================================
 utils package — RAMS Automater Backend
=====================================================

This package contains helper modules for the backend.

Modules:
    - security.py : password hashing & JWT utilities

Purpose:
    The utils package provides supporting functions
    for authentication, authorization, and general
    backend utilities.

Usage example:
    from utils.security import hash_password, verify_password, create_token
"""

import os

# Optional: print a short note for deployment diagnostics
if os.getenv("RENDER") or os.getenv("ENV") == "production":
    print("[INIT] utils package loaded for RAMS backend.")
