---
title: Securing your installation
---

This page contains the set of recommendations required to secure a Community Edition installation.

> **Note:** The system on which the Community Edition software is installed - such as operating systems, ActiveMQ, and DBMS - will also require security hardening. This is not covered here.

## Overview

For a secure Community Edition installation, you need protect the system from all possible points of attack. It's difficult to list down all the possible configurations as most of them come under the broad topic of *best practices*. Instead, we're going to focus on the security related considerations. In addition, in most production environments every Community Edition installation is linked to other tools like portals, intranets, business intelligence tools, CMS, ECM, and CRM, so it’s advisable to secure these integrated systems as well.

The following picture gives an overview of the components that need to be secured:

![secure-install-overview]({% link content-services/images/acs-security-overview.png %}){:height="300px" width="500px"}

## Check all passwords

The most important aspect of security are the passwords used to access the system. Your passwords are your first line of defense, so use as strong passwords as possible. Passwords can be strengthen in many ways. Do not ignore them since they can be the difference between staying protected and compromising your security.

* User and admin passwords:
  * [Cryptographic password hashing]({% link content-services/community/admin/security.md %}#bcryptoverview) for `alfrescoNTLM` authentication (i.e. users stored in database)
  * [Admin password in default authentication]({% link content-services/community/admin/security.md %}#adminpwddefaultauth) (TODO: REMOVE LINK?)
  * [Mitigate brute force attacks on passwords]({% link content-services/community/admin/security.md %}#mitigatebruteforceattackpwd) (TODO: REMOVE LINK?)
* Check whether the passwords stored in the `alfresco-global.properties` file, such as the database password and admin password, are [encrypted]({% link content-services/community/admin/security.md %}#encryptconfigprops). (TODO: REMOVE LINK?)

## Do not run as root

If someone does compromise Community Edition you want to limit the damage they can do. If Community Edition is running as root, they can wreck havoc on your server.

> **Note:** In the following sections, refer back to the numbered items in the diagram from the [overview](#overview).

## Adding a Reverse proxy (1) {#addreverseproxy}

It is mandatory security practice to have a reverse proxy in front of your Community Edition infrastructure. This proxy is then configured with a whitelist of allowed URLs, and blocks everything else. The proxy is also where you [implement SSL](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/){:target="_blank"}.

You can find a sample NGINX configuration in our [GitHub project](https://github.com/Alfresco/acs-ingress/blob/master/nginx.conf){:target="_blank"}, and the corresponding image in [Docker Hub](https://hub.docker.com/r/alfresco/alfresco-acs-nginx){:target="_blank"}.

## Secure server traffic with HTTPS (1)

If you aren’t going to encrypt the traffic to your server then you should look at the content as public information. If that sounds like a bad idea, then you must encrypt your traffic to prevent passwords from being exposed in clear text.

The service [Let’s Encrypt](https://letsencrypt.org/){:target="_blank"} makes quality SSL certificates available to everyone for free. Yes, you have to renew them more often than paid certificates but you can automate that with EFF’s [certbot](https://certbot.eff.org/). In fact, once you establish the [web proxy](#addreverseproxy) in front of Tomcat, securing your traffic with Let’s Encrypt is as easy as running the certbot script if you have a public-facing server.
All communication should be over Secure Socket Layer (SSL).

See [Configure SSL for production environment]({% link content-services/community/config/repository.md %}#ssl-prod).

Note that besides HTTPS traffic (Share, WebDAV, ReST API) you need also consider:

* SharePoint Protocol
* IMAPS
* SMTP Inbound TLS
* SMTP Outbound TLS
* FTPS
* LDAPS Connection

## Secure traffic between repository and Solr (2)

The repository and Solr are separate web applications. Regardless of whether or not these webapps are running in the same Tomcat server, different Tomcat servers, or even different machines, they use HTTP to communicate with each other.

> **Note:** The communication between Solr and the repository is NOT encrypted by default.

See [Docker Compose](https://github.com/Alfresco/acs-deployment/blob/master/docker-compose/docker-compose.yml){:target="_blank"} and [Helm](https://github.com/Alfresco/acs-deployment/blob/master/helm/alfresco-content-services/values.yaml){:target="_blank"} configurations. The reason for this is that providing SSL encryption out-of-the-box is always tricky. For example, providing default certificates makes no sense, and generated self-signed certificates may not fit your policy if you have your own PKI. What we provide in terms of Helm charts are building blocks for you to build upon, so it's not a production-ready configuration.

When secure communication is turned on between Solr and the repository, the Solr web application uses certificate-based client authentication (i.e. so the repository knows that it is really Solr talking to it). But, by default, the certificate Solr uses for both encryption and authentication is the one that Alfresco generates and ships with the product. This means that, by default, if someone can get to your Solr port (8983, by default) they can search your entire content repository because the public has easy access to that Alfresco-generated, default client certificate.

To fix this, turn on secure communication between Solr and the repository and re-generate the certificate.

Follow the [Search Services security documentation]({% link search-services/latest/config/keys.md %}) for information on how to set this up on Windows or Linux.

See also [Managing Alfresco keystores]({% link content-services/community/admin/security.md %}#managealfkeystores) for an introduction and the configuration of the different keystores.

## Share Web UI security (3)

The Alfresco Share Web UI is one of the main user interfaces used by Alfresco users. It needs to be configured for secure access. See [Share security policies and filters]({% link content-services/community/admin/security.md %}#alfresco-share-security-policies-and-filters).

Share is behind the [web proxy](#addreverseproxy) so it is always accessed via HTTPS.

## ReST API secure access (5)

You can also configure filters in the repository to mitigate security attacks when the Community Edition ReST API is accessed externally.

See the [Repository security policies and filters]({% link content-services/community/admin/security.md %}#reposecuritypolicyandfilters)

The ReST API is behind the [web proxy](#addreverseproxy) so it is always accessed via HTTPS.

## Encrypting metadata

It's possible to encrypt node (i.e. file or folder) properties (i.e. metadata). For more information, see [Managing Alfresco keystores]({% link content-services/community/admin/security.md %}#managealfkeystores).

## Dedicated user for external system access

If you're going to integrate Community Edition with external systems, then [create a dedicated user]({% link content-services/community/admin/users-groups.md %}) for each external system. This allows access to the repository based on what information they need, instead of giving them access via the admin user that has access to everything.

## Disable Guest user

Read the [Set up authentication and sync]({% link content-services/community/admin/auth-sync.md %}) page and specifically search for 'guest' user configuration.

## Disable unused protocols

This is about reducing your attack surface. One of the nice things about Community Edition is the wide number of options you have for getting content in and out of the repository. That’s great, but if you aren’t using, for example, FTP, then why leave [FTP enabled]({% link content-services/community/config/file-servers.md %})? That’s a potential place an attacker could find a toehold. Purposefully review each of the protocols that Alfresco supports and disable those that are not being used.

### Summary of ports used in a Community Edition installation

The following table shows the protocols and ports used in a Community Edition installation together with some useful comments on dos and don'ts.

**Inbound firewall ports:**

![acs-protocol-overview-inbound]({% link content-services/images/acs-protocol-overview-inbound.png %})

**Outbound firewall ports:**

![acs-protocol-overview-outbound]({% link content-services/images/acs-protocol-overview-outbound.png %})

## Security checklist

The following is a typical security checklist that you can use to make sure your installation is secure:

![acs-security-checklist]({% link content-services/images/acs-security-checklist.png %})
