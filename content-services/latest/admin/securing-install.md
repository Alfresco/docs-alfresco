---
title: Securing your installation
---

This page contains the set of recommendations required to secure a Content Services installation.

>**Note:** The system on which the Content Services software is installed - such as operating systems, ActiveMQ, and DBMS - 
will also require security hardening. This is not covered here.

## Overview 
For a secure Content Services installation you need protect the system from all possible points of attack. 
It's difficult to list down all the possible configurations as most of them come under the broad topic of *best practices*. 
Instead we are going to focus on the security related considerations. In addition, in most production environments every 
Content Services installation is linked to other tools like portals, intranets, business intelligence tools, CMS, ECM 
and CRM, so it’s advisable to secure these integrated systems as well. 

Also, if you have installed a Content Services cluster, then you should remember to check the security of all nodes 
involved.

The following picture gives an overview of the components that needs to be secured:

![secure-install-overview]({% link content-services/images/securing-acs-install-overview.png %})

## Check all passwords
The most important aspect of security are the passwords used to access the system. Your passwords are your 
first line of defense, so use as strong passwords as possible. Passwords can be strengthen in many ways. Do not ignore 
them since they can be the difference between staying protected and compromising your security.

* [Admin password in default authentication]({% link content-services/latest/admin/security.md %}#adminpwddefaultauth)
* [Mitigate brute force attack on user passwords]({% link content-services/latest/admin/security.md %}#mitigatebruteforceattackpwd)
* [Change the default JMX passwords]({% link content-services/latest/config/index.md %}#connectthrujmx) associated with `controlRole` and `monitorRole` parameters.
* Check whether the passwords stored in Properties files are [encrypted](#keystoresandencryption) or not.

Check the passwords and security of all connected API, Services, and Shared proxies.

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

See [Configure SSL for production environment]({% link content-services/latest/config/repository.md %}#ssl-prod).

## Share Web UI security (3)
The Alfresco Share Web UI is one of the main user interfaces used by Alfresco users. It needs to be configured 
for secure access. See [Share security policies and filters]({% link content-services/latest/admin/security.md %}#alfresco-share-security-policies-and-filters). 

## Digital Workspace Web UI security (ENTERPRISE)
The Alfresco Digital Workspace Web UI is one of the main user interfaces used by Alfresco users. It needs to be configured 
for secure access, see the following pages:

TODO

## Manage keystores and encryption {#keystoresandencryption}
The out-of-the-box Content Services installation has a pre-configured main keystore, which contains a secret key generated 
by Content Services. You should generate new keystores.

* [Manage keystores]({% link content-services/latest/admin/security.md %}#managealfkeystores) for encrypted properties, communication etc
* [Encrypt config properties]({% link content-services/latest/admin/security.md %}#encryptconfigprops)

## ReST API secure access
You can also configure filters in Alfresco Repository to mitigate security attacks when the Content Services ReST API is 
accessed externally.

See [repository security policies and filters]({% link content-services/latest/admin/security.md %}#reposecuritypolicyandfilters)

