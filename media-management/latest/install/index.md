---
title: Install Media Management
---

The Media Management capability in Alfresco is delivered as a zip file containing AMP files, an instance of ActiveMQ, and the content services node infrastructure.

In these topics you will set up ActiveMQ, install the AMP files into an existing Alfresco instance, configure your settings and start Media Management.

## Prerequisites for Media Management

There are a number of prerequisite software requirements for Media Management before you start the installation.

You require one of each of the following components.

|Requirement|Description|
|-----------|-----------|
|Software|{::nomarkdown}<ul><li>FFmpeg 2.5.4 from the command line for video transformations. See [FFmpeg](http://ffmpeg.org){:target="_blank"} for information on how to download and use FFmpeg. Make sure that your FFmpeg installation has support for H.264 and AAC codecs. If FFmpeg is not available locally, Media Management functionality is reduced.</li><li>ExifTool 9.76 from the command line for full IPTC metadata extraction. See [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/){:target="_blank"} for information about how to download and use ExifTool.</li><li>Apache ActiveMQ 5.15 or later. See [Configuring ActiveMQ](LINK) for more information about installing ActiveMQ.</li><li>ImageMagick 6.8.6-6 for image manipulation. See [Installing ImageMagick](LINK) for more information about installing ImageMagick.</li></ul>{:/}**Note:** If you are using RAW image formats, you must install an ImageMagick delegate, for example, UFRaw, to manipulate the images. See [UFRaw](http://ufraw.sourceforge.net/){:target="_blank"} for more information. To preview RAW image formats, you need to set additional configuration properties. See [step 8 of Installing Media Management](LINK).**Note:** FFmpeg and ExifTool are required to view media in Share. See [step 8 of Installing Media Management](LINK) for information on how to set these in the `alfresco-global.properties` file.|
|Alfresco Content Services|Alfresco Content Services 6.2. See [Supported Platforms]({% link media-management/latest/support/index.md %}) for more information.|
|Java requirements|OpenJDK 11 or later.|
|Remote transformation services (optional)|AWS Elastic Transcoder. See [AWS](http://aws.amazon.com/elastictranscoder/){:target="_blank"} and [Configuring the Elastic Transcoder content transformer]({% link media-management/latest/config/index.md %}) for more information.|

## Install the Media Management AMP files

Download and install the Media Management AMP files, and add Media Management properties to your alfresco-global.properties file. Ensure that you have installed the required external software before installing Alfresco Media Management. See [Prerequisites for using Media Management](LINK) for information on what you require before you start the installation.

1. Stop the Alfresco Content Services server.

2. Unzip the Alfresco Media Management package into a new system directory; for example, `opt/media-management`:

    `alfresco-mm-distribution-1.4.x.zip`

    The ZIP file contains the following folders:

    * `activemq`: contains ActiveMQ software
    * `amps-repository`: contains one AMP file to be applied to the Alfresco Content Services repository
    * `amps-share`: contains one AMP file to be applied to Alfresco Share
    * `remote-node`: contains content services node software and configuration file
    If you are using the recommended [Media Management architecture]({% link media-management/latest/index.md %}), the `activemq`, `amps-repository` and `amps-share` folders reside on the Alfresco Content Services server, and you must move the `remote-node` folder to your remote server.

3. Install the repository AMP file. Navigate to the `amps-repository` directory and copy the following file to the `amps` folder.

    `alfresco-mm-repo-1.4.x.amp`

4. Install the Share AMP file. Navigate to the amps_share directory and copy the following file to the amps_share directory.

    `alfresco-mm-share-1.4.x.amp`

5. Delete the tomcat\webapps\alfresco and tomcat\webapps\share folders in the Alfresco Content Services installation directory.

6. Navigate to the bin directory and run the Module Management Tool (MMT) file to install the repository AMP files:

    1. For the Alfresco Content Services repository:

        ``` bash
        java -jar alfresco-mmt.jar install ../amps/alfresco-mm-<version>.amp ../tomcat/webapps/alfresco.war
        ```

        ``` bash
        java -jar alfresco-mmt.jar install ..\amps\alfresco-mm-<version>.amp ..\tomcat\webapps\alfresco.war
        ```

        where alfresco-mm-<version\>.amp is the specific AMP file that you downloaded.

    2. For Alfresco Share:

        ``` bash
        java -jar alfresco-mmt.jar install ../amps_share/alfresco-mm-<version>.amp ../tomcat/webapps/share.war
        ```

        ``` bash
        java -jar alfresco-mmt.jar install ..\amps_share\alfresco-mm-<version>.amp ..\tomcat\webapps\share.war
        ```

        where `alfresco-mm-<version>.amp` is the specific AMP file that you downloaded.

    Check the output to ensure that the AMP files have installed successfully.

7. Take a copy of the most recent `tomcat/webapps/alfresco.war<numbers>.bak` file in case you need to uninstall Media Management.

8. Define properties relevant to Media Management in your `alfresco-global.properties` file.

    A sample `alfresco-global.properties` file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configure Media Management]({% link media-management/latest/config/index.md %}) for the full list.

    1. If you have ActiveMQ on a separate server, configure the host and port number for ActiveMQ:

        ``` xml
        # Messaging broker, default is localhost
        messaging.broker.url=failover:(tcp://broker1:61616,tcp://broker2:61616)
        ```

        where `broker` is each ActiveMQ instance that you have configured.

        You need to set this property only if your ActiveMQ instance is not on the same server as Alfresco Content Services.

    2. Configure FFmpeg and ExifTool if they are not already available on the command line executable path:

        ``` xml
        # FFmpeg executable path, default is ffmpeg
        ffmpeg.exe=

        # ExifTool executable path, default is exiftool
        exiftool.exe=
        ```

    3. If you want to preview raw images, set the following properties in the `alfresco-global.properties` file.

        ``` xml
        transformer.strict.mimetype.check=true
        transformer.strict.mimetype.check.whitelist.mimetypes=image/x-raw-adobe
        ```

        Set the `transformer.strict.mimetype.check` property to `true`, and use the `transformer.strict.mimetype.check.whitelist.mimetypes` property to add the `x-raw-adobe` MIME type to an existing whitelist.

    4. If you are using shared content workspaces, remote transformations or publishing channels, configure these as specified in [Configure Media Management]({% link media-management/latest/config/index.md %}).

9. Update the `remote-node/config.yml` file that you extracted from the Media Management installation zip.

    Specify the ActiveMQ host name and prefetch policy (to ensure that transformations can be processed in parallel):

    ``` xml
    messaging:
    broker:
      url: tcp://localhost:61616?jms.prefetchPolicy.queuePrefetch=1
    ```

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable or are specified using `img.exe` and `ffmpeg.exe` system properties.

    For more information about the recommended architecture for Media Management, see [Media Management architecture]({% link media-management/latest/index.md %}). For information about the content services framework, see [Content services node architecture]({% link media-management/latest/index.md %}).

10. Restart the server.

11. Launch Alfresco Share.

    To check that the Media Management AMPs have installed correctly, add a video or image to Share, open the file and check that you can see that the media loading and a Renditions Panel is available.

## Uninstalling Media Management

To uninstall Media Management, you need to use the Module Management Tool (MMT) and reinstate certain files.

1. Stop the Alfresco Content Services server.

2. Use the topic, [Uninstall an AMP file](LINK), to uninstall the module.

3. If you have used a Media Management content model like IPTC or PBCore, you must clean out your database before restarting Alfresco. See [Step 8 of Deleting a content model](LINK) for more information.

4. Restart the Alfresco server.
