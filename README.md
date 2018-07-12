# Setup instructions

* To install and configure IIS and the SabioWeb site:
	* Run "Windows PowerShell ISE" as Administrator.
	* Open `iis-install.ps1` and click the green "Run Script" button.
	* If you see any red, it didn't work. Please investigate.
	* If it says "`RestartNeeded : True`", please reboot before continuing to the next step.
	* Open `iis-configure-site.ps1` and click the green "Run Script" button.
	* You can close PowerShell ISE if you want.
* Install [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
* Install [iisnode full x64](https://github.com/Azure/iisnode/releases)
* Open `Sabio.Starter.sln` in Visual Studio
	* Right click on "Solution 'Sabio.Starter'" at the top of Solution Explorer and choose "Restore NuGet packages"
	* Build the solution.
	* After the build succeeds, you can close Visual Studio if you are not going to be changing the .NET code.
* Run `npm install` in the `client` directory.
* Run `npm install` in the `Sabio.Web/node-api` directory.
* Run the React app using the usual `npm start` task in  the `client` directory (through either VS Code or a command line)
* Make sure you see results from both API servers (.NET and Node.js).
