import os
import sys
from pathlib import Path

# Add server_django to Python sys.path so all Django apps and configs are discoverable
BASE_DIR = Path(__file__).resolve().parent.parent
SERVER_DIR = BASE_DIR / 'server_django'
if str(SERVER_DIR) not in sys.path:
    sys.path.insert(0, str(SERVER_DIR))

# Configure Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'skilljobs_backend.settings')

# Expose WSGI application for Vercel Serverless Function runtime
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
app = application
