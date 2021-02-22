---
audience: 
---

# Applying the Records Management AMP files

Records Management is installed by applying two AMP files to an existing Alfresco installation.

**Note:** In this task and the following sections, if you are using non-Windows systems, such as Mac OS X and Linux, you will need to replace the backslashes by forward slashes in directory paths.

The installation procedure uses the following Records Management AMP files:

|alfresco-rm-server-2.3.x.amp|Contains the additional Records Management functionality that is applied to an existing Alfresco installation.|
|alfresco-rm-share-2.3.x.amp|Contains the additional Records Management functionality that is applied to an existing Alfresco Share installation.|

1.  Browse to the [Support Portal](http://support.alfresco.com) and download the Records Management AMP zip which contains the following files:

    -   alfresco-rm-server-2.3.x.amp
    -   alfresco-rm-share-2.3.x.amp
2.  Change into the root of the Alfresco installation directory. Directories specified in the following procedures are relative to this directory.

3.  Move the alfresco-rm-server-2.3.x.amp file to the amps directory.

4.  Move the alfresco-rm-share-2.3.x.amp file to the amps\_share directory.

5.  Stop the Alfresco server.

6.  Delete the tomcat\\webapps\\alfresco and tomcat\\webapps\\share folders in the Alfresco installation directory.

7.  Change into the Alfresco .\\bin directory.

    This is where the Module Management Tool \(MMT\) is located.

8.  Run the following command to install the core Records Management component:

    ```
    java -jar alfresco-mmt.jar install ..\amps\alfresco-rm-server-<version>.amp ..\tomcat\webapps\alfresco.war      
    ```

    **Note:** You will need to replace alfresco-rm-server-<version\>.amp with the version of the specific AMP file you downloaded.

9.  Run the following command to install the Records Management Share UI component:

    ```
    java -jar alfresco-mmt.jar install ..\amps_share\alfresco-rm-share-<version>.amp ..\tomcat\webapps\share.war
    ```

    **Note:** You will need to replace alfresco-rm-share-<version\>.amp with the version of the specific AMP file you downloaded.

10. Start the Alfresco server.

11. Start Alfresco Share by browsing to:

    http://<your-server-name\>:<port number\>/share

    At this point, the required Records Management module is installed, and your next step is to create a Records Management site.


**Parent topic:**[Installing Records Management](../tasks/rm-install-proc.md)

