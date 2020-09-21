---
author: Alfresco Documentation
---

# Generating secure keys overview

This section describes a recommended approach for generating and setting up certificates. It is not required that you use this approach if you have an alternative solution that you already use.

If you're installing Alfresco Content Services using the distribution zip, you need to generate certificates for the repository and Solr. By default, the distribution zips are configured to use SSL, so you'll need to generate these certificates to get your system to run successfully.

You can create the keystores, truststores and certificates required to configure SSL/mutual TLS authentication between different services in Alfresco Content Services, such as the repository and Solr.

-   **[Generating secure keys for SSL communication](../tasks/generate-keys-ssl.md)**  
Use this information to generate certificates for SSL/mutual TLS authentication between the repository and Alfresco Search and Insight Engine, using secure keys specific to your installation.
-   **[Customizing certificate generation](../concepts/customize-keys.md)**  
Here is a full list of parameters that allow you to customize your certificates. These parameters will override the default values listed in the `run.sh` and `run.cmd` scripts.
-   **[Keystore directory structure](../concepts/keystore-structure.md)**  
The `keystores` directory contains the following structure and files.
-   **[Setting up your certificates](../tasks/keys-setup.md)**  
Use this information to set up your generated certificates in their correct locations.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

