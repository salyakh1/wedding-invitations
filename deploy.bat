@echo off
echo Starting Wedding Invitations with external access...

REM Get IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set IP=%%a
    goto :found
)
:found
set IP=%IP: =%

echo Your IP address is: %IP%
echo.
echo Frontend will be available at: http://%IP%:3000
echo Backend will be available at: http://%IP%:3001
echo.
echo Make sure to:
echo 1. Allow ports 3000 and 3001 in Windows Firewall
echo 2. Create .env.local file with your IP address
echo 3. Share the IP address with your clients
echo.

REM Start frontend
cd frontend
start "Frontend" cmd /k "npm run dev:external"

REM Start backend
cd ../backend
start "Backend" cmd /k "npm run dev"

echo.
echo Servers are starting...
echo Check the opened command windows for any errors.
pause 