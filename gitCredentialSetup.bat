
cd /d "%~dp0"

REM Correctly set the Git credential access token without spaces around the equals sign
set "Git_Credential_AccessToken= <your_git_access_token>"

REM Set git credential helper to store
git config --local credential.helper store

REM Add the repository to Git's safe directories
git config --global --add safe.directory C:/Users/esolomon/Documents/VFMFI_ChatBot_Production/vfmfi_chatBot

REM Output the access token for debugging purposes (not recommended in production)
echo %Git_Credential_AccessToken%

REM Create the .git-credentials file with the token
echo https://%Git_Credential_AccessToken%@github.com/elezersolomon/vfmfi_chatBot.git > .git/.git-credentials

REM Update the remote URL to use the token
git remote set-url origin https://%Git_Credential_AccessToken%@github.com/elezersolomon/vfmfi_chatBot.git

REM Pause to keep the command window open after the app has run
echo Application has finished running. Press any key to exit...
pause
