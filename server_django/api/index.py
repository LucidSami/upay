import os
import sys

# Ensure server_django directory is on Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'skilljobs_backend.settings')

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
app = application
