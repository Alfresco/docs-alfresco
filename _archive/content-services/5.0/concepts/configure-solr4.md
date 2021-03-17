---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configure Solr 4 search service

The way that you configure Alfresco to use Solr 4 depends on how you have installed Alfresco. If you install Alfresco using the setup wizard, Solr 4 is installed and enabled automatically. Solr 4 is installed in the same Tomcat container as Alfresco, and the connection URL is unchanged from the default. The Solr 4 home is within the Alfresco home directory.

This topic provides information on configuring the Solr 4 search subsystem. It also outlines the Solr 4 directory structure, configuration files, and properties.

-   **[Installing and configuring Solr 4](../tasks/solr4-install-config.md)**  
 The Solr 4 search subsystem is installed by default when you install Alfresco One 5.0 using the setup wizards \(installer\), and therefore, you do not need to do these steps. If you install Alfresco manually using the distribution zip, you will need to configure Solr 4 separately on the existing Alfresco installation using Tomcat.
-   **[Generating secure keys for Solr 4 communication](../tasks/generate-keys-solr4.md)**  
This task describes how to replace or update the keys used to secure communication between Alfresco and Solr 4, using secure keys specific to your Alfresco installation.
-   **[Solr 4 directory structure](../concepts/solr4-directory.md)**  
After you have installed Alfresco, several directories and configuration files related to Solr 4 will be available in the Alfresco home directory. This section explains the Solr 4 directory structure.
-   **[Solr 4 configuration files](../concepts/solr4-config-files.md)**  
When you install Alfresco One 5.0, several Solr 4 configuration files are made available to you. The section lists the Solr 4 configuration files, their location in the Alfresco directory structure and description.
-   **[Solr 4 subsystem](../concepts/solr4-subsystem.md)**  
Search is contained in a subsystem and it has an implementation of Solr4.
-   **[Activating Solr 4](../tasks/solr4-alfresco-config.md)**  
This information describes how to activate the Solr 4 search mechanism in a manual Alfresco installation or when upgrading from a previous version.

**Parent topic:**[Configuring search](../concepts/solr-home.md)

