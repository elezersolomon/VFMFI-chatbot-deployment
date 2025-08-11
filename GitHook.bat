@echo off
setlocal

:: Define the path to the log file
set TARGET_FOLDER=%~dp0

if not exist "dist/outputs" mkdir "dist/outputs"

set LOGFILE=%~dp0\dist\outputs\githubWebhook.log

:: Log the start time
echo ============================================================================= >> %LOGFILE%
echo %DATE% %TIME% - Starting git pull >> %LOGFILE%

:: Check if git is accessible
git --version >> %LOGFILE% 2>&1
if %ERRORLEVEL% neq 0 (
    echo %DATE% %TIME% - Git not found or not accessible in PATH >> %LOGFILE%
    exit 1
)

:: Perform the git pull and redirect output and errors to the log file
git pull origin>> %LOGFILE% 2>&1

:: Check the exit code of the git pull command
if %ERRORLEVEL% equ 0 (
    echo %DATE% %TIME% - Git pull successful >> %LOGFILE%
) else (
    echo %DATE% %TIME% - Git pull failed with error code %ERRORLEVEL% >> %LOGFILE%
    exit 1
)


:: Log the end time
echo %DATE% %TIME% - Finished >> %LOGFILE% 
echo =============================================================================== >> %LOGFILE%

endlocal
:: Pause to keep the command window open after the app has run
echo Application has finished running. Press any key to exit... >> %LOGFILE%
pause