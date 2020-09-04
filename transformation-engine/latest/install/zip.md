---
title: Install with Zip
---

The Alfresco Document Transformation Engine is installed in three parts.

The following file is used to install the standalone Document Transformation Engine `alfresco-document-transformation-engine-2.2.x.zip`

The zip file contains the following files:

* `alfresco-document-transformation-engine-repo-2.2.x.amp`
* `alfresco-document-transformation-engine-share-2.2.x.amp`
* `alfresco-document-transformation-engine-server.msi`

The package contains a keystore that is used by the Tomcat SSL connector. This keystore is shipped for demonstration purposes only and should not be used in production environments. You can edit the file, `conf/server.xml`, to integrate a custom keystore. Remember to change the attributes, `keystoreFile` and `keystorePass`.

## Install the standalone Document Transformation Engine

The standalone Document Transformation Engine is installed using the MSI file.

> **Note:** When upgrading the Document Transformation Engine, the previous installation must be uninstalled first. If your old version of the Document Transformation Engine is earlier than 1.3.1, use the Control Panel **Uninstall a program** option to remove the old version, and then manually remove the Document Transformation Engine directory. By default, the Document Transformation Engine directory is `C:\\Program Files (x86)\\Transformation Engine\\)`. If your old version of the Document Transformation Engine is 1.3.1 or later, the new Document Transformation Engine MSI package prompts you to uninstall the previous version. When the uninstall is complete, you can run the MSI package again to install the new version. There is no need to manually remove anything.

1. Log onto the Windows Server as a user with administrator rights.

2. Double click the MSI installer package `alfresco-document-transformation-engine-server.msi`.

3. Click **Next** and the license information screen displays.

4. Click **Next** and select an installation folder or accept the default folder, and then click **Next**.

5. Select the TCP/IP ports used by the Document Transformation Engine.

    The default values are `8080` (HTTP) and `8443` (HTTPS) but you can also use the standard ports `80` and `443` (or any other port) if this fits better into your network infrastructure.

6. Click **Next** to start the installation.

    You will see a progress bar and a command line window during the installation. The installer will show a confirmation when the installation is finished.

7. Click **Close** to finish the installation.

8. Verify that the installation has completed successfully.

    1. Check the Windows Services in the management console.

    2. Locate the new service called **Document Transformation Engine**, and check that it is **Started**.

> **Note:** Each time a file is transformed in Alfresco Content Services, the .NET program starts and Microsoft Office tries to check for a Certificate Revocation List (CRL). Depending on the access that the Document Transformation Engine has to the Internet when transforming a file, this check can delay the operation for up to two minutes, and will therefore, delay transformation of the file. To prevent this, use the Windows server firewall to block internet access for all office binaries.

## Install the Alfresco Transformation client into Alfresco Content Services

The Alfresco Transformation client is installed as two Alfresco Module Packages (AMP) files into Alfresco Content Services and requires the license to be updated.

Before starting verify that:

* Your Alfresco Content Services server is correctly configured and tested.
* You have the correct Document Transformation Engine ZIP file for the version of Alfresco Content Services that you are running.
* You have an updated license file (a `*.lic` file). You can request a license from the [Alfresco Support Portal](http://support.alfresco.com){:target="_blank"}.

1. Stop the Alfresco Content Services server.

2. Open a terminal (Linux) or command line window (Windows).

3. Unzip the `alfresco-document-transformation-engine-2.2.x.zip` file.

4. Copy `alfresco-document-transformation-engine-repo-2.2.x.amp` to the `<ALFRESCO_HOME>/amps` folder, and copy `alfresco-document-transformation-engine-share-2.2.x.amp` to the `<ALFRESCO_HOME>/amps_share` folder.

5. Install the AMP files using the Module Management Tool (MMT).

6. Copy your updated license file into the Alfresco Content Services installation folder.

    Delete all files with the extension `*.installed` in this directory.

7. Start the Alfresco Content Services server.

8. Monitor the Alfresco Content Services log.

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package (depending on the configuration of your log level).

## Install GhostScript and pdf2swf

GhostScript and pdf2swf need to be installed manually. GhostScript is used to convert from PDF to PDF/A2, which is available as a Share action.

The following new property has been added to determine how often the temporary files are cleaned:

```bash
tempfilecleaner.cronExpression.windows
```

> **Note:** Alfresco Content Services 5.2 and later versions do not need pdf2swf. It is required by Alfresco One 5.0 if the installation is configured to continue using the deprecated Flash preview. If the administrator does not provide a link to a valid instance of pdf2swf, the warning will continue to appear in the log file. The warning can be ignored if the Document Transformation Engine is using Alfresco One 5.1, or Alfresco Content Services 5.2 and later versions.

1. Download and install [pdf2swf](http://www.swftools.org/download.html){:target="_blank"}.

2. Install GhostScript:

{% capture windows %}

1. Download Ghostscript (32 bit) from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html){:target="_blank"}.

2. Browse to the location of your downloaded file and install the application.

3. Update the `img.gslib` property in the `alfresco-global.properties` file as shown:

    ```bash
    img.gslib = <GhostScript_installation_dir>/lib
    ```

{% endcapture %}

{% capture linux %}

From Source:

1. Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html){:target="_blank"}.

2. Make sure that building toolchains specific to your OS version are installed (for example, `gcc`, `make` or any related packages).

3. Run the following commands to install Ghostscript:

    ```bash
    ./configure
    make
    make install
    ```

    This installs Ghostscript at `/usr/local/`.

4. Add the following to the `alfresco-global.properties` file:

    ```bash
    img.gslib = /usr/local/share/ghostscript/<version>/lib 
    ```

From repositories/CD:

1. Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
2. Open your distribution's terminal program.
3. Based on your Linux distribution, type the following command in the terminal.

    RHEL:

    ```bash
    yum install ghostscript
    ```

    SLES:

    ```bash
    zypper install ghostscript
    ```

    Ubuntu:

    ```bash
    apt-get install ghostscript
    ```

4. Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.

{% endcapture %}

{% capture solaris %}

From Source:

1. Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html){:target="_blank"}.
2. Make sure that building toolchains specific to your OS version are installed (for example, `gcc`, `make` or any related packages).
3. Run the following commands to install Ghostscript:

    ```bash
    ./configure
    make
    make install
    ```

    This installs Ghostscript at `/usr/local/`.

4. Add the following to the `alfresco-global.properties` file:

    ```bash
    img.gslib = /usr/local/share/ghostscript/<version>/lib 
    ```

From repositories/CD:

1. Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
2. Open your distribution's terminal program.
3. Type the following command in the terminal:

    ```bash
    pkgadd SUNWgscr
    ```

4. Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.

{% endcapture %}

{% include tabs.html tableid="ghostscript" opt1="Windows" content1=windows opt2="Linux" content2=linux opt3="Solaris" content3=solaris %}

Set the installation paths in the Document Transformation Engine `TransformationServer\\tomcat\\webapps\\transformation-server\\WEB-INF\\classes\\default-configuration.properties` file:

    ```bash
    transformer.pdf2swf.executable=C:/Program Files (x86)/SWFTools/pdf2swf.exe
    transformer.ghostscript.executable=C:/Program Files/gs/gs9.19/bin/gswin64c.exe
    ```

If GhostScript and pdf2swf are not installed properly or the configured path does not match the installation path, the following message will be displayed on startup of the Document Transformation Engine:

```bash
2017-03-28 09:06:10,847 WARN  [localhost-startStop-1] c.w.w.a.t.t.e.CommandLineTransformer  - Propertytransformer.executable not found at path
C:/Program Files (x86)/SWFTools/pdf2swf.exe
....
2017-03-28 09:00:46,115 WARN  [localhost-startStop-1] c.w.w.a.t.t.e.CommandLineTransformer  - Propertytransformer.executable not found at path
C:/Program Files/gs/gs9.19/bin/gswin64c.exe.
```
