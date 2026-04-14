@echo off
echo Starting Backend (PHP)...
start cmd /k "cd backend && php artisan serve"

echo Starting Admin Frontend (Vite)...
start cmd /k "cd backend && npm run dev"

echo Starting Main Frontend...
start cmd /k "cd frontend && npm run dev"

echo All processes started in separate windows.
echo Opening Dashboard at http://localhost:8000/dashboard ...
timeout /t 5 >nul
start http://localhost:8000/dashboard
