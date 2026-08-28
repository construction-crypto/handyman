Get-ChildItem -Filter *.html | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
