---
title: Install additional software
---

You can install the third-party software used by Content Services independently. Some of the software can be installed any time before or after installing Content Services.

## Install LibreOffice

In Content Services, you can transform a document from one format to another, for example, a text file to a PDF file. To access these transformation facilities, you must install LibreOffice. This is optional, and can be done any time after Content Services is installed.

1. Browse to the [LibreOffice download site](https://www.libreoffice.org/download/download/){:target="_blank"}.

2. Download the latest (stable) version of LibreOffice for your platform.

3. When prompted, specify a download destination.

4. Browse to the location of your downloaded file, and install the application.

5. Change the installation directory to:

    * (Windows) `c:\Alfresco\LibreOffice`
    * (Linux) `/opt/alfresco/LibreOffice`

    If you're installing LibreOffice on Linux, you also need a number of libraries to be installed. See [Install Linux libraries](#install-linux-libraries) for more.

6. Modify the `jodconverter.officeHome` property in the `<classpathRoot>/alfresco-global.properties` file to point to the LibreOffice install location.

    > **Note:** For Windows, set the path using the `\\` separator, or use the forward slash `/` Unix path separator. For example: `c:\\Alfresco\\LibreOffice` or `c:/Alfresco/LibreOffice`.

7. If the Content Services server is running, stop and restart the server.

### Install Linux libraries

Use this information to install Linux libraries manually on supported Linux distributions, such as Ubuntu, SUSE and Red Hat.

LibreOffice requires the following libraries to be installed on your system:

* libfontconfig
* libICE
* libSM
* libXrender
* libXext
* libXinerama
* libcups
* libGLU
* libcairo2
* libgl1-mesa-glx

If the required libraries are missing, you'll get a warning message. You can install them using your preferred package manager from the command line. Note that the file names for the Linux libraries may vary by distribution.

For Red Hat Enterprise Linux/CentOS, you can run:

```bash
cd <libre-install-dir>/LibreOffice_*.*.*.*_Linux_x86-64_rpm/RPMS/
```

```bash
sudo yum localinstall *rpm
```

For Ubuntu:

```bash
cd <libre-install-dir>/LibreOffice_*.*.*.*_Linux_x86-64_rpm/RPMS/
```

```bash
sudo dpkg -i *deb
```

If LibreOffice doesn't start up normally with Content Services, test it manually, for example, by running this startup script:

```bash
start ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh start
status ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh status
```

If you receive errors that indicate that a library is missing, work with your system administrator to add the missing library or its equivalent from your configured repositories.

## Install ImageMagick

To enable image manipulation in Content Services, you must install and configure ImageMagick. Content Services uses ImageMagick to manipulate images for previewing.

1. Verify that ImageMagick is already installed on your system.

    Use the ImageMagick convert command to check that you have the right software installed on your machine. This command is usually located in `/usr/bin`: `install Image`.

2. If the ImageMagick software isn't available on your system, download and install the appropriate package for your platform.

    To download ImageMagick, browse to the [ImageMagick download website](https://www.imagemagick.org/script/download.php){:target="_blank"}.

    > **Note:** In next steps, you'll make changes to the Content Services configuration files to enable the manually installed ImageMagick application. These steps can only be performed after Content Services has been installed.

3. Browse to the `<classpathRoot>` directory.

4. Open the `alfresco-global.properties` file.

5. Modify the ImageMagick properties to point to the ImageMagick root directory.

    | Property | Description |
    | -------- | ----------- |
    | img.root | Windows: `img.root=C:\\ImageMagick`<br>Linux: `img.root=/ImageMagick`<br><br>**Note:** Don't include a slash (`/`) at the end of the path, i.e. `/ImageMagick/`. |
    | img.dyn | Windows: `img.dyn=${img.root}\\lib` <br>Linux: `img.dyn=${img.root}/lib` |
    | img.exe | Windows: `img.exe=${img.root}\\convert.exe` <br>Linux: `img.exe=${img.root}/bin/convert` |
    | img.coders | Windows: `img.coders=${img.root}\\modules\\coders` <br>Linux: `img.coders=${img.root}/modules/coders` |
    | img.config | Windows: `img.config=${img.root}\\config` <br>Linux: `img.config=${img.root}/config` |
    | img.url | Windows: `img.url=${img.root}\\url` <br>Linux: `img.url=${img.root}/url` |

> **Note:** Test that you're able to convert a PDF using the command: `convert filename.pdf[0] filename.png`

## Install alfresco-pdf-renderer

Content Services uses `alfresco-pdf-renderer` for creating document thumbnails and previews. Use this information to install `alfresco-pdf-renderer` on your system.

> **Note:** To use the `alfresco-pdf-renderer`, ensure that Content Services is installed. Changes made to the `alfresco-global.properties` file in your installation will change the configuration and enable you to manually install the `alfresco-pdf-renderer` application.

> **Note:** The `alfresco-pdf-renderer` executable file is platform-specific.

The `alfresco-pdf-renderer` binaries are available in the Content Services distribution zip.

* For Windows:
  * Extract the file `alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-win64.tgz` to a location of your choice.
  * Browse to the location of your saved file and extract the archive.
  * Add the following properties to the `alfresco-global.properties` file:

    ```bash
    alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
    alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
    alfresco-pdf-renderer.url=http://localhost:8090/
    ```

* For Linux:
  * Extract the file `alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-linux.tgz` to a location of your choice.
  * Browse to the location of your saved file and extract the archive.
  * Add the following properties to the `alfresco-global.properties` file:

    ```bash
    alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
    alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
    alfresco-pdf-renderer.url=http://localhost:8090/
    ```

> **Note:** Use the `alfresco-pdf-renderer.url` property when running `alfresco-pdf-renderer` remotely. If you're running `alfresco-pdf-renderer` locally, then you don't need to set this property.

## Install TinyMCE language packs

Translations in Content Services use language packs. The supported language packs are:

* English (en)
* German (de)
* Spanish (es)
* French (fr)
* Italian (it)
* Japanese (ja)
* Dutch (nl)
* Norwegian - Bokmål (nb)
* Russian (ru)
* Brazilian Portuguese (pt_BR)
* Simplified Chinese (zh_CN)

The language used switches according to the browser locale. Ensure that your browser is set up to view the relevant locale, which ensures that the special characters display correctly in your installed instance.

## Install integrations

Use this information to review the components or modules that integrate Content Services with other applications.

### Services

| Services | Notes |
| -------- | ----- |
| Process Services | |
| Governance Services | |

### Integrations

| Integrations | Notes |
| ------------ | ----- |
| Sync Service | |
| Desktop Sync | |
| Transform Service | |
| Document Transformation Engine | Paid add-on module |
| Media Management | Paid add-on module and requires additional software |
| Search and Insight Engine | Paid add-on module |
| Search Services | |
| Federation Services | |
| Identity Service | |
| SAML Module for Alfresco Content Services | |
| Intelligence Services |  |
| Content Connector for AWS S3 | Paid add-on module |
| Content Connector for AWS Glacier | |
| Content Connector for EMC Centera | Paid add-on module and requires additional software |
| Content Connector for Salesforce | |
| Content Connector for SAP applications | Paid add-on module |
| Outlook Integration | Paid add-on module |
| Office Services | |
| Google Docs Integration | |

### Applications

| Applications | Notes |
| ------------ | ----- |
| Digital Workspace | |

## Test installation

Installation testing checks that Content Services is successfully installed and it's working as expected after installation.

Some of the points that need to be checked prior to testing your installation are:

* Verify the prerequisites you need to install.
* Verify that, after a successful install, the application works as per the specification document and meets user needs.
* On uninstall, check that all previously installed files and registry entries are removed as expected.

### Post-installation checks

Once you've successfully installed Content Services, test and gain familiarity with the core features and functions.

Here are some tips to familiarize yourself.

> **Note:** We recommend that you create a test site for testing purpose and put all your test data in that site.

* Can you login using your user name and password. See [Signing in]({% link content-services/6.1/using/share.md %}#signing-in).
* Can you create a site. See [Creating a new site]({% link content-services/6.1/using/sites/index.md %}#creating-a-site).
* Can you add new users to the site. See [Adding users to a site]({% link content-services/6.1/using/sites/index.md %}#adding-users-to-a-site).
* Can you add pages to the site. See [Adding pages to a site]({% link content-services/6.1/using/sites/index.md %}#customizesite).
* Can you add content to a site library. See [Adding content items]({% link content-services/6.1/using/content/manage.md %}).
* Can you copy or move content from its current location to another folder or any other site. See [Copying content]({% link content-services/6.1/using/content/manage.md %}#copying-content) and [Moving content]({% link content-services/6.1/using/content/manage.md %}#moving-content).
* Can you update content. See [Updating content]({% link content-services/6.1/using/content/manage.md %}#uploading-files).
* Can you manage permissions for a user or a group for accessing content. See [Managing content permissions]({% link content-services/6.1/using/permissions.md %}).
* Can you add a new rule to a folder in the site library and check if it works. See [Adding a new rule]({% link content-services/6.1/using/content/rules.md %}#createrule).
* Can you schedule events, such as meeting, for your team. See [Scheduling events]({% link content-services/6.1/using/sites/features.md %}#calendar).

### Post-installation checks (clustered environment)

Once you've successfully installed and configured Content Services in a distributed/clustered environment, make sure that the features and customizations you've added work properly.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create a test site for testing purposes, and put all your test data in that site.

* Check that the application server is running.
* Can you login using your user name and password. See [Signing in]({% link content-services/6.1/using/share.md %}#signing-in).
* Check that various components are communicating with each other.
* For a clustered installation, check if when one node is down, the request is forwarded to the next available node.
* Check if clustering is working properly by running the [cluster validation tool]({% link content-services/6.1/admin/cluster.md %}#managecluster) in the Admin Console.
* Check if you are using a clustering-enabled license.
* Change the cluster-related properties in the `alfresco-global.properties` file, and check if all the nodes are up and running.

> **Note:** After you've finished testing, remember to delete the test site or test data in order to clear your database.

## Start and stop server

Use this information to run the Content Services server and Alfresco Share.

### Start server

Once you've installed Content Services using the distribution zip, you can start the server. The server must be running before you can use Alfresco Share.

1. Navigate to the installation directory for your database and start the server.

2. Navigate to the Tomcat `/bin` directory and start the server:

    For example: (Linux)

    ```bash
    ./startup.sh
    ```

    For example: (Windows)

    ```bash
    startup
    ```

    You need administrator rights to run this command.

3. Browse to the location of your Content Services installation:

    For example, `http://<your-host>:8080/alfresco`.

### Stop server

Use this information to stop the server.

1. Navigate to the Tomcat `/bin` directory then choose one of these options to stop the server:

    For example: (Linux)

    ```bash
    ./shutdown.sh
    ```

    For example: (Windows)

    ```bash
    shutdown
    ```

    You need administrator rights to run this command.

2. Navigate to the installation directory for your database and stop the server.

### Start Alfresco Share

Once you've started Content Services, you can start Alfresco Share using a browser.

1. Browse to the location of your installation.

    For example, `http://<your-host>:8080/share`.

    Alfresco Share opens in a browser.

2. Sign in using a user name and password.

    The default administrator user name is `admin`.
