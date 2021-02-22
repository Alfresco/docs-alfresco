---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Metadata extractors, Document Management]
option: extended services metadata extraction
---

# Configuring metadata extraction

Metadata extraction automatically extracts metadata information from inbound and/or updated content and updates the corresponding nodes properties with the metadata values.

Metadata extractors offer server-side extraction of values from added or updated content. Definitions of the default set of extractors are in the <configRoot\>/alfresco/content-services-context.xml file.

1.  Declare a new extractor in <extension\>/custom-repository-context.xml.

    The following example shows a new extractor written in class com.company.MyExtracter:

    `<bean id="com.company.MyExtracter" class="com.company.MyExtracter" parent="baseMetadataExtracter" />`


**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

