---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Transform
---

# Additional transform options

If you have installed a transformation tool, such as Alfresco Outlook Integration or Transformation Server, there are additional transform options available to you.

The tables give details of registered file types with information about their available transform options. See [Standard transform options](valid-transformations.md) for all standard transform options in Alfresco.

You can also view more information about file types and the proxies used to transform them by using the browser command:

```
localhost:8080/alfresco/service/mimetypes?mimetype=\*
```

where `localhost:8080` is the host and port number of your active Alfresco instance.

## Alfresco Outlook Integration

Alfresco Outlook provides two transformers \(com.westernacher.wps.alfresco.transformers.mail.aspose.EML\_MSG2PdfTransformer and com.westernacher.wps.alfresco.transformers.mail.aspose.EML\_MSG2PngTransformer\) to manipulate PDF, image and Outlook email messages. The formats listed are in addition to the standard formats as specified in [Standard transform options](valid-transformations.md).

**application/eps - eps, application/pdf - pdf, image/bmp - bmp, image/cgm - cgm, image/gif - gif, image/ief - ief, image/jp2 - jp2, image/jpeg - jpg, image/png - png, image/tiff - tiff, image/vnd.adobe.photoshop - psd, image/vnd.adobe.premiere - ppj, image/x-cmu-raster - ras, image/x-dwt - dwt, image/x-portable-anymap - pnm, image/x-portable-bitmap - pbm, image/x-portable-graymap - pgm, image/x-portable-pixmap - ppm, image/x-raw-adobe - dng, image/x-raw-canon - cr2, image/x-raw-fuji - raf, image/x-raw-hasselblad - 3fr, image/x-raw-kodak - k25, image/x-raw-leica - rwl, image/x-raw-minolta - mrw, image/x-raw-nikon - nef, image/x-raw-olympus - orf, image/x-raw-panasonic - rw2, image/x-raw-pentax - pef, image/x-raw-red - r3d, image/x-raw-sigma - x3f, image/x-raw-sony - arw, image/x-xbitmap - xbm, image/x-xpixmap - xpm, image/x-xwindowdump - xwd**

|Format|Transformable from:|
|------|-------------------|
|application/vnd.ms-outlook|Yes|
|message/rfc822|Yes|

**application/vnd.ms-outlook - msg and message/rfc822 - eml**

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|image/bmp|Yes|
|image/cgm|Yes|
|image/gif|Yes|
|image/ief|Yes|
|image/jp2|Yes|
|image/jpeg|Yes|
|image/png|Yes|
|image/tiff|Yes|
|image/vnd.adobe.photoshop|Yes|
|image/vnd.adobe.premiere|Yes|
|image/x-cmu-raster|Yes|
|image/x-dwt|Yes|
|image/x-portable-anymap|Yes|
|image/x-portable-bitmap|Yes|
|image/x-portable-graymap|Yes|
|image/x-portable-pixmap|Yes|
|image/x-raw-adobe|Yes|
|image/x-raw-canon|Yes|
|image/x-raw-fuji|Yes|
|image/x-raw-hasselblad|Yes|
|image/x-raw-kodak|Yes|
|image/x-raw-leica|Yes|
|image/x-raw-minolta|Yes|
|image/x-raw-nikon|Yes|
|image/x-raw-olympus|Yes|
|image/x-raw-panasonic|Yes|
|image/x-raw-pentax|Yes|
|image/x-raw-red|Yes|
|image/x-raw-sigma|Yes|
|image/x-raw-sony|Yes|
|image/x-xbitmap|Yes|
|image/x-xpixmap|Yes|
|image/x-xwindowdump|Yes|

## Transformation Server

Transformation Server gives an alternative method of remote transformation for a range of applications including pdf, Word, Excel, Powerpoint and openxmlformats. It also supports a range of image transformations. The formats listed are in addition to the standard formats as specified in [Standard transform options](valid-transformations.md).

**application/pdf - pdf**

|Format|Transformable from:|
|------|-------------------|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|Yes|

**application/vnd.ms-powerpoint.slideshow.macroenabled.12 - ppsm, application/vnd.openxmlformats-officedocument.presentationml.slideshow - ppsx**

|Format|Transformable to:|
|------|-----------------|
|application/pdf|Yes|
|application/x-shockwave-flash|Yes|

## Alfresco Media Management

Alfresco Media Management provides additional options for audio, video and image transformations. The formats are listed in [Media Management transform options](http://docs.alfresco.com/mm/references/mm-additional-transformations.html).

**Parent topic:**[Managing transformations](../concepts/managing-transformations.md)

