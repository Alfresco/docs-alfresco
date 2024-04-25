---
title: Install Google Docs Integration
---

Use these steps to install the Google Docs Integration.

1. Download the installation files.

    For Alfresco Content Services, browse to [Hyland Community](https://community.hyland.com/Products/alfresco/release-notes/release-notes/Alfresco-Google-Docs-Integration-Releases/){:target="_blank"}:

    | File | Description |
    | ---- | ----------- |
    | alfresco-googledrive-repo-enterprise-4.1.x.amp |This AMP contains the Google Docs functionality that is applied to the core repository. The AMP should be applied to the `tomcat/webapps/alfresco directory`. |
    | alfresco-googledrive-share-4.1.x.amp | This AMP file contains the additional Google Docs functionality that is applied to an existing Alfresco Share user interface. The AMP should be applied to the `tomcat/webapps/share` directory. |

    For Alfresco Community Edition, you'll need:

    | File | Description |
    | ---- | ----------- |
    | alfresco-googledrive-repo-community-4.1.x.amp | This AMP contains the Google Docs functionality that is applied to the core repository. The AMP should be applied to the `tomcat/webapps/alfresco directory`. |
    | alfresco-googledrive-share-4.1.x.amp | This AMP file contains the additional Google Docs functionality that is applied to an existing Alfresco Share user interface. The AMP should be applied to the `tomcat/webapps/share` directory. |

2. Change into the root of the installation directory (`<installLocation>`). Directories specified in the following procedures are relative to this directory.

3. Move the repository AMP file to the amps directory.

4. Move the Share AMP file to the `amps_share` directory.

5. Stop the server.

6. Delete the `tomcat\webapps\alfresco` and `tomcat\webapps\share` folders in the installation directory.

7. Use the Module Management Tool (MMT) to install the AMP files into the relevant WAR file:

    For the repository:

    ```bash
    java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps\alfresco-googledrive-repo-**<version>**.amp <installLocation>\tomcat\webapps\alfresco.war
    ```

    > **Note:** Replace `<version>` with your specific file name.

    * Alfresco Content Services: `alfresco-googledrive-repo-enterprise-4.1.x.amp`
    * Alfresco Community Edition: `alfresco-googledrive-repo-community-4.1.x.amp`

    For Alfresco Share:

    ```bash
    java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps_share\alfresco-googledrive-share-**<version>**.amp <installLocation>\tomcat\webapps\share.war
    ```

    > **Note:** Replace `<version>` with your specific file name.

    Alternatively, if your installation is running in the Tomcat application server, you can use the `<installLocation>\bin\apply_amps` command to apply all AMP files that are located in both the amps and `amps_share` directories.

    Install both Google Docs AMP files at the same time by using the `apply_amps` command:

    * Linux: `bin/apply_amps.sh`
    * Windows: `bin\apply_amps.bat`

    The `apply_amps` command checks the version of Alfresco Content Services so that you install the relevant AMP package to the correct version.

8. Start the server.
