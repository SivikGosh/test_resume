from fastapi import Depends
from fastapi_users import BaseUserManager, IntegerIDMixin

from src.dependencies import get_user_db
from src.users.models import User


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    pass


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
