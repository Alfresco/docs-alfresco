---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing GhostScript and pdf2swf

Use this information to install and setup GhostScript and pdf2swf manually.

1.  Download and install GhostScript version 8.64.
    -   **For Windows:**
        1.  Download Ghostscript \(32 bit\) from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
        2.  Browse to the location of your downloaded file and install the application.
        3.  Update the `img.gslib` property in the alfresco-global.properties file as shown:

            ```
            img.gslib = <GhostScript_installation_dir>/lib
            ```

    -   **For Linux:**

        From Source:

        1.  Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
        2.  Make sure that building toolchains specific to your OS version are installed \(for example, gcc, make or any related packages\).
        3.  Run the following commands to install Ghostscript:

            ```
            ./configure
            make
            make install
            ```

            This installs Ghostscript at /usr/local/.

        4.  Add the following to the alfresco-global.properties file:

            ```
            img.gslib = /usr/local/share/ghostscript/<version>/lib 
            ```

        From repositories/CD:

        1.  Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
        2.  Open your distribution's terminal program.
        3.  Based on your Linux distribution, type the following command in the terminal.

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

        4.  Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.
    -   **For Solaris:**

        From Source:

        1.  Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
        2.  Make sure that building toolchains specific to your OS version are installed \(for example, gcc, make or any related packages\).
        3.  Run the following commands to install Ghostscript:

            ```
            ./configure
            make
            make install
            ```

            This installs Ghostscript at /usr/local/.

        4.  Add the following to the alfresco-global.properties file:

            ```
            img.gslib = /usr/local/share/ghostscript/<version>/lib 
            ```

        From repositories/CD:

        1.  Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
        2.  Open your distribution's terminal program.
        3.  Type the following command in the terminal:

            ```
            pkgadd SUNWgscr
            ```

        4.  Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.
2.  Download and install [pdf2swf](http://www.swftools.org/download.html).
3.  Set the installation paths in the Document Transformation Engine TransformationServer\\tomcat\\webapps\\transformation-server\\WEB-INF\\classes\\default-configuration.properties file:

    ```
    transformer.pdf2swf.executable=C:/Program Files (x86)/SWFTools/pdf2swf.exe
    transformer.ghostscript.executable=C:/Program Files/gs/gs9.19/bin/gswin64c.exe
    ```

    If GhostScript and pdf2swf are not installed properly or the configured path does not match the installation path, the following message will be displayed on startup of the Document Transformation Engine:

    ```
    2017-03-28 09:06:10,847 WARN  [localhost-startStop-1] c.w.w.a.t.t.e.CommandLineTransformer  - Property transformer.executable not found at path 
    C:/Program Files (x86)/SWFTools/pdf2swf.exe
    ....
    2017-03-28 09:00:46,115 WARN  [localhost-startStop-1] c.w.w.a.t.t.e.CommandLineTransformer  - Property transformer.executable not found at path 
    C:/Program Files/gs/gs9.19/bin/gswin64c.exe.
    ```


Alfresco Content Services 5.2 and later versions do not need pdf2swf. It is required by Alfresco One 5.0 if the installation is configured to continue using the deprecated Flash preview. If the administrator does not provide a link to a valid instance of pdf2swf, the warning will continue to appear in the log file. The warning can be ignored if the Document Transformation Engine is using Alfresco One 5.1, or Alfresco Content Services 5.2 and later versions.

GhostScript is used to convert from PDF to PDF/A2, which is available as a Share action.

Also, the following new property has been added to determine how often the temporary files are cleaned:

```
tempfilecleaner.cronExpression.windows
```

**Parent topic:**[Installing the Document Transformation Engine](../concepts/transerv-installing.md)

