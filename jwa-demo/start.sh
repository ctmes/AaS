#!/bin/bash
export PHPRC=$(pwd)/php.ini
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
