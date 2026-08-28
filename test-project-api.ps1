
Invoke-RestMethod -Uri "http://localhost:3000/api/projects" -Method Post -ContentType "application/json" -Body '{"clientName": "Test Client", "clientEmail": "test@example.com", "currentPhase": "Surface Prep & Priming", "progress": 25, "cureStatus": "Optimal 72hr Cure"}'

