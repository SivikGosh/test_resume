from http import HTTPStatus
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth import current_user
from src.dependencies import get_async_db
from src.users.models import User

from .models import Resume
from .schemas import (
    ResumeDetailSchema,
    ResumeImproveSchema,
    ResumeSchema,
    ResumeUpdateSchema,
)
from .utils import improve_resume

router = APIRouter(prefix='/resumes', tags=['Resumes'])


@router.post(
    path='/',
    response_model=ResumeDetailSchema,
    status_code=HTTPStatus.CREATED,
)
async def create_resume(
    data: ResumeDetailSchema,
    user: User = Depends(current_user),
    db: AsyncSession = Depends(get_async_db),
):
    resume = Resume(**data.model_dump(), user_id=user.id)
    db.add(resume)
    try:
        await db.commit()
        await db.refresh(resume)
    except SQLAlchemyError as e:
        raise HTTPException(
            HTTPStatus.INTERNAL_SERVER_ERROR,
            f'Create resume error: {e.args}.',
        )
    return resume


@router.get('/', response_model=List[ResumeSchema])
async def get_resume_list(
    user: User = Depends(current_user),
    db: AsyncSession = Depends(get_async_db),
):
    query = select(Resume).filter_by(user_id=user.id)
    result = await db.execute(query)
    resumes = result.scalars().all()
    return resumes


@router.get('/{id}', response_model=ResumeDetailSchema)
async def get_resume_by_id(
    id: int,
    user: User = Depends(current_user),
    db: AsyncSession = Depends(get_async_db),
):
    resume = await db.get(Resume, id)
    if not resume or resume.user_id is not user.id:
        raise HTTPException(HTTPStatus.NOT_FOUND, 'Resume not found.')
    return resume


@router.patch('/{id}', response_model=ResumeUpdateSchema)
async def upd_resume_patch(
    id: int,
    data: ResumeUpdateSchema,
    user: User = Depends(current_user),
    db: AsyncSession = Depends(get_async_db),
):
    resume = await db.get(Resume, id)
    if not resume:
        raise HTTPException(HTTPStatus.NOT_FOUND, 'Resume not found.')
    if resume.user_id is not user.id:
        raise HTTPException(HTTPStatus.FORBIDDEN, 'Change forbidden.')
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(resume, key, value)
    try:
        await db.commit()
        await db.refresh(resume)
    except SQLAlchemyError as e:
        raise HTTPException(
            HTTPStatus.INTERNAL_SERVER_ERROR,
            f'Create resume error: {e.args}.',
        )
    return resume


@router.put('/{id}', response_model=ResumeUpdateSchema)
async def upd_resume_put(
    id: int,
    data: ResumeUpdateSchema,
    user: User = Depends(current_user),
    db: AsyncSession = Depends(get_async_db),
):
    resume = await db.get(Resume, id)
    if not resume:
        raise HTTPException(HTTPStatus.NOT_FOUND, 'Resume not found.')
    if resume.user_id is not user.id:
        raise HTTPException(HTTPStatus.FORBIDDEN, 'Change forbidden.')
    for key, value in data.model_dump().items():
        setattr(resume, key, value)
    try:
        await db.commit()
        await db.refresh(resume)
    except SQLAlchemyError as e:
        raise HTTPException(
            HTTPStatus.INTERNAL_SERVER_ERROR,
            f'Create resume error: {e.args}.',
        )
    return resume


@router.delete('/{id}', status_code=HTTPStatus.NO_CONTENT)
async def delete_resume(
    id: int,
    user: User = Depends(current_user),
    db: AsyncSession = Depends(get_async_db),
):
    resume = await db.get(Resume, id)
    if not resume:
        raise HTTPException(HTTPStatus.NOT_FOUND, 'Resume not found.')
    if resume.user_id is not user.id:
        raise HTTPException(HTTPStatus.FORBIDDEN, 'Delete forbidden.')
    await db.delete(resume)
    await db.commit()
    return {'detail': 'Resume deleted'}


@router.get('/{id}/improve', response_model=ResumeImproveSchema)
async def get_improve_resume(
    id: int,
    user: User = Depends(current_user),
    db: AsyncSession = Depends(get_async_db),
):
    resume = await db.get(Resume, id)
    if not resume or resume.user_id is not user.id:
        raise HTTPException(HTTPStatus.NOT_FOUND, 'Resume not found.')
    improved_result = improve_resume(resume.content)
    return improved_result
