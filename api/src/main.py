from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from .auth import router as auth_router
from .config import SITE_URL
from .dependencies import get_async_db
from .resumes import router as resumes_router
from .users import router as users_router

app = FastAPI(
    title='Resume API',
    version='0.1.0',
    swagger_ui_parameters={'withCredentials': True}
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[SITE_URL + ':3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(resumes_router)

@app.get('/')
async def init(db: AsyncSession = Depends(get_async_db)):
    try:
        await db.execute(text('SELECT 1'))
        return {
            'database': 'reachable',
            'swagger': SITE_URL + '/docs',
            'redoc': SITE_URL + '/redoc'
        }
    except Exception as e:
        raise HTTPException(
            status.HTTP_418_IM_A_TEAPOT,
            f'Сonnection error: {e}'
        )
