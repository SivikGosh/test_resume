__all__ = ('router',)

from fastapi import APIRouter

from src.auth.router import router as auth_router

from .schemas import UserRead, UserUpdate

router = APIRouter()

router.include_router(
    router=auth_router.get_users_router(UserRead, UserUpdate),
    prefix='/users',
    tags=('Users',),
)
