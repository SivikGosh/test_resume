from fastapi_users import FastAPIUsers

from api.src.config import AUTH_SECRET_KEY, TOKEN_LIFETIME_SECONDS
from api.src.users.models import User

from .backends import get_cookie_jwt_backend
from .manager import get_user_manager

cookie_jwt_backend = get_cookie_jwt_backend(
    AUTH_SECRET_KEY,
    TOKEN_LIFETIME_SECONDS
)

router = FastAPIUsers[User, int](get_user_manager, [cookie_jwt_backend])
