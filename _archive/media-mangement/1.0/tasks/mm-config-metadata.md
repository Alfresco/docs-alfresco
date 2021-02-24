---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring custom XMP metadata extraction

You can map custom XMP \(Extensible Metadata Platform\) metadata fields to custom Alfresco data model properties using alfresco-global.properties.

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information.

1.  Stop the Alfresco server.

2.  Edit your alfresco-global.properties file to specify your custom metadata properties; for example:

    ```
    metadata.extracter.TikaExifTool.extract.namespace.prefix.cm=http://www.alfresco.org/model/content/1.0
    metadata.extracter.TikaExifTool.extract.namespace.prefix.custom=http://example.com/model/custom/1.0
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Text=custom:text
    # Force multi-line parsing with []
    metadata.extracter.TikaExifTool.extract.XMP-custom\:TextML[]=custom:textMultiLine
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Date=custom:date
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Integer=custom:integer
    metadata.extracter.TikaExifTool.extract.XMP-custom\:ClosedChoice=custom:closedChoice
    metadata.extracter.TikaExifTool.extract.XMP-custom\:OpenChoice=custom:openChoice
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Boolean=custom:boolean
    ```

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configuring Media Management](mm-props-config.md) for the full list.

    The `metadata.extracter.TikaExifTool.extract.XMP-custom\:Text` attribute specifies simple text fields. The `metadata.extracter.TikaExifTool.extract.XMP-custom\:TextML[]` attribute specifies multi-line text fields for metadata extraction.

3.  Start your Alfresco server to apply the changes.


**Parent topic:**[Configuring Media Management](../tasks/mm-props-config.md)

