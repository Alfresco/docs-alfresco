---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring metadata extraction

Metadata extraction automatically extracts metadata information from inbound and/or updated content and updates the corresponding nodes properties with the metadata values.

Metadata extractors offer server-side extraction of values from added or updated content.

1.  Download the [content-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/content-services-context.xml) file.

2.  Copy the file to <extension\> and save it with the name custom-repository-context.xml.

    This file contains definitions of the default set of extractors.

3.  Declare a new extractor in the <extension\>/custom-repository-context.xml file.

    The following example shows a new extractor written in class com.company.MyExtracter:

    `<bean id="com.company.MyExtracter" class="com.company.MyExtracter" parent="baseMetadataExtracter" />`

4.  Save the file and then restart the Alfresco Content Services server.


**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

