@echo off
setlocal
cd /d "%~dp0"
title ATELIER ESTETICA - NEXORA v3
echo ==============================================
echo    ATELIER ESTETICA - NEXORA PLATFORM v3
echo ==============================================
where node >nul 2>nul
if errorlevel 1 ( echo [ERRO] Node.js nao foi encontrado. & pause & exit /b 1 )
if not exist node_modules (
  echo [NEXORA] Instalando dependencias na primeira execucao...
  call npm install
  if errorlevel 1 goto :erro
)
echo [NEXORA] Abrindo http://localhost:3000
start "" http://localhost:3000
call npm run dev
exit /b %errorlevel%
:erro
echo [ERRO] Nao foi possivel preparar o projeto.
pause
exit /b 1
