# Start Backend PHP Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; php artisan serve"

# Start Admin Frontend (Vite inside backend)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Start Main Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Waiting 5 seconds for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Open Dashboard in browser
Start-Process "http://localhost:8000/dashboard"

Write-Host "All processes started in separate PowerShell windows and Dashboard opened." -ForegroundColor Cyan
