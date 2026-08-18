$envFile = ".env"
$envContent = @"
DB_USER=postgres
DB_HOST=localhost
DB_NAME=Customer Accounts
DB_PASSWORD=your_actual_postgres_password
DB_PORT=5432
PORT=3000
JWT_SECRET=SECRET_KEY_JWT
"@
Set-Content -Path $envFile -Value $envContent
Write-Host ".env template created. Please update with your actual PostgreSQL credentials."
