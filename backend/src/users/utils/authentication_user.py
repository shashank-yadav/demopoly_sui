from typing import List
from datetime import timedelta
from master.utils.constants import ACCESS_TOKEN_EXPIRE_MINUTES
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
    SecurityScopes,
)
from jwt import PyJWTError
from users.crud.users import MongoDBUserDatabase
from users.models.users import UserInModel, UserModel
from pydantic import ValidationError

from .jwt_handler import TokenData, pwd_context
from master.utils.constants import ALGORITHM
from users.utils.jwt_handler import Token, create_access_token
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/login")


def verify_password(plain_password, hashed_password):
    data = pwd_context.verify(plain_password, hashed_password)
    return data


async def authenticate(username: str, password: str, enable_user: bool):
    user_db = MongoDBUserDatabase(UserInModel)
    username_hash = await user_db.get_username_hash(username=username.lower())
    credentials_username = username_hash
    credentials_password = password + "" + username_hash

    if enable_user == True:
        response = await user_db.enable_one(username=username_hash)
        if response["internal_response_code"] != 0:
            return False, False

    user = await user_db.find_by_username(credentials_username)
    if not user:
        return False, False
    if not verify_password(credentials_password, user.hashed_password):
        return False, False

    scopes = await get_scope_list(user=user)

    return user, scopes


async def get_current_user(
    security_scopes: SecurityScopes, token: str = Depends(oauth2_scheme)
):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = f"Bearer"

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, os.environ.get("JWT_SECRET_KEY"), algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception

        token_scopes = payload.get("scopes", [])
        token_data = TokenData(username=username, scopes=token_scopes)
    except (PyJWTError, ValidationError):
        raise credentials_exception

    user_db = MongoDBUserDatabase(UserInModel)
    user = await user_db.find_by_username(token_data.username)

    if user is None:
        raise credentials_exception

    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user


async def get_current_active_user(
    current_user: UserInModel = Depends(get_current_user),
):
    if current_user.is_disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def get_user_and_scope(
    current_user: UserModel
):
    user_db = MongoDBUserDatabase(UserInModel)
    user = await user_db.find_by_username(current_user.username)

    if not user:
        return False

    scopes = await get_scope_list(user=user)
    
    return scopes, user


async def get_token(
    user: UserModel,
    scopes: List
):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "username": user.username,
            "mobile_number": user.mobile_number,
            "scopes": scopes,
        },
            expires_delta=access_token_expires,
    )
    return access_token

async def get_scope_list(
    user: UserInModel
):
    if user.is_admin:
        scopes = [
            "admin:read",
            "admin:write",
            "loggedin:read",
            "loggedin:write",
            "guest:read",
            "guest:write"
        ]
    elif user.is_guest:
        scopes = [
            "guest:read",
            "guest:write"
        ]
    else:
        scopes = [
            "loggedin:read",
            "loggedin:write",
            "guest:read",
            "guest:write"
        ]

    return scopes
