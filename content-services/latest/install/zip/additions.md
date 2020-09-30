---
title: Install additional software
---

You can install the third-party software used by Alfresco Content Services independently. Some of the software can be installed any time before or after installing Alfresco Content Services.

## Install LibreOffice

In Alfresco Content Services, you can transform a document from one format to another, for example, a text file to a PDF file. To access these transformation facilities, you must install LibreOffice. This is optional, and can be done any time after Alfresco Content Services is installed.

1. Browse to the LibreOffice download site: [LibreOffice download site](https://www.libreoffice.org/download/download/){:target="_blank"}

2. Download the latest (stable) version of LibreOffice for your platform.

3. When prompted, specify a download destination.

4. Browse to the location of your downloaded file, and install the application.

5. Change the installation directory to:

    * (Windows) `c:\\Alfresco\\LibreOffice`
    * (Linux) `/opt/alfresco/LibreOffice`

    If you're installing LibreOffice on Linux, you also need a number of libraries to be installed. See [Install Linux libraries](#install-linux-libraries) for more.

6. Modify the `jodconverter.officeHome` property in the `<classpathRoot>/alfresco-global.properties` file to point to the LibreOffice install location. See [System paths](#LINK-reuse/conv-syspaths.md) for more.

    > **Note:** For Windows, set the path using the `\\` separator, or use the forward slash `/` Unix path separator. For example: `c:\\Alfresco\\LibreOffice` or `c:/Alfresco/LibreOffice`.

7. If the Alfresco Content Services server is running, stop and restart the server.

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

If LibreOffice doesn't start up normally with Alfresco Content Services, test it manually, for example, by running this startup script:

```bash
start ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh start
status ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh status
```

If you receive errors that indicate that a library is missing, work with your system administrator to add the missing library or its equivalent from your configured repositories.

## Install ImageMagick

To enable image manipulation in Alfresco Content Services, you must install and configure ImageMagick. Alfresco Content Services uses ImageMagick to manipulate images for previewing.

1. Verify that ImageMagick is already installed on your system.

    Use the ImageMagick convert command to check that you have the right software installed on your machine. This command is usually located in `/usr/bin`: `install Image`.

2. If the ImageMagick software isn't available on your system, download and install the appropriate package for your platform.

    To download ImageMagick, browse to [ImageMagick download website](https://www.imagemagick.org/script/download.php){:target="_blank"}.

    > **Note:** In next steps, you'll make changes to the Alfresco Content Services configuration files to enable the manually installed ImageMagick application. These steps can only be performed after Alfresco Content Services has been installed.

3. Browse to the `<classpathRoot>` directory. See [System paths](#LINK-reuse/conv-syspaths.md) for more.

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

Alfresco Content Services uses `alfresco-pdf-renderer` for creating document thumbnails and previews. Use this information to install `alfresco-pdf-renderer` on your system.

> **Note:** To use the `alfresco-pdf-renderer`, ensure that Alfresco Content Services is installed. Changes made to the `alfresco-global.properties` file in your installation will change the configuration and enable you to manually install the `alfresco-pdf-renderer` application.

> **Note:** The `alfresco-pdf-renderer` executable file is platform-specific.

The `alfresco-pdf-renderer` binaries are available in the Alfresco Content Services distribution zip.

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

Translations in Alfresco Content Services use language packs. The supported language packs are:

* German (de)English (en)
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
