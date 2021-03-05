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

## Do not run Content Services as root
If someone does compromise Content Services you want to limit the damage they can do. If Content Services is running as root, 
they can wreck havoc on your server.

## Adding a Reverse proxy (1) {#addreverseproxy}
It's good security practice to have a reverse proxy in front of your Content Services infrastructure. This proxy is 
then configured with a whitelist of allowed URLs, and blocks everything else.

You can find a sample NGINX configuration in our [GitHub project](https://github.com/Alfresco/acs-ingress/blob/master/nginx.conf){:target="_blank"}, 
and the corresponding image in [Docker Hub](https://hub.docker.com/r/alfresco/alfresco-acs-nginx){:target="_blank"}.

## Secure server traffic with HTTPS
If you aren’t going to encrypt the traffic to your server then you should look at the content as public information. 
If that sounds like a bad idea, then you must encrypt your traffic to prevent passwords from being exposed in clear text.

The service [Let’s Encrypt](https://letsencrypt.org/){:target="_blank"} makes quality SSL certificates available to 
everyone for free. Yes, you have to renew them more often than paid certificates but you can automate that with EFF’s 
[certbot](https://certbot.eff.org/). In fact, once you establish the [web proxy](#addreverseproxy) in front of Tomcat, 
securing your traffic with Let’s Encrypt is as easy as running the certbot script if you have a public-facing server.
All communication should be over Secure Socket Layer (SSL).

See [Configure SSL for production environment]({% link content-services/latest/config/repository.md %}#ssl-prod).

## Securing the connection between Repository and Solr (2)
It is important that the communication between the Content Services Repository and the Alfresco Search Services is secure.

For more information about this see [Search Services security documentation]({% link search-services/latest/config/security.md %}) 

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

### Re-generate the Solr certificate
Alfresco and Solr are separate web applications. Regardless of whether or not these web apps are running in the same 
Tomcat server, different Tomcat servers, or even different machines, they use HTTP to communicate with each other. 
The communication between Solr and Alfresco is encrypted, by default. The Solr web application is secured using 
certificate-based client authentication. But, by default, the certificate Solr uses for both encryption and authentication 
is the one that Alfresco generated and shipped with the product. This means that, by default, if someone can get to your 
Solr port they can search your entire repository because the public has easy access to that Alfresco-generated, 
default client certificate.

To fix this, either make sure no one can hit the Solr port (8443, by default) or re-generate the certificate. Or both. 
For more info on how to re-generate the Solr certificate, see the [docs](TODO).

## ReST API secure access
You can also configure filters in Alfresco Repository to mitigate security attacks when the Content Services ReST API is 
accessed externally.

See [repository security policies and filters]({% link content-services/latest/admin/security.md %}#reposecuritypolicyandfilters)

## Dedicated user for external system access
If you are going to integrate Content Services with external systems create a dedicated user for them allowing access to 
Content Services. Instead of giving them access via admin user.

## Disable Guest user
Read the information on the [Set up authentication and sync]({% link content-services/community/admin/auth-sync.md %}) page
and specifically search for Guest user config on this page.

## Disable unused protocols
This is about reducing your attack surface. One of the nice things about Content Services is the wide number of options 
you have for getting content in and out of the repository. That’s great, but if you aren’t using, for example, FTP, then 
why leave FTP enabled? That’s a potential place an attacker could find a toehold. Purposefully review each of the protocols 
that Alfresco supports and disable those that are not being used.
