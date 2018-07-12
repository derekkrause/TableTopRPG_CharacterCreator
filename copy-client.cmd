if not exist "IisNodeTest\IisNodeTest\Client" mkdir IisNodeTest\IisNodeTest\Client
del /f /s /q IisNodeTest\IisNodeTest\Client\*.* > NUL
xcopy /q /e client\build\*.* IisNodeTest\IisNodeTest\Client
dir IisNodeTest\IisNodeTest\Client
