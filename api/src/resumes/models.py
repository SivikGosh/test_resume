from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class Resume(Base):
    __tablename__ = 'resumes'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )
    title: Mapped[str] = mapped_column(
        String(length=255),
        unique=True,
        index=True,
        nullable=False,
    )
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False,
    )

    user: Mapped['User'] = relationship(  # noqa: F821
        back_populates='resumes'
    )
