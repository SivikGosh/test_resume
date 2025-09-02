__all__ = ('router', 'current_user')

from fastapi import APIRouter

from src.users.schemas import UserCreate, UserRead

from .router import cookie_jwt_backend, current_user
from .router import router as auth_router

router = APIRouter()

router.include_router(
    router=auth_router.get_register_router(UserRead, UserCreate),
    prefix='/auth',
    tags=('Authentication',),
)
router.include_router(
    router=auth_router.get_auth_router(cookie_jwt_backend),
    prefix='/auth/jwt',
    tags=('Authentication',),
)
