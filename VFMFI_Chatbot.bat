@echo off
setlocal

:: Define the path to the folder you want to check
set TARGET_FOLDER=%~dp0
if not exist "dist/outputs" mkdir "dist/outputs"
:: Define the path to the log file
set LOGFILE=%~dp0dist\outputs\applicationDeploymentTask.log

echo ============================================================================================================= >> %LOGFILE%

:loop
:: Check for Node.js processes using the target folder
echo Checking for Node.js processes using the folder: %TARGET_FOLDER% >> %LOGFILE%
powershell -Command "Get-Process -Name node | Where-Object { $_.Path -like '%TARGET_FOLDER%*' }" >> %LOGFILE%

IF %ERRORLEVEL% EQU 1 (
    echo No Node.js processes are using the folder: %TARGET_FOLDER% >> %LOGFILE%
) ELSE (
    echo Node.js processes found using the folder: %TARGET_FOLDER% >> %LOGFILE%
    exit /b 
)

:: Change directory to the location of the batch file
cd /d "%~dp0"

echo %DATE% %TIME% - Running Node.js application... >> %LOGFILE%

:: Check if Node.js is installed
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/ >> %LOGFILE%
    pause
    goto end
)

xcopy %~dp0src\assets\* %~dp0dist\assets /E /I /Y >> %LOGFILE%

:: Optionally set the NODE_ENV environment variable
set NODE_ENV=production

:: Run the Node.js application using npm
git add . >> %LOGFILE% 
git commit -m "auto commit %DATE% %TIME%" >> %LOGFILE%
npm run prod

:: Check if the application exited with an error
IF %ERRORLEVEL% NEQ 0 (
    echo %DATE% %TIME% - Application encountered an error. Restarting... >> %LOGFILE%
    goto loop
)

:: If the application exits successfully
echo Application has finished running successfully. Press any key to exit... >> %LOGFILE%
pause
:end
echo ============================================================================================================ >> %LOGFILE%
