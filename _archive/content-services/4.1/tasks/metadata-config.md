---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Metadata extractors, Document Management]
option: extended services metadata extraction
---

# Configuring metadata extraction

Metadata extraction automatically extracts metadata information from inbound and/or updated content, and then updates the corresponding node properties with the metadata values.

Metadata extractors provide the mechanism for server-side extraction of values from added or updated content. Definitions for the default extractors are located in the <configRoot\>/alfresco/content-services-context.xml file.

For more information on the extractors, see the [Javadocs for the org.alfresco.repo.content.metadata package](http://dev.alfresco.com/resource/docs/java/repository/index.html?org/alfresco/repo/content/metadata/package-summary.html).

Also, see the sample configurations in the following files:

-   <extension-samples\>/alfresco/extension/custom-metadata-extrators-context.xml.sample
-   <extension-samples\>/alfresco/extension/wcm-xml-metadata-extracter-context.xml.sample.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

