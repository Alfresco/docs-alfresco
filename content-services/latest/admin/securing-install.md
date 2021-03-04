---
title: Securing your installation
---

This page contains the set of actions required to secure a Content Services installation.

>**Note:** The system on which the Content Services software is installed - such as operating systems, ActiveMQ, and DBMS - 
will also require security hardening. This is not covered here.

The following picture gives an overview of the components that needs to be secured:

![secure-install-overview]({% link content-services/images/securing-acs-install-overview.png %})

## Adding a Reverse proxy (1) {#addreverseproxy}
It's good security practice to have a reverse proxy in front of your Content Services infrastructure. This proxy is 
then configured with a whitelist of allowed URLs, and blocks everything else.

You can find a sample NGINX configuration in our [GitHub project](https://github.com/Alfresco/acs-ingress/blob/master/nginx.conf){:target="_blank"}, 
and the corresponding image in [Docker Hub](https://hub.docker.com/r/alfresco/alfresco-acs-nginx){:target="_blank"}.

## Securing the connection between Repository and Solr (2)
It is important that the communication between the Content Services Repository and the Alfresco Search Services is secure.

For more information about this see [Search Services security documentation]({% link search-services/latest/config/security.md %}) 

## SSL communication
All communication should be over Secure Socket Layer (SSL).

See [SSL setup]({% link content-services/latest/config/repository.md %}#ssl-prod).

## Share Web UI security (3)
The Alfresco Share Web UI is one of the main user interfaces used by Alfresco users. It needs to be configured 
for secure access. See [Share security policies and filters]({% link content-services/latest/admin/security.md %}#alfresco-share-security-policies-and-filters). 

## Digital Workspace Web UI security (ENTERPRISE)
The Alfresco Digital Workspace Web UI is one of the main user interfaces used by Alfresco users. It needs to be configured 
for secure access, see the following pages:

TODO

## Secrets management and configurations
Keystore for metadata encryption (Google docs, properties encryption) 

TODO

## ReST API secure access
You can also configure filters in Alfresco Repository to mitigate security attacks when the Content Services ReST API is 
accessed externally.

See [repository security policies and filters]({% link content-services/latest/admin/security.md %}#reposecuritypolicyandfilters)
