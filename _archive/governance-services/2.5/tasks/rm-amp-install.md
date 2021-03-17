---
audience: 
---

# Installing Records Management AMP files

Records Management is installed by applying two AMP files to an existing Alfresco installation.

The installation procedure uses the following Records Management AMP files:

|alfresco-rm-enterprise-repo-2.5.x.amp|Contains Records Management functionality that's applied to an existing Alfresco installation.|
|alfresco-rm-enterprise-share-2.5.x.amp|Contains Records Management functionality that's applied to an existing Alfresco Share installation.|

**Note:** Install the AMPs manually as described below, rather than using the `apply_amps` tool.

1.  Stop the Alfresco server.

2.  Delete the tomcat\\webapps\\alfresco and tomcat\\webapps\\share folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

    **Note:** If you are using non-Windows systems, such as Mac OS X and Linux, you'll need to replace the backslashes by forward slashes in directory paths.

3.  Browse to the [Support Portal](http://support.alfresco.com) and download the Records Management AMP zip which contains the following files:

    -   alfresco-rm-enterprise-repo-2.5.x.amp
    -   alfresco-rm-enterprise-share-2.5.x.amp
4.  Copy the AMP files to the Alfresco amps and amps\_share directories.

    Copy this file to the Alfresco amps directory:

    -   alfresco-rm-enterprise-repo-2.5.x.amp
    and this file to the Alfresco amps\_share directory:

    -   alfresco-rm-enterprise-share-2.5.x.amp
5.  Change into the root of the Alfresco installation directory. Directories specified in the following procedures are relative to this directory.

6.  Run the following commands to install the AMP files:

    ```
    java -jar bin\alfresco-mmt.jar install amps\alfresco-rm-enterprise-repo-2.5.x.amp tomcat\webapps\alfresco.war
    ```

    ```
    java -jar bin\alfresco-mmt.jar install amps_share\alfresco-rm-enterprise-share-2.5.x.amp tomcat\webapps\share.war
    ```

7.  Start the Alfresco server.

8.  Check the AMP files have been installed successfully, using these commands:

    ```
    java -jar bin\alfresco-mmt.jar list tomcat\webapps\alfresco.war
    ```

    and

    ```
    java -jar bin\alfresco-mmt.jar list tomcat\webapps\share.war
    ```

9.  Start Alfresco Share by browsing to:

    http://<your-server-name\>:<port number\>/share

    At this point, the Records Management module is installed. Next, create a Records Management site.


**Parent topic:**[Installing Records Management](../tasks/rm-install-proc.md)

**Related information**  


[Installing an AMP file](http://docs.alfresco.com/tasks/amp-install.html)

[Uninstalling an AMP file](http://docs.alfresco.com/tasks/uninstall-amp.html)

