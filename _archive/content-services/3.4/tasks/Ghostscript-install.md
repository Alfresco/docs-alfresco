---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [Flash Player, Extensions/Third Party Tools]
---

# Installing Ghostscript

Alfresco Share uses Ghostscript version 8.56 for creating document thumbnails and previews. This topic describes how to install Ghostscript on your system.

ImageMagick uses Ghostscript to render Postscript and PDF files, as well as formats where a translator to Postscript is available. ImageMagick will also use Ghostscript fonts to support the standard set of Postscript fonts. 

**Note:** The Ghostscript executable file is entirely platform-specific.

-   For Windows:
    -   Download Ghostscript \(32 bit\) from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
    -   Browse to the location of your downloaded file and install the application.
    -   Update the `img.gslib` property in the alfresco-global.properties file as shown below:

        ```
        img.gslib = <GhostScript_installation_dir>/lib
        ```


-   For Linux:

    **From Source:**

    -   Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
    -   Make sure that building toolchains specific to your OS version are installed \(for example, gcc, make or any related packages\).
    -   Run the following commands to install Ghostscript:

        ```
        ./configure
        make
        make install
        ```

        This installs Ghostscript at /usr/local/.

    -   Add the following to the alfresco-global.properties file:

        ```
        img.gslib = /usr/local/share/ghostscript/<version>/lib 
        ```

    **From repositories/CD:**

    -   Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
    -   Open your distribution's terminal program.
    -   Based on your Linux distribution, type the following command in the terminal.

        RHEL:

        ```
        yum install ghostscript
        ```

        SLES:

        ```
        zypper install ghostscript
        ```

        Ubuntu:

        ```
        apt-get install ghostscript
        ```

    -   Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.
-   For Solaris:

    **From Source:**

    -   Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
    -   Make sure that building toolchains specific to your OS version are installed \(for example, gcc, make or any related packages\).
    -   Run the following commands to install Ghostscript:

        ```
        ./configure
        make
        make install
        ```

        This installs Ghostscript at /usr/local/.

    -   Add the following to the alfresco-global.properties file:

        ```
        img.gslib = /usr/local/share/ghostscript/<version>/lib 
        ```

    **From repositories/CD:**

    -   Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
    -   Open your distribution's terminal program.
    -   Type the following command in the terminal:

        ```
        pkgadd SUNWgscr
        ```

    -   Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.

**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

**Related information**  


[Installing ImageMagick](imagemagick-config.md)

