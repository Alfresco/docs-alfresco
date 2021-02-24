---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Configuring forms

The default forms configuration is specified in the <configRootShare\>/classes/alfresco/web-framework-config-commons.xml file. This file contains all the default controls and constraint handlers for the Alfresco content model and the form configuration for the `cm:content`and `cm:folder` types. This file also contains an example of configuring the `cm:content` type.

You should apply all your forms customizations to a custom configuration file. To configure forms for the Share application, use the custom configuration file named share-config-custom.xml.sample.

1.  Open the <web-extension\>/share-config-custom.xml.sample file.

2.  Modify the forms configuration settings using the XML configuration syntax.

3.  Save the file without the .sample extension.


**Parent topic:**[Forms](../concepts/forms-intro.md)

