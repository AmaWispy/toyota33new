@echo off
echo Starting Admin Frontend (Vite)...
start cmd /c "cd backend && npm run build || pause"

echo Starting Main Frontend...
start cmd /c "cd frontend && npm run build || pause"

echo.
echo Launched two build processes. Check each window for progress and errors.
endlocal
