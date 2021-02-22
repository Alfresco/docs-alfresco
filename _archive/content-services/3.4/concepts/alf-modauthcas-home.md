---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Using Alfresco with CAS authentication through Apache `mod_auth_cas`

This section provides an overview on how to install and use Alfresco on a Red Hat Enterprise Linux server that uses a Central Authentication Service \(CAS\) server as a Single Sign-On \(SSO\) solution.

**Note:** CAS 3.3.5 is the only version that has been confirmed to work with this configuration of Alfresco. CAS 3.4.3.1 requires changes to this configuration.

-   **[Overview of using Alfresco with CAS authentication](../concepts/alf-modauthcas-intro.md)**  
This topic describes the configuration necessary to enable Alfresco to work with Jasig CAS authentication through Apache `mod_auth_cas`.
-   **[Install supporting tools](../tasks/install-tools-modauthcas.md)**  
This topic describes the instructions used to prepare machine 1, the SSO server.
-   **[Install required packages](../concepts/install-pack-modauthcas.md)**  
 This topic provides a list of the packages required at machine 1 to enable Alfresco to work with `mod_auth_cas`.
-   **[Set up Certificate Authority and issue Server and Client Certificates](../tasks/setup-ca-modauthcas.md)**  
The topic describes the instructions on how to set up a Certificate Authority \(CA\) and issue Server and Client Certificates on machine 1.
-   **[Build and install mod\_auth\_cas](../tasks/build-modauthcas.md)**  
This topic describes how to build and install `mod_auth_cas` on machine 1.
-   **[Configure mod\_auth\_cas](../tasks/config-modauthcas.md)**  
This topic describes how to configure `mod_auth_cas`.
-   **[Configure, Build and Install Jasig CAS Server](../tasks/config-cas-server.md)**  
 This topic describes the steps to build your own pre-configured CAS Server on machine 1 using Maven that integrates with Alfresco's authentication systems.
-   **[Configure mod\_proxy\_ajp](../tasks/config-modproxyajp.md)**  
This topic describes how to configure `mod_proxy_ajp` on machine 1.
-   **[Configure Alfresco and Share to use SSO external authentication](../tasks/config-alf-share-sso.md)**  
This topic describes how to configure Alfresco and Share on machine 2 to use SSO external authentication.
-   **[Test it out](../tasks/try-itout-cas.md)**  
This topic describes the steps to ensure that CAS is authenticating Alfresco Explorer and Share applications properly.

**Parent topic:**[Configuring external authentication](../concepts/auth-external-intro.md)

