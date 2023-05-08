$rule = New-Object System.Security.AccessControl.FileSystemAccessRule('username', 'ReadAndExecute', 'Allow')
$acl = Get-Acl 'path\to\private-key.ppk'
$acl.SetAccessRule($rule)
Set-Acl 'path\to\private-key.ppk' $acl
