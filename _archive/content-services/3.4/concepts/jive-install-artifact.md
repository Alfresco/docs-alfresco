---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Jive Toolkit, Extensions/Third Party]
keyword: Jive
---

# Alfresco Jive Toolkit installation

The Jive Toolkit is shipped as a ZIP archive containing the relevant installation files.

The download file is available to download from the Enterprise Support Portal \([support.alfresco.com](http://support.alfresco.com)\), and it is called:

```
alfresco-jivetoolkit-1.0.6.zip
```

The Jive Toolkit consists of the following components:

-   Alfresco repository plug-in \(alfresco-jivetoolkit-repo-1.0.6.amp\)
-   Alfresco Share plug-in \(alfresco-jivetoolkit-share-1.0.6.amp\)
-   Jive plug-in \(alfresco-jivetoolkit-jive-1.0.6.jar\)

The Alfresco plug-ins extend Alfresco so that it can talk to Jive and vice-versa. For the Alfresco side, the plug-ins are two Alfresco Module Package \(AMP\) files: one .amp file for the repository and one .amp file for Share. For the Jive side, the plug-in is a .jar file. The plug-ins are shipped in a separately distributed ZIP archive, and are not integrated with the existing Alfresco or Jive installers.

The install procedure is summarized as:

1.  Install and configure the Jive Toolkit AMP files on an Alfresco installation.
2.  Install and configure the Jive Toolkit plug-in on a Jive installation.
3.  Configure authentication for the toolkit in both Alfresco and Jive.

The following sections describe these steps in more detail.

-   **[Installing the Jive Toolkit on Alfresco](../tasks/jive-connector-install.md)**  
These steps describe how to install the Jive Toolkit on Alfresco.
-   **[Installing the Jive Toolkit on Jive](../tasks/jive-toolkit-install.md)**  
These steps describe how to install the Jive Toolkit on Jive.
-   **[Configuring authentication for the Jive Toolkit](../tasks/jive-auth.md)**  
This section describes the configuration requirements for the Jive Toolkit authentication.

**Parent topic:**[Installing and configuring the Alfresco Jive Toolkit](../concepts/jive-intro.md)

