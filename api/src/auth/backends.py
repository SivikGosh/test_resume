from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
)


def get_cookie_jwt_backend(
    secret_key: str,
    lifetime_age_seconds: int = 3600,
) -> AuthenticationBackend:
    transport = CookieTransport(
        cookie_name='cookie',
        cookie_max_age=lifetime_age_seconds,
        cookie_secure=False,
    )
    def get_strategy():
        return JWTStrategy(secret_key, lifetime_age_seconds)
    return AuthenticationBackend('cookie_jwt', transport, get_strategy)
