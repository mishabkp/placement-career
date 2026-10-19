@echo off
title PlacementPal AI - One Click Launcher
color 0A

echo ======================================================================
echo             🚀 STARTING PLACEMENTPAL AI PLATFORM
echo ======================================================================
echo.

:: 1. Start Backend in separate window
echo [1/3] Starting Backend Server (FastAPI + Supabase + Gemini AI)...
start "PlacementPal Backend (FastAPI)" cmd /k "cd /d %~dp0backend && .\venv\Scripts\python.exe run.py"

:: 2. Wait 2 seconds for backend to initialize
timeout /t 2 /nobreak > nul

:: 3. Start Frontend in separate window
echo [2/3] Starting Frontend (React + Vite)...
start "PlacementPal Frontend (Vite)" cmd /k "cd /d %~dp0 && npm run dev"

:: 4. Wait 2 seconds and open browser
timeout /t 2 /nobreak > nul
echo [3/3] Launching Web App in your browser...
start http://localhost:5173

echo.
echo ======================================================================
echo  ✅ System is LIVE!
echo     - Frontend App:   http://localhost:5173
echo     - Backend Swagger: http://127.0.0.1:8000/docs
echo ======================================================================
echo.
echo You can minimize this window. Press any key to exit this launcher window.
pause > nul
