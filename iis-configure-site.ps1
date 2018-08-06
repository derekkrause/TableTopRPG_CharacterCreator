Import-Module WebAdministration
New-WebAppPool -name "SabioWebC57"  -force
$pool = Get-Item IIS:\AppPools\SabioWebC57
$pool.ManagedRuntimeVersion = "v4.0"
$pool | Set-Item 

$ScriptDir = Split-Path $script:MyInvocation.MyCommand.Path
New-Website -name "SabioWebC57" -Port 54810 -PhysicalPath "$ScriptDir\Sabio.Web" -ApplicationPool "SabioWebC57" -Force
