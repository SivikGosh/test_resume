from typing import Optional

from pydantic import BaseModel


class ResumeSchema(BaseModel):
    id: int
    title: str


class ResumeDetailSchema(BaseModel):
    title: str
    content: str


class ResumeUpdateSchema(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class ResumeImproveSchema(BaseModel):
    original_content: str
    improved_content: str
