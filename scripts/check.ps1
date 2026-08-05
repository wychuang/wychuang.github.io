$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot

try {
  npm run check
  if ($LASTEXITCODE -ne 0) {
    throw "npm run check failed with exit code $LASTEXITCODE."
  }

  $port = 4181
  $server = Start-Process node -ArgumentList "scripts/dev-server.mjs" -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -Environment @{ PORT = "$port" }

  try {
    $ready = $false
    foreach ($attempt in 1..20) {
      try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:$port/" -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200 -and $response.Content -match "data product|AI 产品|王逸尘") {
          $ready = $true
          break
        }
      }
      catch {
        Start-Sleep -Milliseconds 150
      }
    }

    if (-not $ready) {
      throw "Local HTTP smoke test did not load the portfolio page."
    }

    $assetPaths = @(
      "/assets/profile-illustrated.webp",
      "/assets/zju-emblem-transparent.png",
      "/assets/tsinghua-emblem-transparent.png",
      "/assets/model-radar-screen.png",
      "/assets/model-radar-map.png",
      "/assets/model-radar-detail.png",
      "/assets/model-radar-sources.png",
      "/assets/lightloom-agent-screen.png",
      "/assets/lightloom-vault-screen.png",
      "/assets/lightloom-relations-screen.png",
      "/assets/search-eval-loop.png"
    )

    foreach ($assetPath in $assetPaths) {
      $assetResponse = Invoke-WebRequest -Uri "http://127.0.0.1:$port$assetPath" -UseBasicParsing -TimeoutSec 3
      if ($assetResponse.StatusCode -ne 200 -or $assetResponse.RawContentLength -lt 10000) {
        throw "Local asset smoke test failed for $assetPath."
      }
    }
  }
  finally {
    if ($server -and -not $server.HasExited) {
      Stop-Process -Id $server.Id -Force
    }
  }

  Write-Host "Portfolio checks passed." -ForegroundColor Green
}
finally {
  Pop-Location
}
