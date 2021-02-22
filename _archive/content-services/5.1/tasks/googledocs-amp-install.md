---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing Google Docs integration manually

Google Docs integration is installed by default when you install Alfresco using the setup wizards. If you are installing Alfresco manually, use these steps to install Google Docs integration.

1.  Browse to the [Support Portal](http://support.alfresco.com), and download the following files:

        |alfresco-googledocs-repo-3.0.4-2ent.amp|This AMP contains the Google Docs functionality that is applied to the core Alfresco repository. The AMP should be applied to the tomcat/webapps/alfresco directory.|
    |alfresco-googledocs-share-3.0.4-2ent.amp|This AMP file contains the additional Google Docs functionality that is applied to an existing Alfresco Share user interface. The AMP should be applied to the tomcat/webapps/share directory.|

2.  Change into the root of the Alfresco installation directory. Directories specified in the following procedures are relative to this directory.

3.  Move the alfresco-googledocs-repo-3.0.4-2ent.amp file to the amps directory.

4.  Move the alfresco-googledocs-share-3.0.4-2ent.amp file to the amps\_share directory.

5.  Stop the Alfresco server.

6.  Delete the tomcat\\webapps\\alfresco and tomcat\\webapps\\share folders in the Alfresco installation directory.

7.  Use the Module Management Tool \(MMT\) to install the AMP files.

    `java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps\alfresco-googledocs-repo-3.0.4-2ent.amp <installLocation>\tomcat\webapps\alfresco.war`

    `java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps_share\alfresco-googledocs-share-3.0.4-2ent.amp <installLocation>\tomcat\webapps\share.war`

    Alternatively, if your Alfresco installation is running in the Tomcat application server, you can use the <installLocation\>\\bin\\apply\_amps command to apply all AMP files that are located in both the amps and amps\_share directories.

    Install both Google Docs AMP files at the same time by using the apply\_amps command:

    -   Linux: bin/apply\_amps.sh
    -   Windows: bin\\apply\_amps.bat
    The apply\_amps command checks the version of Alfresco so that you install the relevant AMP package to the correct Alfresco version.

8.  Start the Alfresco server.


**Parent topic:**[Installing and configuring Google Docs integration](../concepts/googledocs-intro.md)

