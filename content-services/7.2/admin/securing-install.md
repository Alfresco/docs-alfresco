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

![secure-install-overview]({% link content-services/images/acs-security-overview.png %}){:height="300px" width="500px"}

## Check all passwords
The most important aspect of security are the passwords used to access the system. Your passwords are your 
first line of defense, so use as strong passwords as possible. Passwords can be strengthen in many ways. Do not ignore 
them since they can be the difference between staying protected and compromising your security.

* User and admin passwords 
    * [Cryptographic password hashing]({% link content-services/7.2/admin/security.md %}#bcryptoverview) for `alfrescoNTLM` authentication (i.e. users stored in database)
    * [Admin password in default authentication]({% link content-services/7.2/admin/security.md %}#adminpwddefaultauth)
    * [Mitigate brute force attack on passwords]({% link content-services/7.2/admin/security.md %}#mitigatebruteforceattackpwd)
* [Change the default JMX passwords]({% link content-services/7.2/config/index.md %}#connectthrujmx) associated with `controlRole` and `monitorRole` parameters.
* Check whether the passwords stored in `alfresco-global.properties` config file, such as database password and admin password, are [encrypted]({% link content-services/7.2/admin/security.md %}#encryptconfigprops).

## Do not run as root
If someone does compromise Content Services you want to limit the damage they can do. If Content Services is running 
as root, they can wreck havoc on your server.

## Adding a Reverse proxy (1) {#addreverseproxy}
It is mandatory to have a reverse proxy in front of your Content Services infrastructure. This proxy is 
then configured with a whitelist of allowed URLs, and blocks everything else. The proxy is also where you [implement 
SSL](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/){:target="_blank"}.

You can find a sample NGINX configuration in our [GitHub project](https://github.com/Alfresco/acs-ingress/blob/master/nginx.conf){:target="_blank"}, 
and the corresponding image in [Docker Hub](https://hub.docker.com/r/alfresco/alfresco-acs-nginx){:target="_blank"}.

## Secure server traffic with HTTPS (1)
If you aren’t going to encrypt the traffic to your server then you should look at the content as public information. 
If that sounds like a bad idea, then you must encrypt your traffic to prevent passwords from being exposed in clear text.

The service [Let’s Encrypt](https://letsencrypt.org/){:target="_blank"} makes quality SSL certificates available to 
everyone for free. Yes, you have to renew them more often than paid certificates but you can automate that with EFF’s 
[certbot](https://certbot.eff.org/). In fact, once you establish the [web proxy](#addreverseproxy) in front of Tomcat, 
securing your traffic with Let’s Encrypt is as easy as running the certbot script if you have a public-facing server.
All communication should be over Secure Socket Layer (SSL).

See [Configure SSL for production environment]({% link content-services/7.2/config/repository.md %}#ssl-prod).

Note that besides HTTPS traffic (Digital Workspace, Share, WebDAV, ReST API) you need also consider:

* SharePoint Protocol
* IMAPS
* SMTP Inbound TLS
* SMTP Outbound TLS
* FTPS
* LDAPS Connection
* Consider Hazelcast or JGroups Connection (Clustering)

## Secure traffic between Repository and Solr (2)
The Repository and Solr are separate web applications. Regardless of whether or not these webapps are running in the same 
Tomcat server, different Tomcat servers, or even different machines, they use HTTP to communicate with each other. 

>**Note**. the communication between Solr and the Repository is NOT encrypted by default. 
See [Docker Compose](https://github.com/Alfresco/acs-deployment/blob/master/docker-compose/docker-compose.yml){:target="_blank"} 
and [Helm](https://github.com/Alfresco/acs-deployment/blob/master/helm/alfresco-content-services/values.yaml){:target="_blank"} configurations. 
The reason for this is that providing SSL encryption out-of-the-box is always tricky. For example, providing default certificates 
make no sense, and generated self signed certs my not fit your policy if you have your own PKI. What we provide in terms of 
helm charts are building blocks for you to build upon, it's not a production ready configuration.

When secure communication is turned on between Solr and the Repository the Solr web application uses certificate-based 
client authentication (i.e. so the Repository knows that it is really Solr talking to it). But, by default, the 
certificate Solr uses for both encryption and authentication is the one that Alfresco generates and ships with the product. 
This means that, by default, if someone can get to your Solr port (8983, by default) they can search your entire content 
repository because the public has easy access to that Alfresco-generated, default client certificate.

To fix this turn on secure communcation between Solr and the Repository and re-generate the certificate. 
 
Follow the [Search Services security documentation]({% link search-services/latest/config/keys.md %}) for information
on how to set this up on Windows or Linux.

See also [managing Alfresco keystores]({% link content-services/7.2/admin/security.md %}#managealfkeystores) for 
introduction and configuration of the different keystores.  

## Share Web UI security (3)
The Alfresco Share Web UI is one of the main user interfaces used by Alfresco users. It needs to be configured 
for secure access. See [Share security policies and filters]({% link content-services/7.2/admin/security.md %}#alfresco-share-security-policies-and-filters).

Share is behind the [web proxy](#addreverseproxy) so it is always accessed via HTTPS. 

## Digital Workspace Web UI security (4)
The Alfresco Digital Workspace (ADW) Web UI is one of the main user interfaces used by Alfresco users. ADW is an Angular 
application so it is beneficial to look at [Angular security documentation](https://angular.io/guide/security){:target="_blank"}.

ADW is behind the [web proxy](#addreverseproxy) so it is always accessed via HTTPS.

## ReST API secure access (5)
You can also configure filters in Alfresco Repository to mitigate security attacks when the Content Services ReST API is 
accessed externally.

See [repository security policies and filters]({% link content-services/7.2/admin/security.md %}#reposecuritypolicyandfilters)

The ReST API is behind the [web proxy](#addreverseproxy) so it is always accessed via HTTPS.

## Securing HTML transformations
HTML pipelines that use LibreOffice are vulnerable to [BSSRF](https://en.wikipedia.org/wiki/Server-side_request_forgery){:target="_blank"}
attacks. These can be disabled by following these [instructions]({% link content-services/7.2/admin/securing-html-transforms.md %}).

## Encrypting metadata 
It's possible to encrypt node (i.e. file or folder) properties (i.e. metadata). For more information about this see 
[managing Alfresco keystores]({% link content-services/7.2/admin/security.md %}#managealfkeystores).

## Dedicated user for external system access
If you are going to integrate Content Services with external systems, then [create a dedicated user]({% link content-services/7.2/admin/users-groups.md %}) 
for each external system allowing access to the repository based on what information they need. Instead of giving them 
access via the admin user that has access to everything. 

## Disable Guest user
Read the information on the [Set up authentication and sync]({% link content-services/7.2/admin/auth-sync.md %}) page
and specifically search for Guest user config on this page.

## Disable unused protocols
This is about reducing your attack surface. One of the nice things about Content Services is the wide number of options 
you have for getting content in and out of the repository. That’s great, but if you aren’t using, for example, FTP, then 
why leave [FTP enabled]({% link content-services/7.2/config/file-servers.md %})? That’s a potential place an attacker 
could find a toehold. Purposefully review each of the protocols that Alfresco supports and disable those that are not 
being used.

### Summary of ports used in a Content Services installation

The following table shows the protocols and ports used in a Content Services installation together with some useful 
comments on dos and don'ts.

Inbound firewall ports:

![acs-protocol-overview-inbound]({% link content-services/images/acs-protocol-overview-inbound.png %})

Outbound firewall ports:

![acs-protocol-overview-outbound]({% link content-services/images/acs-protocol-overview-outbound.png %})

## Security checklist

The following is a typical security checklist that you can use to make sure your installation is secure:

![acs-security-checklist]({% link content-services/images/acs-security-checklist.png %})
