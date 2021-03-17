---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configure Solr search service

The way that you configure Alfresco Content Services to use Solr depends on how you have installed Alfresco Content Services. If you install using the setup wizard, Solr 4 is installed and enabled automatically.

Solr 4 is installed in the same Tomcat container as Alfresco Content Services, and the connection URL is unchanged from the default. The Solr 4 home is within the Alfresco Content Services home directory.

Use this information to configure the Solr search subsystem, and to understand the Solr directory structure, configuration files, and properties.

-   **[Installing and configuring Solr](../tasks/solr4-install-config.md)**  
 The Solr 4 search subsystem is installed by default when you install Alfresco Content Services 5.2.7 using the setup wizards \(installer\), and therefore, you do not need to do these steps. If you install manually using the distribution zip, you will need to configure Solr 4 separately on the existing installation using Tomcat.
-   **[Generating secure keys for Solr communication](../tasks/generate-keys-solr4.md)**  
This task describes how to replace or update the keys used to secure communication between Alfresco Content Services and Solr, using secure keys specific to your installation.
-   **[Solr directory structure](../concepts/solr4-directory.md)**  
After you have installed Alfresco Content Services, several directories and configuration files related to Solr will be available in the Alfresco Content Services home directory.
-   **[Solr configuration files](../concepts/solr4-config-files.md)**  
When you install Alfresco Content Services 5.2.7, several Solr configuration files are made available to you. The section lists the Solr configuration files, their location in the directory structure, and their description.
-   **[Solr subsystem](../concepts/solr4-subsystem.md)**  
Search is contained in a subsystem and it has an implementation of Solr.
-   **[Activating Solr](../tasks/solr4-alfresco-config.md)**  
Use this information to activate the Solr search mechanism in a manual Alfresco Content Services installation or when upgrading from a previous version.

**Parent topic:**[Configuring search with Solr 4](../concepts/solr-home.md)

