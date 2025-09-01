import os

from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'postgres')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASS = os.getenv('DB_PASS', 'postgres')

AUTH_SECRET_KEY = os.getenv('AUTH_SECRET_KEY', 'secret_key')
TOKEN_LIFETIME_SECONDS = 3600

SITE_URL=os.getenv('SITE_URL', 'http://localhost')
