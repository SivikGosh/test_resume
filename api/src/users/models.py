from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from api.src.database import Base


class User(SQLAlchemyBaseUserTable, Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )
    username: Mapped[str] = mapped_column(
        String(length=26),
        unique=True,
        index=True,
        nullable=False,
    )
