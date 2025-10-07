"""
=====================================================
 security.py — Authentication & Token Utilities
=====================================================

Handles all password hashing, token generation,
and JWT-based authentication for the RAMS Automater backend.

Uses:
  - bcrypt (via Passlib) for password hashing
  - python-jose for JWT encoding/decoding
"""

import os
import datetime
from jose import JWTError, jwt
from passlib.context import CryptContext

# --------------------------------------------------------------------
# Configuration
# --------------------------------------------------------------------

# Load secret key from environment (Render / .env)
SECRET_KEY = os.getenv("JWT_SECRET", "change_me_securely")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Configure bcrypt hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --------------------------------------------------------------------
# Password utilities
# --------------------------------------------------------------------

def hash_password(password: str) -> str:
    """
    Hash a plaintext password using bcrypt.
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against its bcrypt hash.
    """
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        return False

# --------------------------------------------------------------------
# JWT utilities
# --------------------------------------------------------------------

def create_token(data: dict) -> str:
    """
    Create a signed JWT containing the provided payload.

    The token includes an expiration time (default 24h).
    """
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> dict | None:
    """
    Decode and validate a JWT.
    Returns the payload if valid, otherwise None.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# --------------------------------------------------------------------
# Utility for internal debugging (optional)
# --------------------------------------------------------------------

if __name__ == "__main__":
    # Quick test example (run locally)
    sample_pwd = "admin123"
    hashed = hash_password(sample_pwd)
    print("Password:", sample_pwd)
    print("Hash:", hashed)
    print("Verify:", verify_password(sample_pwd, hashed))

    token = create_token({"username": "admin1", "roles": ["admin", "approver"]})
    print("\nToken:", token)
    print("Decoded:", decode_token(token))
