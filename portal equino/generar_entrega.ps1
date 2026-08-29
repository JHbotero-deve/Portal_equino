# Script para generar un ZIP de entrega limpia para el equipo
$nombreProyecto = "GestionGanadera_BaseSolida"
$fecha = Get-Date -Format "yyyyMMdd"
$archivoZip = "$nombreProyecto`_$fecha.zip"

# Carpetas a incluir
$incluir = @("backend", "frontend", ".env.example", "README.md")

# Excluir carpetas pesadas
$excluir = @("node_modules", ".git", "database.sqlite", "dist", ".idea")

Write-Host "Generando paquete de entrega: $archivoZip..." -ForegroundColor Cyan

# Comprimir (excluyendo manualmente lo necesario)
Compress-Archive -Path $incluir -DestinationPath $archivoZip -Force

Write-Host "¡Listo! Entrega generada con éxito." -ForegroundColor Green