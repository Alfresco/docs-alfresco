---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing alfresco-pdf-renderer

Alfresco Content Services uses alfresco-pdf-renderer for creating document thumbnails and previews. Use this information to install alfresco-pdf-renderer on your system.

**Note:** To use the alfresco-pdf-renderer, ensure that Alfresco Content Services has been installed. Changes made to the alfresco-global.properties file in your installation of Alfresco Content Services will change the configuration and enable you to manually install the alfresco-pdf-renderer application.

**Note:** The alfresco-pdf-renderer executable file is platform-specific.

The alfresco-pdf-renderer binaries are available in the Alfresco Content Services Distribution zip.

-   For Windows:
    -   Extract the file alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-win64.tgz to a location of your choice.
    -   Browse to the location of your saved file and extract the archive.
    -   Add the following properties to the alfresco-global.properties file:

        ```
        alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
        alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
        ```


-   For Linux:
    -   Extract the file alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-linux.tgz to a location of your choice.
    -   Browse to the location of your saved file and extract the archive.
    -   Add the following properties to the alfresco-global.properties file:

        ```
        alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
        alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
        ```

-   For Mac:
    -   Extract the file alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-osx.tgz to a location of your choice.
    -   Browse to the location of your saved file and extract the archive.
    -   Add the following properties to the alfresco-global.properties file:

        ```
        alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
        alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
        ```


**Parent topic:**[Installing additional software for Alfresco Content Services](../concepts/prereq-opt-install.md)

**Related information**  


[Installing ImageMagick](imagemagick-config.md)

