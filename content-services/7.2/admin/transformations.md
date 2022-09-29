---
title: Manage transformations
---

When you're working with transformations, it is important to understand how file types map to one another and the transformation formats that each file type supports.

For more information about T-Engines and custom transformations and renditions see [extension point]({% link content-services/7.2/develop/repo-ext-points/content-transformers-renditions.md %}).

Transformations can cause `OutOfMemory` errors under certain conditions; for example, if you're using Excel (`.xlsx`) files that contain shapes or drawings (.xml content).

## Standard transform options {#standard}

There are many file types (also known as MIME types) available in Content Services and it's not always possible to transform one file type to another.

Most images can be transformed to most other image types, but you can never transform audio or video files. The tables give details of registered file types with information about their available transform options.

If you've installed a transform tool, such as Alfresco Outlook Integration, or Document Transformation Engine, or Alfresco Media Management, there are additional transform options, which are listed in [Additional transform options](#additional).

You can also view more information about file types and the proxies used to transform them by using the browser command:

```http
http://localhost:8080/alfresco/service/mimetypes?mimetype=*
```

where `localhost:8080` is the host and port number of your active Content Services instance.

The transformers must validate the content stream mimetype. To configure this, set the following properties in the `alfresco-global.properties` file.

|Property name|Description|
|-------------|-----------|
|content.transformer.retryOn.different.mimetype|Enables retrying of a failed transaction if the Apache Tika derived mimetype for the content is not the same as the declared mimetype. It is set to `true` by default.|
|content.transformer.strict.mimetype.check|Enables or disables a check of the mimetype before the transformation takes place. If `true`, the `content.transformer.retryOn.different.mimetype` property is ignored. It is set to `true` by default.|
|transformer.strict.mimetype.check.whitelist.mimetypes|Specifies the pair of detected and declared mimetypes (separated by semicolons) that are allowed. For example: `transformer.strict.mimetype.check.whitelist.mimetypes=application/eps; application/postscript; application/illustrator; application/pdf;application/x-tar; application/x-gtar; application/acp; application/zip; application/vnd.stardivision.math; application/x-tika-msoffice`.<br><br>**Note:** These should be written without spaces in-between the pairs.|

**application/acp and application/dita+xml - acp, dita**

These formats can't be transformed into, or generated from, any other format.

**application/eps - eps**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/illustrator|No|Yes|
|application/msword|No|Yes|
|application/pdf|No|Yes|
|application/rtf|No|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|No|Yes|
|application/vnd.oasis.opendocument.text-template|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|No|Yes|
|application/vnd.sun.xml.writer.template|No|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|image/bmp|Yes|Yes|
|image/cgm|Yes|Yes|
|image/gif|Yes|Yes|
|image/ief|Yes|Yes|
|image/jp2|Yes|Yes|
|image/jpeg|Yes|Yes|
|image/png|Yes|Yes|
|image/tiff|Yes|Yes|
|image/vnd.adobe.photoshop|Yes|Yes|
|image/vnd.adobe.premiere|Yes|Yes|
|image/x-cmu-raster|Yes|Yes|
|image/x-dwt|Yes|Yes|
|image/x-portable-anymap|Yes|Yes|
|image/x-portable-bitmap|Yes|Yes|
|image/x-portable-graymap|Yes|Yes|
|image/x-portable-pixmap|Yes|Yes|
|image/x-raw-adobe|Yes|Yes|
|image/x-raw-canon|Yes|Yes|
|image/x-raw-fuji|Yes|Yes|
|image/x-raw-hasselblad|Yes|Yes|
|image/x-raw-kodak|Yes|Yes|
|image/x-raw-leica|Yes|Yes|
|image/x-raw-minolta|Yes|Yes|
|image/x-raw-nikon|Yes|Yes|
|image/x-raw-olympus|Yes|Yes|
|image/x-raw-panasonic|Yes|Yes|
|image/x-raw-pentax|Yes|Yes|
|image/x-raw-red|Yes|Yes|
|image/x-raw-sigma|Yes|Yes|
|image/x-raw-sony|Yes|Yes|
|image/x-xbitmap|Yes|Yes|
|image/x-xpixmap|Yes|Yes|
|image/x-xwindowdump|Yes|Yes|
|text/csv|No|Yes|
|text/html|No|Yes|
|text/plain|No|Yes|
|text/xml|No|Yes|

**application/framemaker - fm**

This format can't be transformed into, or generated from, any other format.

**application/illustrator - ai**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
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

**application/java, application/json and application/mac-binhex40 - class, json, hqx**

These formats can't be transformed into, or generated from, any other format.

**application/java-archive - jar**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/xhtml+xml|Yes|
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/msword - doc**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/rtf|Yes|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.text|Yes|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.writer|Yes|Yes|
|application/vnd.sun.xml.writer.template|Yes|Yes|
|application/wordperfect|No|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/xml|Yes|No|

**application/octet-stream and application/oda - bin, oda**

These formats can't be transformed into, or generated from, any other format.

**application/ogg - ogx**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/xhtml+xml|Yes|
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/pagemaker - pmd**

This format can't be transformed into, or generated from, any other format.

**application/pdf - pdf**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/msword|No|Yes|
|application/rtf|No|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|No|Yes|
|application/vnd.oasis.opendocument.text-template|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|No|Yes|
|application/vnd.sun.xml.writer.template|No|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|Yes|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/csv|No|Yes|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/xml|Yes|Yes|

**application/postscript and application/remote-printing - ps, prn**

These formats can't be transformed into, or generated from, any other format.

**application/rss+xml - rss**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/xhtml+xml|Yes|
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/rtf - rtf**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/msword|Yes|Yes|
|application/pdf|Yes|No|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.text|Yes|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.writer|Yes|Yes|
|application/vnd.sun.xml.writer.template|Yes|Yes|
|application/wordperfect|No|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/xml|Yes|No|

**application/sgml, application/vnd.adobe.aftereffects.project, application/vnd.adobe.aftereffects.template, application/vnd.adobe.air-application-installer-package+zip, application/vnd.adobe.xdp+xml and application/vnd.android.package-archive - gml, aep, aet, air, xdp, apk**

These formats can't be transformed into, or generated from, any other format.

**application/vnd.apple.keynote, application/vnd.apple.numbers and application/vnd.apple.pages - key, numbers, pages**

> **Note:** These formats can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.ms-excel - xls**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|Yes|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.sun.xml.calc|Yes|Yes|
|application/vnd.sun.xml.calc.template|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/csv|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.ms-excel.addin.macroenabled.12 - xlam**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.ms-excel.sheet.binary.macroenabled.12, application/vnd.ms-excel.sheet.macroenabled.12, application/vnd.ms-excel.template.macroenabled.12 and application/vnd.openxmlformats-officedocument.spreadsheetml.template - xlsb, xlsm, xltm, xltx**

> **Note:** These formats can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/vnd.ms-excel|Yes|
|application/vnd.oasis.opendocument.spreadsheet|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|Yes|
|application/vnd.sun.xml.calc|Yes|
|application/vnd.sun.xml.calc.template|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.ms-outlook - msg**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/msword|Yes|
|application/pdf|Yes|
|application/rtf|Yes|
|application/vnd.oasis.opendocument.text|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|
|application/vnd.sun.xml.writer|Yes|
|application/vnd.sun.xml.writer.template|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.ms-powerpoint - ppt**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.sun.xml.impress|Yes|Yes|
|application/vnd.sun.xml.impress.template|Yes|Yes|
|application/vnd.visio|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.ms-powerpoint.addin.macroenabled.12, application/vnd.ms-powerpoint.presentation.macroenabled.12 and application/vnd.ms-powerpoint.template.macroenabled.12 - ppam, pptm, potm**

> **Note:** These formats can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/vnd.ms-powerpoint|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|
|application/vnd.sun.xml.impress|Yes|
|application/vnd.sun.xml.impress.template|Yes|
|application/vnd.visio|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.ms-powerpoint.slide.macroenabled.12 - sldm**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/vnd.ms-powerpoint|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|
|application/vnd.sun.xml.impress|Yes|
|application/vnd.sun.xml.impress.template|Yes|
|application/vnd.visio|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/xml|Yes|

**application/vnd.ms-powerpoint.slideshow.macroenabled.12 - ppsm**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.ms-project - mpp**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/xhtml+xml|Yes|
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.ms-word.document.macroenabled.12, application/vnd.ms-word.template.macroenabled.12, application/vnd.openxmlformats-officedocument.wordprocessingml.document and application/vnd.openxmlformats-officedocument.wordprocessingml.template - docm, dotm, docx, dotx**

> **Note:** These formats can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/msword|Yes|
|application/pdf|Yes|
|application/rtf|Yes|
|application/vnd.oasis.opendocument.text|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|
|application/vnd.sun.xml.writer|Yes|
|application/vnd.sun.xml.writer.template|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.oasis.opendocument.chart, application/vnd.oasis.opendocument.image, application/vnd.oasis.opendocument.text-master and application/vnd.oasis.opendocument.text-web - odc, odi, odm, oth**

> **Note:** These formats can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/xhtml+xml|Yes|
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.oasis.opendocument.database, application/vnd.oasis.opendocument.formula and application/vnd.oasis.opendocument.graphics-template - odb, odf, otg**

These formats can't be transformed into, or generated from, any other format.

**application/vnd.oasis.opendocument.graphics - odg**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-powerpoint|Yes|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.sun.xml.impress|Yes|Yes|
|application/vnd.sun.xml.impress.template|Yes|Yes|
|application/vnd.visio|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.oasis.opendocument.presentation - odp**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-powerpoint|Yes|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.sun.xml.impress|Yes|Yes|
|application/vnd.sun.xml.impress.template|Yes|Yes|
|application/vnd.visio|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.oasis.opendocument.presentation-template - otp**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-powerpoint|Yes|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.sun.xml.impress|Yes|Yes|
|application/vnd.sun.xml.impress.template|Yes|Yes|
|application/vnd.visio|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.oasis.opendocument.spreadsheet - ods**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-excel|Yes|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.sun.xml.calc|Yes|Yes|
|application/vnd.sun.xml.calc.template|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.oasis.opendocument.spreadsheet-template - ots**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-excel|Yes|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|Yes|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.sun.xml.calc|Yes|Yes|
|application/vnd.sun.xml.calc.template|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.oasis.opendocument.text - odt**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/msword|Yes|Yes|
|application/pdf|Yes|No|
|application/rtf|Yes|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.writer|Yes|Yes|
|application/vnd.sun.xml.writer.template|Yes|Yes|
|application/wordperfect|No|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/xml|Yes|No|

**application/vnd.oasis.opendocument.text-template - ott**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/msword|Yes|Yes|
|application/pdf|Yes|No|
|application/rtf|Yes|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.text|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.writer|Yes|Yes|
|application/vnd.sun.xml.writer.template|Yes|Yes|
|application/wordperfect|No|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/xml|Yes|No|

**application/vnd.openxmlformats-officedocument.presentationml.presentation - pptx**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/vnd.ms-powerpoint|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|
|application/vnd.sun.xml.impress|Yes|
|application/vnd.sun.xml.impress.template|Yes|
|application/vnd.visio|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.openxmlformats-officedocument.presentationml.slide - sldx**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/vnd.ms-powerpoint|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|
|application/vnd.sun.xml.impress|Yes|
|application/vnd.sun.xml.impress.template|Yes|
|application/vnd.visio|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/xml|Yes|

**application/vnd.openxmlformats-officedocument.presentationml.slideshow - ppsx**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.openxmlformats-officedocument.presentationml.template - potx**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/vnd.ms-powerpoint|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|
|application/vnd.sun.xml.impress|Yes|
|application/vnd.sun.xml.impress.template|Yes|
|application/vnd.visio|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.openxmlformats-officedocument.spreadsheetml.sheet - xlsx**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/pdf|Yes|
|application/vnd.ms-excel|Yes|
|application/vnd.oasis.opendocument.spreadsheet|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|Yes|
|application/vnd.sun.xml.calc|Yes|
|application/vnd.sun.xml.calc.template|Yes|
|application/xhtml+xml|Yes|
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
|text/csv|Yes|
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/vnd.stardivision.calc, application/vnd.stardivision.chart, application/vnd.stardivision.draw, application/vnd.stardivision.impress, application/vnd.stardivision.impress-packed, application/vnd.stardivision.math, application/vnd.stardivision.writer, application/vnd.stardivision.writer-global - sdc, sds, sda, sdd, sdp, smf, sdw, sgl**

These formats can't be transformed into, or generated from, any other format.

**application/vnd.sun.xml.calc - sxc**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-excel|Yes|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|Yes|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.sun.xml.calc.template|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.sun.xml.calc.template - stc**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-excel|Yes|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|Yes|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.sun.xml.calc|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.sun.xml.draw - sxd**

This format can't be transformed into, or generated from, any other format.

**application/vnd.sun.xml.impress - sxi**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-powerpoint|Yes|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.sun.xml.impress.template|Yes|Yes|
|application/vnd.visio|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.sun.xml.impress.template - sti**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-powerpoint|Yes|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.sun.xml.impress|Yes|Yes|
|application/vnd.visio|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/vnd.sun.xml.writer - sxw**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/msword|Yes|Yes|
|application/pdf|Yes|No|
|application/rtf|Yes|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.text|Yes|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.writer.template|Yes|Yes|
|application/wordperfect|No|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/xml|Yes|No|

**application/vnd.sun.xml.writer.template - stw**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/msword|Yes|Yes|
|application/pdf|Yes|No|
|application/rtf|Yes|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.text|Yes|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.writer|Yes|Yes|
|application/wordperfect|No|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/xml|Yes|No|

**application/vnd.visio - vsd**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-powerpoint|Yes|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|Yes|Yes|
|application/vnd.oasis.opendocument.presentation|Yes|Yes|
|application/vnd.oasis.opendocument.presentation-template|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.sun.xml.impress|Yes|Yes|
|application/vnd.sun.xml.impress.template|Yes|Yes|
|application/xhtml+xml|Yes|No|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|No|
|text/plain|Yes|No|
|text/xml|Yes|No|

**application/wordperfect - wpd**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/eps|Yes|
|application/msword|Yes|
|application/pdf|Yes|
|application/rtf|Yes|
|application/vnd.oasis.opendocument.text|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|
|application/vnd.sun.xml.writer|Yes|
|application/vnd.sun.xml.writer.template|Yes|
|application/xhtml+xml|Yes|
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
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/x-bcpio, application/x-compress, application/x-csh, application/x-dosexec, application/x-dvi, application/x-fla, application/x-gtar, application/x-indesign, application/x-latex, application/x-mif, application/x-rar-compressed, application/x-sh, application/x-shar, application/x-shockwave-flash, application/x-sv4cpio, application/x-sv4crc, application/x-tcl, application/x-tex, application/x-texinfo, application/x-troff, application/x-troff-man, application/x-troff-me, application/x-troff-mes, application/x-ustar, application/x-wais-source, application/x-x509-ca-cert and application/x-zip - bcpio, z, csh, exe, dvi, fla, gtar, indd, latex, mif, rar, sh, shar, swf, sv4cpio, sv4crc, tcl, tex, texinfo, tr, man, me, ms, ustar, src, cer, fxp**

These formats can't be transformed into, or generated from, any other format.

**application/x-cpio, application/x-gzip, application/x-hdf, application/x-netcdf, application/x-tar, application/zip and text/x-java-source - cpio, gzip, hdf, cdf, tar, zip, java**

> **Note:** These formats can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|application/xhtml+xml|Yes|
|text/html|Yes|
|text/plain|Yes|
|text/xml|Yes|

**application/x-javascript - js**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|text/plain|Yes|

**application/xhtml+xml - xhtml**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/java-archive|No|Yes|
|application/msword|No|Yes|
|application/ogg|No|Yes|
|application/pdf|No|Yes|
|application/rss+xml|No|Yes|
|application/rtf|No|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-project|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.chart|No|Yes|
|application/vnd.oasis.opendocument.graphics|No|Yes|
|application/vnd.oasis.opendocument.image|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|No|Yes|
|application/vnd.oasis.opendocument.text-master|No|Yes|
|application/vnd.oasis.opendocument.text-template|No|Yes|
|application/vnd.oasis.opendocument.text-web|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|No|Yes|
|application/vnd.sun.xml.writer.template|No|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|application/x-cpio|No|Yes|
|application/x-gzip|No|Yes|
|application/x-hdf|No|Yes|
|application/x-netcdf|No|Yes|
|application/x-tar|No|Yes|
|application/zip|No|Yes|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/x-java-source|No|Yes|
|text/xml|Yes|Yes|

**audio/basic, audio/mp4, audio/mpeg, audio/ogg, audio/vnd.adobe.soundbooth, audio/vorbis, audio/x-aiff, audio/x-flac, audio/x-ms-wma, audio/x-wav - au, m4a, mp3, oga, asnd, ogg, aiff, flac, wma, wav**

These formats can't be transformed into, or generated from, any other format.

**image/tiff - tiff**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|Yes|
|application/illustrator|No|Yes|
|application/msword|No|Yes|
|application/pdf|Yes|Yes|
|application/rtf|No|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|No|Yes|
|application/vnd.oasis.opendocument.text-template|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|No|Yes|
|application/vnd.sun.xml.writer.template|No|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|image/bmp|Yes|No|
|image/cgm|Yes|Yes|
|image/gif|Yes|Yes|
|image/ief|Yes|Yes|
|image/jp2|Yes|Yes|
|image/jpeg|Yes|Yes|
|image/png|Yes|Yes|
|image/tiff|Yes|Yes|
|image/vnd.adobe.photoshop|Yes|Yes|
|image/vnd.adobe.premiere|Yes|Yes|
|image/x-cmu-raster|Yes|Yes|
|image/x-dwt|Yes|Yes|
|image/x-portable-anymap|Yes|Yes|
|image/x-portable-bitmap|Yes|Yes|
|image/x-portable-graymap|Yes|Yes|
|image/x-portable-pixmap|Yes|Yes|
|image/x-raw-adobe|Yes|Yes|
|image/x-raw-canon|Yes|Yes|
|image/x-raw-fuji|Yes|Yes|
|image/x-raw-hasselblad|Yes|Yes|
|image/x-raw-kodak|Yes|Yes|
|image/x-raw-leica|Yes|Yes|
|image/x-raw-minolta|Yes|Yes|
|image/x-raw-nikon|Yes|Yes|
|image/x-raw-olympus|Yes|Yes|
|image/x-raw-panasonic|Yes|Yes|
|image/x-raw-pentax|Yes|Yes|
|image/x-raw-red|Yes|Yes|
|image/x-raw-sigma|Yes|Yes|
|image/x-raw-sony|Yes|Yes|
|image/x-xbitmap|Yes|Yes|
|image/x-xpixmap|Yes|Yes|
|image/x-xwindowdump|Yes|Yes|
|text/csv|No|Yes|
|text/html|No|Yes|
|text/plain|No|Yes|
|text/xml|No|Yes|

**image/bmp, image/cgm, image/gif, image/ief, image/jp2, image/jpeg, image/png, image/tiff, image/vnd.adobe.photoshop, image/vnd.adobe.premiere, image/x-cmu-raster, image/x-dwt, image/x-portable-anymap, image/x-portable-bitmap, image/x-portable-graymap and image/x-portable-pixmap - bmp, cgm, gif, ief, jp2, jpg, png, tiff, psd, ppj, ras, dwt, pnm, pbm, pgm, ppm**

All image types are transformable into and from the following formats, excepting themselves (i.e. `image/bmp` is not transformable into `image/bmp`, or from `image/bmp`).

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|Yes|
|application/illustrator|No|Yes|
|application/msword|No|Yes|
|application/pdf|No|Yes|
|application/rtf|No|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|No|Yes|
|application/vnd.oasis.opendocument.text-template|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|No|Yes|
|application/vnd.sun.xml.writer.template|No|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|image/bmp|Yes|Yes|
|image/cgm|Yes|Yes|
|image/gif|Yes|Yes|
|image/ief|Yes|Yes|
|image/jp2|Yes|Yes|
|image/jpeg|Yes|Yes|
|image/png|Yes|Yes|
|image/tiff|Yes|Yes|
|image/vnd.adobe.photoshop|Yes|Yes|
|image/vnd.adobe.premiere|Yes|Yes|
|image/x-cmu-raster|Yes|Yes|
|image/x-dwt|Yes|Yes|
|image/x-portable-anymap|Yes|Yes|
|image/x-portable-bitmap|Yes|Yes|
|image/x-portable-graymap|Yes|Yes|
|image/x-portable-pixmap|Yes|Yes|
|image/x-raw-adobe|Yes|Yes|
|image/x-raw-canon|Yes|Yes|
|image/x-raw-fuji|Yes|Yes|
|image/x-raw-hasselblad|Yes|Yes|
|image/x-raw-kodak|Yes|Yes|
|image/x-raw-leica|Yes|Yes|
|image/x-raw-minolta|Yes|Yes|
|image/x-raw-nikon|Yes|Yes|
|image/x-raw-olympus|Yes|Yes|
|image/x-raw-panasonic|Yes|Yes|
|image/x-raw-pentax|Yes|Yes|
|image/x-raw-red|Yes|Yes|
|image/x-raw-sigma|Yes|Yes|
|image/x-raw-sony|Yes|Yes|
|image/x-xbitmap|Yes|Yes|
|image/x-xpixmap|Yes|Yes|
|image/x-xwindowdump|Yes|Yes|
|text/csv|No|Yes|
|text/html|No|Yes|
|text/plain|No|Yes|
|text/xml|No|Yes|

**image/svg+xml, image/vnd.dwg, image/x-rgb - svg, dwg, rgb**

These formats can't be transformed into, or generated from, any other format.

**image/x-raw-adobe, image/x-raw-canon, image/x-raw-fuji, image/x-raw-hasselblad, image/x-raw-kodak, image/x-raw-leica, image/x-raw-minolta, image/x-raw-nikon, image/x-raw-olympus, image/x-raw-panasonic, image/x-raw-pentax, image/x-raw-red, image/x-raw-sigma, image/x-raw-sony, image/x-xbitmap, image/x-xpixmap and image/x-xwindowdump - dng, cr2, raf, 3fr, k25, rwl, mrw, nef, orf, rw2, pef, r3d, x3f, arw, xbm, xpm, xwd**

All image types are transformable into and from the following formats, excepting themselves (i.e. `image/x-raw-adobe` is not transformable into `image/x-raw-adobe`).

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|Yes|
|application/illustrator|No|Yes|
|application/msword|No|Yes|
|application/pdf|No|Yes|
|application/rtf|No|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.graphics|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|No|Yes|
|application/vnd.oasis.opendocument.text-template|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|No|Yes|
|application/vnd.sun.xml.writer.template|No|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|image/bmp|Yes|Yes|
|image/cgm|Yes|Yes|
|image/gif|Yes|Yes|
|image/ief|Yes|Yes|
|image/jp2|Yes|Yes|
|image/jpeg|Yes|Yes|
|image/png|Yes|Yes|
|image/tiff|Yes|Yes|
|image/vnd.adobe.photoshop|Yes|Yes|
|image/vnd.adobe.premiere|Yes|Yes|
|image/x-cmu-raster|Yes|Yes|
|image/x-dwt|Yes|Yes|
|image/x-portable-anymap|Yes|Yes|
|image/x-portable-bitmap|Yes|Yes|
|image/x-portable-graymap|Yes|Yes|
|image/x-portable-pixmap|Yes|Yes|
|image/x-raw-adobe|Yes|Yes|
|image/x-raw-canon|Yes|Yes|
|image/x-raw-fuji|Yes|Yes|
|image/x-raw-hasselblad|Yes|Yes|
|image/x-raw-kodak|Yes|Yes|
|image/x-raw-leica|Yes|Yes|
|image/x-raw-minolta|Yes|Yes|
|image/x-raw-nikon|Yes|Yes|
|image/x-raw-olympus|Yes|Yes|
|image/x-raw-panasonic|Yes|Yes|
|image/x-raw-pentax|Yes|Yes|
|image/x-raw-red|Yes|Yes|
|image/x-raw-sigma|Yes|Yes|
|image/x-raw-sony|Yes|Yes|
|image/x-xbitmap|Yes|Yes|
|image/x-xpixmap|Yes|Yes|
|image/x-xwindowdump|Yes|Yes|
|text/csv|No|Yes|
|text/html|No|Yes|
|text/plain|No|Yes|
|text/xml|No|Yes|

**message/rfc822, text/calendar, text/css, text/richtext, text/sgml, text/tab-separated-values, text/x-markdown, text/x-setext and text/x-jsp - eml, ics, css, rtx, sgml, tsv, md, etx, jsp**

> **Note:** These formats can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|text/plain|Yes|

**text/csv - csv**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/pdf|Yes|No|
|application/vnd.ms-excel|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/plain|Yes|No|

**text/html - html**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/java-archive|No|Yes|
|application/msword|Yes|Yes|
|application/ogg|No|Yes|
|application/pdf|Yes|Yes|
|application/rss+xml|No|Yes|
|application/rtf|Yes|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-project|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.chart|No|Yes|
|application/vnd.oasis.opendocument.graphics|No|Yes|
|application/vnd.oasis.opendocument.image|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|Yes|Yes|
|application/vnd.oasis.opendocument.text-master|No|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|Yes|
|application/vnd.oasis.opendocument.text-web|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|Yes|Yes|
|application/vnd.sun.xml.writer.template|Yes|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|application/x-cpio|No|Yes|
|application/x-gzip|No|Yes|
|application/x-hdf|No|Yes|
|application/x-netcdf|No|Yes|
|application/x-tar|No|Yes|
|application/xhtml+xml|Yes|Yes|
|application/zip|No|Yes|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/mediawiki|No|Yes|
|text/plain|Yes|Yes|
|text/x-java-source|No|Yes|
|text/xml|Yes|Yes|

**text/mediawiki - mw**

> **Note:** This format can't be generated from any other format.

|Format|Transformable to:|
|------|-----------------|
|text/html|Yes|
|text/plain|Yes|

**text/plain - txt**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/java-archive|No|Yes|
|application/msword|Yes|Yes|
|application/ogg|No|Yes|
|application/pdf|Yes|Yes|
|application/rss+xml|No|Yes|
|application/rtf|Yes|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-project|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.chart|No|Yes|
|application/vnd.oasis.opendocument.graphics|No|Yes|
|application/vnd.oasis.opendocument.image|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|Yes|Yes|
|application/vnd.oasis.opendocument.text-master|No|Yes|
|application/vnd.oasis.opendocument.text-template|Yes|Yes|
|application/vnd.oasis.opendocument.text-web|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|Yes|Yes|
|application/vnd.sun.xml.writer.template|Yes|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|application/x-cpio|No|Yes|
|application/x-gzip|No|Yes|
|application/x-hdf|No|Yes|
|application/x-javascript|No|Yes|
|application/x-netcdf|No|Yes|
|application/x-tar|No|Yes|
|application/xhtml+xml|Yes|Yes|
|application/zip|No|Yes|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|message/rfc822|No|Yes|
|text/calendar|No|Yes|
|text/css|No|Yes|
|text/csv|No|Yes|
|text/html|Yes|Yes|
|text/mediawiki|No|Yes|
|text/richtext|No|Yes|
|text/sgml|No|Yes|
|text/tab-separated-values|No|Yes|
|text/x-java-source|No|Yes|
|text/x-jsp|No|Yes|
|text/x-markdown|No|Yes|
|text/x-setext|No|Yes|
|text/xml|Yes|Yes|

**text/xml - xml**

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|Yes|No|
|application/java-archive|No|Yes|
|application/msword|No|Yes|
|application/ogg|No|Yes|
|application/pdf|Yes|Yes|
|application/rss+xml|No|Yes|
|application/rtf|No|Yes|
|application/vnd.apple.keynote|No|Yes|
|application/vnd.apple.numbers|No|Yes|
|application/vnd.apple.pages|No|Yes|
|application/vnd.ms-excel|No|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|No|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|No|Yes|
|application/vnd.ms-excel.template.macroenabled.12|No|Yes|
|application/vnd.ms-outlook|No|Yes|
|application/vnd.ms-powerpoint|No|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|No|Yes|
|application/vnd.ms-project|No|Yes|
|application/vnd.ms-word.document.macroenabled.12|No|Yes|
|application/vnd.ms-word.template.macroenabled.12|No|Yes|
|application/vnd.oasis.opendocument.chart|No|Yes|
|application/vnd.oasis.opendocument.graphics| | |
|application/vnd.oasis.opendocument.image|No|Yes|
|application/vnd.oasis.opendocument.presentation|No|Yes|
|application/vnd.oasis.opendocument.presentation-template|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet|No|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|No|Yes|
|application/vnd.oasis.opendocument.text|No|Yes|
|application/vnd.oasis.opendocument.text-master|No|Yes|
|application/vnd.oasis.opendocument.text-template|No|Yes|
|application/vnd.oasis.opendocument.text-web|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|No|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|No|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|No|Yes|
|application/vnd.sun.xml.calc|No|Yes|
|application/vnd.sun.xml.calc.template|No|Yes|
|application/vnd.sun.xml.impress|No|Yes|
|application/vnd.sun.xml.impress.template|No|Yes|
|application/vnd.sun.xml.writer|No|Yes|
|application/vnd.sun.xml.writer.template|No|Yes|
|application/vnd.visio|No|Yes|
|application/wordperfect|No|Yes|
|application/x-cpio|No|Yes|
|application/x-gzip|No|Yes|
|application/x-hdf|No|Yes|
|application/x-netcdf|No|Yes|
|application/x-tar|No|Yes|
|application/xhtml+xml|Yes|Yes|
|application/zip|No|Yes|
|image/bmp|Yes|No|
|image/cgm|Yes|No|
|image/gif|Yes|No|
|image/ief|Yes|No|
|image/jp2|Yes|No|
|image/jpeg|Yes|No|
|image/png|Yes|No|
|image/tiff|Yes|No|
|image/vnd.adobe.photoshop|Yes|No|
|image/vnd.adobe.premiere|Yes|No|
|image/x-cmu-raster|Yes|No|
|image/x-dwt|Yes|No|
|image/x-portable-anymap|Yes|No|
|image/x-portable-bitmap|Yes|No|
|image/x-portable-graymap|Yes|No|
|image/x-portable-pixmap|Yes|No|
|image/x-raw-adobe|Yes|No|
|image/x-raw-canon|Yes|No|
|image/x-raw-fuji|Yes|No|
|image/x-raw-hasselblad|Yes|No|
|image/x-raw-kodak|Yes|No|
|image/x-raw-leica|Yes|No|
|image/x-raw-minolta|Yes|No|
|image/x-raw-nikon|Yes|No|
|image/x-raw-olympus|Yes|No|
|image/x-raw-panasonic|Yes|No|
|image/x-raw-pentax|Yes|No|
|image/x-raw-red|Yes|No|
|image/x-raw-sigma|Yes|No|
|image/x-raw-sony|Yes|No|
|image/x-xbitmap|Yes|No|
|image/x-xpixmap|Yes|No|
|image/x-xwindowdump|Yes|No|
|text/html|Yes|Yes|
|text/plain|Yes|Yes|
|text/x-java-source|No|Yes|

**video/3gpp, video/3gpp2, video/mp2t, video/mp4, video/mpeg, video/mpeg2, video/ogg, video/quicktime, video/webm, video/x-flv, video/x-m4v, video/x-ms-asf, video/x-ms-wmv, video/x-msvideo, video/x-rad-screenplay, video/x-sgi-movie, x-world/x-vrml - 3gp, 3g2, ts, mp4, mpg, mpeg2, ogv, mov, webm, flv, m4v, asf, wmv, avi, avx, movie, wrl**

These formats can't be transformed into, or generated from, any other format.

## Additional transform options {#additional}

If you've installed a transformation tool, such as Alfresco Outlook Integration or Document Transformation Engine, there are additional transform options available to you.

The tables give details of registered file types with information about their available transform options. See [Standard transform options](#standard) for all standard transform options.

You can also view more information about file types and the proxies used to transform them by using the browser command:

```http
http://localhost:8080/alfresco/service/mimetypes?mimetype=*
```

where `localhost:8080` is the host and port number of your active Content Services instance.

### Alfresco Outlook Integration

Alfresco Outlook Integration provides two transformers (`com.westernacher.wps.alfresco.transformers.mail.aspose.EML_MSG2PdfTransformer` and `com.westernacher.wps.alfresco.transformers.mail.aspose.EML_MSG2PngTransformer`) to manipulate PDF, image and Outlook email messages. The formats listed are in addition to the standard formats as specified in [Standard transform options](#standard).

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

### Document Transformation Engine

Transformation Engine gives an alternative method of remote transformation for a range of applications including pdf, Word, Excel, PowerPoint and openxmlformats. It also supports a range of image transformations. The formats listed are in addition to the standard formats as specified in [Standard transform options](#standard).

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

### Alfresco Media Management

Alfresco Media Management provides additional options for audio, video and image transformations. The formats are listed in [Alfresco Media Management transform options]({% link media-management/latest/admin/options.md %}).

## File types that support preview and thumbnail generation

Some file type extensions (MIME types) allow thumbnail or preview generation instead of standard icons.

The following table shows the file types that support these capabilities. See [Standard transform options](#standard) for a full listing of formats.

### Formats that support preview and thumbnail generation

|Format|File type extension|Supports preview|Supports thumbnail|
|------|-------------------|----------------|------------------|
|application/eps|eps|No|Yes|
|application/illustrator|ai|Yes|Yes|
|application/msword|doc|Yes|Yes|
|application/pdf|pdf|Yes|Yes|
|application/rtf|rtf|Yes|Yes|
|application/vnd.apple.keynote|key|Yes|Yes|
|application/vnd.apple.numbers|numbers|Yes|Yes|
|application/vnd.apple.pages|pages|Yes|Yes|
|application/vnd.ms-excel|xls|Yes|Yes|
|application/vnd.ms-excel.addin.macroenabled.12|xlam|No|Yes|
|application/vnd.ms-excel.sheet.binary.macroenabled.12|xlsb|Yes|Yes|
|application/vnd.ms-excel.sheet.macroenabled.12|xlsm|Yes|Yes|
|application/vnd.ms-excel.template.macroenabled.12|xltm|Yes|Yes|
|application/vnd.ms-outlook|msg|Yes|Yes|
|application/vnd.ms-powerpoint|ppt|Yes|Yes|
|application/vnd.ms-powerpoint.addin.macroenabled.12|ppam|Yes|Yes|
|application/vnd.ms-powerpoint.presentation.macroenabled.12|pptm|Yes|Yes|
|application/vnd.ms-powerpoint.slide.macroenabled.12|sldm|Yes|Yes|
|application/vnd.ms-powerpoint.slideshow.macroenabled.12|ppsm|No|Yes|
|application/vnd.ms-powerpoint.template.macroenabled.12|potm|Yes|Yes|
|application/vnd.ms-word.document.macroenabled.12|docm|Yes|Yes|
|application/vnd.ms-word.template.macroenabled.12|dotm|Yes|Yes|
|application/vnd.oasis.opendocument.presentation|odp|Yes|Yes|
|application/vnd.oasis.opendocument.presentation-template|otp|Yes|Yes|
|application/vnd.oasis.opendocument.spreadsheet|ods|Yes|Yes|
|application/vnd.oasis.opendocument.spreadsheet-template|ots|Yes|Yes|
|application/vnd.oasis.opendocument.text|odt|Yes|Yes|
|application/vnd.oasis.opendocument.text-template|ott|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.presentation|pptx|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slide|sldx|Yes|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.slideshow|ppsx|No|Yes|
|application/vnd.openxmlformats-officedocument.presentationml.template|potx|Yes|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|xlsx|Yes|Yes|
|application/vnd.openxmlformats-officedocument.spreadsheetml.template|xltx|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.document|docx|Yes|Yes|
|application/vnd.openxmlformats-officedocument.wordprocessingml.template|dotx|Yes|Yes|
|application/vnd.sun.xml.calc|sxc|Yes|Yes|
|application/vnd.sun.xml.calc.template|stc|Yes|Yes|
|application/vnd.sun.xml.impress|sxi|Yes|Yes|
|application/vnd.sun.xml.impress.template|sti|Yes|Yes|
|application/vnd.sun.xml.writer|sxw|Yes|Yes|
|application/vnd.sun.xml.writer.template|stw|Yes|Yes|
|application/vnd.visio|vsd|Yes|Yes|
|application/wordperfect|wpd|Yes|Yes|
|application/x-cpio|cpio|Yes|No|
|application/x-tar|tar|Yes|No|
|application/zip|zip|Yes|Yes|
|image/bmp|bmp|No|Yes|
|image/cgm|cgm|No|Yes|
|image/gif|gif|No|Yes|
|image/ief|ief|No|Yes|
|image/jp2|jp2|No|Yes|
|image/jpeg|jpg|No|Yes|
|image/png|png|No|Yes|
|image/tiff|tiff|Yes|Yes|
|image/vnd.adobe.photoshop|psd|No|Yes|
|image/vnd.adobe.premiere|ppj|No|Yes|
|image/x-cmu-raster|ras|No|Yes|
|image/x-dwt|dwt|No|Yes|
|image/x-portable-anymap|pnm|No|Yes|
|image/x-portable-bitmap|pbm|No|Yes|
|image/x-portable-graymap|pgm|No|Yes|
|image/x-portable-pixmap|ppm|No|Yes|
|image/x-raw-adobe|dng|No|Yes|
|image/x-raw-canon|cr2|No|Yes|
|image/x-raw-fuji|raf|No|Yes|
|image/x-raw-hasselblad|3fr|No|Yes|
|image/x-raw-kodak|k25|No|Yes|
|image/x-raw-leica|rwl|No|Yes|
|image/x-raw-minolta|mrw|No|Yes|
|image/x-raw-nikon|nef|No|Yes|
|image/x-raw-olympus|orf|No|Yes|
|image/x-raw-panasonic|rw2|No|Yes|
|image/x-raw-pentax|pef|No|Yes|
|image/x-raw-red|r3d|No|Yes|
|image/x-raw-sigma|x3f|No|Yes|
|image/x-raw-sony|arw|No|Yes|
|image/x-xbitmap|xbm|No|Yes|
|image/x-xpixmap|xpm|No|Yes|
|image/x-xwindowdump|xwd|No|Yes|
|text/csv|csv|Yes|Yes|
|text/html|html|Yes|Yes|
|text/plain|txt|Yes|Yes|
|text/xml|xml|Yes|Yes|
