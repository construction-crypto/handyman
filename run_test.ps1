# Simulating a new customer sign-up test
$testEmail = "testclient@handymanpaintingllc.co"
Write-Host "--- Starting Client Onboarding Flow Test ---" -ForegroundColor Cyan
Write-Host "1. Registering credentials for: $testEmail" -ForegroundColor Yellow

# Create test login/session markers locally
Set-Content -Path "test_session.json" -Value "{`"email`": `"$testEmail`", `"isLoggedIn`": `"true`", `"isOnboarded`": `"false`"}"
Write-Host "2. Session initialized. Redirecting to onboarding.html..." -ForegroundColor Yellow
Write-Host "Test complete. Open login.html or onboarding.html in your browser to verify the flow!" -ForegroundColor Green
