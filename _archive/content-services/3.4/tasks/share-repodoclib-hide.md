---
author: [Alfresco Documentation, Alfresco Documentation]
source: Issue ALF-9053
audience: 
category: Customization
option: Share repository document library doclib web-extension
---

# Hiding the Share repository document library

The section describes how to hide the **Repository** link in the Share header.

1.  Navigate to <configRoot\>/classes/alfresco.

2.  Edit the share-config.xml file.

3.  Locate the `<!-- Global config section -->` section.

4.  Copy the entire `<header></header>` block, and then close file.

5.  Open the share-config-custom.xml file.

6.  Locate the `<!-- Global config section -->` section.

    If you do not see the global configuration section, add one and ensure that you set `<config replace="true">`.

7.  Paste the entire `<header></header>` block into the `<config replace="true"></config>` block.

8.  Locate and comment out the following block:

    ```
    <item type="link" id="repository">/repository</item> within the <header></header>
    ```

9.  Save the share-config-custom.xml file, and then restart the Alfresco server.


The **Repository** link is now not visible in the Share banner.

**Parent topic:**[Share repository document library](../concepts/share-repodoclib.md)

