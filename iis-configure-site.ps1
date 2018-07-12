Import-Module WebAdministration
New-WebAppPool -name "SabioWeb"  -force
$pool = Get-Item IIS:\AppPools\SabioWeb
$pool.ManagedRuntimeVersion = "v4.0"
$pool | Set-Item 

$ScriptDir = Split-Path $script:MyInvocation.MyCommand.Path
New-Website -name "SabioWeb" -Port 54810 -PhysicalPath "$ScriptDir\Sabio.Web" -ApplicationPool "SabioWeb" -Force
