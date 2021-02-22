---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Hiding the Share repository link using legacy mode

If required, it is possible to use the Share header menu bar in legacy mode, and hide the **Repository** link. This means users will only be able to browse content in document libraries of sites that they own, or are a member of.

1.  Open the <configRootShare\>/classes/alfresco/share-config.xml file.

    For example, on Tomcat, the file path for this file will be <TOMCAT\_HOME\>/webapps/share/WEB-INF/classes/alfresco/share-config.xml

2.  Locate the `<!-- Global config section -->` section.

3.  Copy the entire `<header></header>` section, and then close the file.

4.  Open the <web-extension\>/share-config-custom.xml file.

5.  Locate `<!-- Global config section -->`.

    If you do not see the global configuration section, copy the full example from the share-config.xml file.

6.  Paste the `<header></header>` section into the <web-extension\>/share-config-custom.xml file.

7.  Locate and comment out the following line from within the <header\></header\>:

    ```
                
    ﻿ <item type="link" id="repository" condition="conditionRepositoryRootNode">/repository</item>            
                         
    ```

8.  Save the share-config-custom.xml file, and then restart the Alfresco server.


The **Repository** link is now not visible in the Share banner.

**Parent topic:**[Share repository document library](../concepts/share-repodoclib.md)

