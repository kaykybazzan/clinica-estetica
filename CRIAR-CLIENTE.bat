@echo off
setlocal
cd /d "%~dp0"
title NEXORA - Criar Cliente
where node >nul 2>nul
if errorlevel 1 ( echo [ERRO] Node.js nao foi encontrado. & pause & exit /b 1 )
if not exist node_modules ( echo [NEXORA] Instalando dependencias... & call npm install & if errorlevel 1 goto :erro )
call npm run create-client
if errorlevel 1 goto :erro
echo [NEXORA] Configuracao inicial criada.
pause
exit /b 0
:erro
echo [ERRO] O gerador nao foi concluido.
pause
exit /b 1
