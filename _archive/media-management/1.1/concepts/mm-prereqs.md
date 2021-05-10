---
author: Alfresco Documentation
audience: 
---

# Prerequisites for using Media Management

There are a number of software requirements for using Media Management.

You require one of each of the following components:

**Software requirements**

-   FFmpeg 2.5.4 from the command line for video transformations. See [FFmpeg](http://ffmpeg.org) for information on how to download and use FFmpeg. Make sure that your FFmpeg installation has support for H.264 and AAC codecs. If FFmpeg is not available locally, Media Management functionality is reduced.
-   ExifTool 9.76 from the command line for full IPTC metadata extraction. See [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/) for information about how to download and use ExifTool.
-   Apache ActiveMQ 5.13 or later. This is shipped in the Media Management distribution zip, but you can use an existing instance if required.
-   ImageMagick 6.8.6-6 for image manipulation. See [Installing ImageMagick](http://docs.alfresco.com/5.2/tasks/imagemagick-config.html) for more information about installing ImageMagick.

    **Note:** If you are using RAW image formats, you must install an ImageMagick delegate, for example, UFRaw, to manipulate the images. See [UFRaw](http://ufraw.sourceforge.net/) for more information.

    To preview RAW image formats, you need to set additional configuration properties. See [step 8 of Installing Media Management](../tasks/mm-install.md#step8).


**Note:** FFmpeg and ExifTool are required to view media in Share. See [step 8 of Installing Media Management](../tasks/mm-install.md#step8) for information on how to set these in the alfresco-global.properties file.

**Alfresco requirements**

Alfresco Content Services 5.2.x. See [Alfresco Supported Platforms](https://www.alfresco.com/services/subscription/supported-platforms) for more information.

**Java requirements**

Java 8

**Remote transformation services \(optional\)**

-   Brightcove Zencoder. See [Zencoder](https://zencoder.com/en/) and [Configuring the Zencoder content transformer](../tasks/mm-config-zencoder.md) for more information.
-   AWS Elastic Transcoder. See [AWS](http://aws.amazon.com/elastictranscoder/) and [Configuring the Elastic Transcoder content transformer](../tasks/mm-config-elastic.md) for more information.

**Parent topic:**[Installing and configuring Media Management](../concepts/mm-install-overview.md)

