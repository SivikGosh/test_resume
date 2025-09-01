from typing import Optional

from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate


class UserRead(BaseUser[int]):
    username: str


class UserCreate(BaseUserCreate):
    username: str


class UserUpdate(BaseUserUpdate):
    username: Optional[str] = None
