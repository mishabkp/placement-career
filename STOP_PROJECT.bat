@echo off
title Stop PlacementPal AI
color 0C

echo ======================================================================
echo             🛑 STOPPING PLACEMENTPAL AI PLATFORM
echo ======================================================================
echo.

echo Stopping Python Backend & Node Frontend processes...

taskkill /F /IM python.exe 2>nul
taskkill /F /IM node.exe 2>nul

echo.
echo ======================================================================
echo  ✅ All processes stopped cleanly.
echo ======================================================================
pause
