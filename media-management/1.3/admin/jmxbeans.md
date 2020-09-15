---
title: JMX beans for Media Management
---

JMX values (Managed Bean or MBean attributes) are exposed in the Alfresco Admin Console, and with internal tools (Alfresco JMX Dump) or external tools like JConsole. The Media Management beans are described here with their default values.

The default values given are the defaults for an installer-installed instance of Alfresco on Windows. These values can differ if you are using a different install method or operating system.

>**Note:** Be aware that any changes you make to attributes in the live system are written to the database. The next time that Alfresco starts, these values will take precedence over any values specified in properties files, for example, `alfresco-global.properties`.

## Alfresco:Type=Configuration, Category=Transformers, Object Type=Transformers$default**

|Attribute name|Example value|
|--------------|-------------|
|content.transformer.AwsElasticTranscoder.mimetypes.video/*.video/mp4.priority|`110`|
|content.transformer.Ffmpeg.extensions.*.3g2.supported|`false`|
|content.transformer.Ffmpeg.extensions.*.3gp.supported|`false`|
|content.transformer.Ffmpeg.extensions.*.gif.supported|`false`|
|content.transformer.Ffmpeg.extensions.*.jp2.supported|`false`|
|content.transformer.Ffmpeg.extensions.*.ras.supported|`false`|
|content.transformer.Ffmpeg.extensions.*.xbm.supported|`false`|
|content.transformer.Ffmpeg.extensions.*.xwd.supported|`false`|
|content.transformer.Ffmpeg.extensions.3g2.*.supported|`false`|
|content.transformer.Ffmpeg.extensions.3gp.*.supported|`false`|
|content.transformer.Ffmpeg.mimetypes.application/mxf.image/*.supported|`false`|
|content.transformer.Ffmpeg.mimetypes.application/mxf.video/*.supported|`false`|
|content.transformer.Ffmpeg.mimetypes.audio/*.video/*.supported|`false`|
|content.transformer.Ffmpeg.mimetypes.video/*.image/*.priority|`50`|
|content.transformer.Ffmpeg.mimetypes.video/*.video/*.priority|`150`|
|content.transformer.RemoteImage.mimetypes.application/pdf.image/*.supported|`false`|
|content.transformer.RemoteImage.mimetypes.image/*.image/*.supported|`false`|
|content.transformer.RemoteImage.mimetypes.image/bmp.image/*.priority|`150`|
|content.transformer.RemoteImage.mimetypes.image/gif.image/*.priority|`150`|
|content.transformer.RemoteImage.mimetypes.image/jpeg.image/*.priority|`150`|
|content.transformer.RemoteImage.mimetypes.image/png.image/*.priority|`150`|
|content.transformer.RemoteImage.mimetypes.image/x-raw-*.image/*.priority|`50`|
|content.transformer.RemoteVideo.mimetypes.application/*.*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.application/mxf.image/*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.application/mxf.video/*.priority|`100`|
|content.transformer.RemoteVideo.mimetypes.application/mxf.video/*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.audio/*.video/*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.image/*.*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.text/*.*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.video/*.application/*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.video/*.audio/*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.video/*.image/*.priority|`150`|
|content.transformer.RemoteVideo.mimetypes.video/*.image/*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.video/*.text/*.supported|`false`|
|content.transformer.RemoteVideo.mimetypes.video/*.video/*.priority|`50`|
|content.transformer.RemoteVideo.mimetypes.video/*.video/*.supported|`false`|
|content.transformer.strict.mimetype.check|`true`|
|transformer.strict.mimetype.check.whitelist.mimetypes|`application/eps;application/postscript;application/illustrator;application/pdf;application/x-tar;application/x-gtar;application/acp;application/zip;application/vnd.stardivision.math;application/x-tika-msoffice;image/x-raw-adobe;image/tiff`|
|content.transformer.Zencoder.mimetypes.video/*.video/*.priority|`100`|

For the complete list of Alfresco MBeans, see [JMX bean categories reference](LINK).
