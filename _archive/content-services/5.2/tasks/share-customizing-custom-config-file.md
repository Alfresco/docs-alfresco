---
author: Alfresco Documentation
audience: 
category: Alfresco Share
option: [extending, Share, Document library, EXIF renderer source code]
---

# Configuring Share with the share-config-custom.xml file

Use this information to modify the Share custom configuration file.

To configure the Share application, you can use the custom configuration file named share-config-custom.xml. If you are overriding a configuration section, you must apply the `replace="true"` attribute to replace the existing Alfresco configuration.

1.  Open the following file:

    tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml

2.  Uncomment any <config\> items that you want to enable.

3.  Add any <config\> items that you want to include.

4.  Save the edited file.

5.  Restart Alfresco.


