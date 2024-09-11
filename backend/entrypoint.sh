#!/bin/sh

# collect all static files to the root directory
python manage.py collectstatic --no-input

# start the gunicorn worker processw at the defined port
gunicorn srhsbadminton.wsgi --bind 0.0.0.0:8000 
