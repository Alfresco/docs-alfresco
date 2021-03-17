---
author: [Alfresco Documentation, Alfresco Documentation]
source: Issue ALF-9053
audience: 
category: Customization
option: Share repository document library doclib web-extension
---

# Hiding the Share repository document library

The section describes how to hide the **Repository** link in the Share header.

1.  Open the <configRootShare\>/classes/alfresco/share-config.xml file.

    For example, on Tomcat, the file path for this file will be <TOMCAT\_HOME\>/webapps/share/WEB-INF/classes/alfresco/share-config.xml

2.  Locate the `<!-- Global config section -->` section.

3.  Copy the entire `<header></header>` section, and then close the file.

4.  Open the <web-extension\>/share-config-custom.xml file.

5.  Locate `<!-- Global config section -->`.

    If you do not see the global configuration section, copy the full example from the share-config.xml file.

6.  Paste the full `<header></header>` section into the `<config replace="true"></config>` section.

7.  Locate and comment out the following section from within the <header\></header\>:

    ```
    <item type="link" id="repository">/repository</item>
    ```

8.  Save the share-config-custom.xml file, and then restart the Alfresco server.


The **Repository** link is now not visible in the Share banner.

**Parent topic:**[Share repository document library](../concepts/share-repodoclib.md)

