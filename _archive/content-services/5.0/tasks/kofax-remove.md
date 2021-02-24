---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Removing the Alfresco Kofax Release script

The following steps describe how to remove the Alfresco Kofax Release script from your Kofax installation.

1.  Start the Kofax Capture Administration module.

2.  Remove the Alfresco Kofax Release script from any document classes using the script:

    1.  Right-click the applicable document class. \(Expand the batch class item to select associated document classes.\)

    2.  From the **Context** menu, select **Release Scripts**.

    3.  From the Release Scripts dialog box, select the Alfresco Kofax Release Script from the list of Assigned Release Scripts, and click **Remove**.

3.  Repeat step 2 for all document classes using the Alfresco Kofax Release script.

4.  In the Kofax Administration module, click **Tools \> Release Script Manager**.

5.  Select **Alfresco Kofax Release Script**, and click **Remove**.

6.  To remove the installation files, manually delete the following files from your Kofax Capture bin directory.

    -   Alfresco.Kofax.Release.Core.dll
    -   Alfresco.Kofax.Release.Core.Logging.xml
    -   Alfresco.Kofax.Release.Core.xml
    -   Alfresco.Kofax.Release.inf
    -   Alfresco.Kofax.Release.WebScripts.dll
    -   Antlr.runtime.dll
    -   Common.Logging.dll
    -   Jayrock.Json.dll
    -   log4net.dll
    -   Spring.Core.dll

**Parent topic:**[Installing and configuring Alfresco Kofax Release script](../concepts/kofax-intro.md)

