---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Tailoring your installation

When installing Alfresco Content Services, an important part of the configuration process is the removal of any unused applications. Use this information to determine any applications that you might want to remove from your installation and how to remove them.

For example, if you want a Share-only tier, remove the Alfresco WAR file and any Solr configurations. Likewise, if you want an Alfresco-only tier, remove the Alfresco Share WAR file and any Solr configurations.

Alternatively, consider using the Share Installer or the Platform Installer instead of the Alfresco Content Services Installer. See [Installing](master-ch-install.md) for more information.

-   **[Removing the alfresco.war file](../tasks/delete-alf-war.md)**  
 The Alfresco WAR file is a bundle file containing the required WAR files, additional commands, configuration files, and licenses for a manual installation. Use this information to remove the alfresco.war file from your application.
-   **[Removing the share.war file](../tasks/delete-share-war.md)**  
Use this information to remove the share.war file from your application.

**Parent topic:**[Installing manually](../concepts/ch-install.md)

