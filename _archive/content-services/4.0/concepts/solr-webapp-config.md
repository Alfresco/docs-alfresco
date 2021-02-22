---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Configuring Solr

The way that you configure Alfresco to use Solr depends on how you have installed Alfresco.

If you install Alfresco using the setup wizard, Solr is installed and enabled automatically. Solr is installed in the same Tomcat container as Alfresco, and the connection URL is unchanged from the default. The Solr home is in the Alfresco data directory, which also contains the Solr data files.

If you have an existing Alfresco installation, and you wish to configure it to use Solr search, you need to apply the Solr archive to your web application.

-   **[Installing and Configuring Solr](../tasks/solr-install-config.md)**  
This section describes how to install and configure Solr using the distribution archive file on an existing Alfresco installation using Tomcat.
-   **[Generating Secure Keys for Solr Communication](../tasks/generate-keys-solr.md)**  
This task describes how to replace or update the keys used to secure communication between Alfresco and Solr, using secure keys specific to your Alfresco installation.
-   **[Solr Directory Structure](../concepts/solr-directory.md)**  
After you have installed Alfresco 4.0, several new directories and configuration files related to Solr will be available in the Alfresco home directory. This section explains the Solr directory structure.
-   **[Solr Configuration Files](../concepts/solr-config-files.md)**  
When you install Alfresco 4.0, several Solr-related configuration files are made available to you. The section lists the Solr configuration files, their location in the Alfresco directory structure and description.
-   **[Solr subsystem](../concepts/solr-subsystem.md)**  
Search is contained within a subsystem, and it has an implementation of either `solr` or `lucene`.
-   **[Activating Solr](../tasks/solr-alfresco-config.md)**  
This section describes how to activate the Solr search mechanism in a manual Alfresco installation or an upgrade from a previous version.
-   **[Solr troubleshooting for SSL configurations](../concepts/solr-troubleshooting.md)**  
When you have an Alfresco installation that requires an SSL configuration, you may encounter some connection issues.

**Parent topic:**[Configuring Search](../concepts/solr-home.md)

