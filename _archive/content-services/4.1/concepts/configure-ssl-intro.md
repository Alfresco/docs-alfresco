---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# Secure Sockets Layer \(SSL\) and the Alfresco repository

There are a number of ways to handle SSL communication when connecting to the Alfresco repository, and some information that you should know about automatic configuration in Alfresco.

When you install Alfresco, port 8443 is automatically configured for SSL communication between Solr and the Alfresco repository. This means that Alfresco, by default, is set to use client certificates for any authentication \(the connector on port 8443 is configured with `clientAuth="want"`\).

This causes complications when there is communication between a browser protocol and the repository, because Tomcat requests a client certificate for that communication too.

You can still connect to the repository without a client certificate, however if a certificate is present \(for example, if you have installed certificates in your Windows certificate store\), then the certificate must be signed by the same Certificate Authority that is used for authentication between the repository and Solr. If you select one of the Windows installed certificates, you will not be able to progress, because the certificate is not one that is expected for the Solr to repository communication. In this situation, you need to cancel the certificate window and then you can proceed. If you have no client certificates, you can use port 8443 without issues.

If you are interested in setting up SSL and security for Solr, this is discussed in detail in [Solr security](solrsecurity-intro.md).

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

