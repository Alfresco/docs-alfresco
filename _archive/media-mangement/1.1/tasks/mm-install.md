---
author: Alfresco Documentation
audience: 
---

# Installing Media Management

Download and install the Media Management AMP files, and add Media Management properties to your alfresco-global.properties file.

Ensure that you have installed the required external software before installing Alfresco Media Management. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) for information on what you require before you start the Media Management installation.

1.  Stop the Alfresco server.

2.  Unzip the Alfresco Media Management package into a new system directory; for example, opt/media-management:

    -   alfresco-mm-1.1.x-n-dist.zip
    \(where 'n' is the build number for the distribution\)

    You will see four folders:

    -   activemq: contains ActiveMQ software
    -   amps-repository: contains one AMP file to be applied to the Alfresco repository
    -   amps-share: contains one AMP file to be applied to Alfresco Share
    -   remote-node: contains content services node software and configuration file
    We will refer to this new directory as the *Media Management installation directory*. If you are using the recommended [Media Management architecture](../concepts/mm-architecture.md), the activemq, amps-repository and amps-share folders reside on the Alfresco server, and you must move the remote-node folder to your remote server.

3.  Install the repository AMP file. Navigate to the amps-repository directory and copy the following file to the Alfresco amps directory.

    -   alfresco-mm-repo-1.1.x-n.amp
4.  Install the Share AMP file. Navigate to the amps\_share directory and copy the following file to the Alfresco amps\_share directory.

    -   alfresco-mm-share-1.1.x-n.amp
5.  A number of files are overwritten when installing Media Management, as follows:

    -   /WEB-INF/lib/gytheio-commons-x.x.jar
    -   /WEB-INF/lib/gytheio-health-commons-x.x.jar
    -   /WEB-INF/lib/gytheio-messaging-camel-x.x.jar
    -   /WEB-INF/lib/gytheio-messaging-commons-x.x.jar
    -   /WEB-INF/classes/alfresco/templates/webscripts/org/alfresco/repository/comments/comment.lib.ftl
    -   /WEB-INF/classes/alfresco/templates/webscripts/org/alfresco/repository/comments/comment.put.json.js
    -   /WEB-INF/classes/alfresco/templates/webscripts/org/alfresco/repository/publishing/authform.get.html.ftl
    where x.x is the current version number.

    We recommend that you back up these files before installing the AMP files. Also, when you install Media Management, a backup of the original alfresco.war file is stored as tomcat/webapps/alfresco.war<numbers\>.bak. Keep this .bak file in case you need to uninstall Media Management.

6.  Delete the tomcat\\webapps\\alfresco and tomcat\\webapps\\share folders in the Alfresco installation directory.

7.  Navigate to the bin directory and run the Module Management Tool \(MMT\) file to install the repository AMP files:

    1.  For the Alfresco repository:

        ```
        java -jar alfresco-mmt.jar install ../amps/alfresco-mm-<version>.amp ../tomcat/webapps/alfresco.war -force
        ```

        ```
        java -jar alfresco-mmt.jar install ..\amps\alfresco-mm-<version>.amp ..\tomcat\webapps\alfresco.war -force
        ```

        where alfresco-mm-<version\>.amp is the specific AMP file that you downloaded.

    2.  For Alfresco Share:

        ```
        java -jar alfresco-mmt.jar install ../amps_share/alfresco-mm-<version>.amp ../tomcat/webapps/share.war -force
        ```

        ```
        java -jar alfresco-mmt.jar install ..\amps_share\alfresco-mm-<version>.amp ..\tomcat\webapps\share.war -force
        ```

        where alfresco-mm-<version\>.amp is the specific AMP file that you downloaded.

    Check the output to ensure that the AMP files have installed successfully.

8.  Take a copy of the most recent tomcat/webapps/alfresco.war<numbers\>.bak file in case you need to uninstall Media Management.

9.  Define properties relevant to Media Management in your alfresco-global.properties file.

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configuring Media Management](mm-props-config.md) for the full list.

    1.  If you have ActiveMQ on a separate server, configure the host and port number for ActiveMQ:

        ```
        # Messaging broker, default is localhost
        messaging.broker.url=failover:(tcp://broker1:61616,tcp://broker2:61616)
        ```

        where `broker` is each ActiveMQ instance that you have configured.

        You need to set this property only if your ActiveMQ instance is not on the same server as Alfresco.

    2.  Configure FFmpeg and ExifTool if they are not already available on the command line executable path:

        ```
        # FFmpeg executable path, default is ffmpeg
        ffmpeg.exe=
        
        # ExifTool executable path, default is exiftool
        exiftool.exe=
        ```

    3.  If you want to preview raw images, set the following properties in the alfresco-global.properties file.

        ```
        transformer.strict.mimetype.check=true
        transformer.strict.mimetype.check.whitelist.mimetypes=image/x-raw-adobe
        ```

        Set the transformer.strict.mimetype.check property to `true`, and use the transformer.strict.mimetype.check.whitelist.mimetypes property to add the x-raw-adobe MIME type to an existing whitelist.

    4.  If you are using shared content workspaces, remote transformations or publishing channels, configure these as specified in [Configuring Media Management](mm-props-config.md).

10. Update the remote-node/config.yml file that you extracted from the Media Management installation zip.

    Specify the ActiveMQ host name and prefetch policy \(to ensure that transformations can be processed in parallel\):

    ```
    messaging:
    broker:
      url: tcp://localhost:61616?jms.prefetchPolicy.queuePrefetch=1
    ```

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable or are specified using `img.exe` and `ffmpeg.exe` system properties.

    For more information about the recommended architecture for Media Management, see [Media Management architecture](../concepts/mm-architecture.md). For information about the content services framework, see [Content services node architecture](../concepts/mm-gytheio.md).

11. Restart the server.

12. Launch Alfresco Share.

    To check that the Media Management AMPs have installed correctly, add a video or image to Share, open the file and check that you can see that the media loading and a Renditions Panel is available.


**Parent topic:**[Installing and configuring Media Management](../concepts/mm-install-overview.md)

