@echo off
echo Starting Tin Viet Server...
echo.
cd /d %~dp0
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
echo.
echo Starting server on port 6969...
echo Make sure MySQL is running and database 'tinvietvp' exists!
echo.
call npm start

