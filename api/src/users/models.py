from typing import List

from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


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

    resumes: Mapped[List['Resume']] = relationship(  # noqa: F821
        back_populates='user',
        cascade='all, delete-orphan',
    )
