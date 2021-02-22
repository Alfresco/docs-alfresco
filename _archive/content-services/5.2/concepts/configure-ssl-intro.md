---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# Secure Sockets Layer \(SSL\) and the repository

There are a number of ways to handle SSL communication when connecting to the repository, and some information that you should know about automatic configuration.

When you install Alfresco Content Services, port 8443 is automatically configured for SSL communication between Solr and the repository. This means that the default setting is set to use client certificates for any authentication \(the connector on port 8443 is configured with `clientAuth="want"`\).

This causes complications when there is communication between a browser protocol and the repository, because Tomcat requests a client certificate for that communication too; for example, when you are using Alfresco Office Services to connect between a Microsoft application and the repository. For more information see [Installing and configuring Alfresco Office Services](aos-intro.md).

You can still connect to the repository without a client certificate, however if a certificate is present \(for example, if you have installed certificates in your Windows certificate store\), then the certificate must be signed by the same Certificate Authority that is used for authentication between the repository and Solr. If you select one of the Windows installed certificates, you will not be able to progress, because the certificate is not one that is expected for the Solr to repository communication. In this situation, you need to cancel the certificate window and then you can proceed. If you have no client certificates, you can use port 8443 without issues.

These topics discuss how to set up SSL for non-Solr communication with the repository, and the method that you use to configure SSL varies depending on whether you are configuring your production or test environments. For example, if you are setting up a production environment, use a proxy server to handle SSL communication. If you are configuring a test environment, you might want to edit your configuration files directly \(and listen for SSL on a port that is not port 8443; for example, port 443\).

If you are interested in setting up SSL and security for Solr, this is discussed in detail in [Solr security](solrsecurity-intro.md).

-   **[Configuring SSL for a production environment](../tasks/configure-ssl-prod.md)**  
This scenario provides a set of forwarding rules that your proxy needs to meet and the corresponding configuration, with sample configuration files for Apache HTTP Server.
-   **[Configuring SSL for a test environment](../tasks/configure-ssl-test.md)**  
If you are configuring SSL in a development or test environment, you can edit some configuration files to enable SSL.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

