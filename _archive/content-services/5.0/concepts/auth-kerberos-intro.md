---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication]
---

# Configuring Kerberos

The Java Authentication and Authorization Service \(JAAS\) is used within the Kerberos subsystem to support Kerberos authentication of user names and passwords. You can choose to use Kerberos against an Active Directory server in preference to LDAP or NTLM as it provides strong encryption without using SSL. It would still be possible to export user registry information using a chained LDAP subsystem.

The disadvantages of using LDAP authentication against Active Directory compared with JAAS/Kerberos are:

-   the simplest approach is to use the SIMPLE LDAP authentication protocol, which should be used with SSL
-   AD requires special set up to use digest MD5 authentication \(reversible encryption for passwords\), which might be difficult retrospectively
-   LDAP can use GSSAPI and Kerberos which would be equivalent but this is more difficult to configure and has not been tested

**Note:** If you are using a proxy \(load balancer\) with Kerberos authentication, either:

-   Use the `external` authentication subsystem on Alfresco and set up the proxy to implement `kerberos`
-   Set up the `kerberos` authentication subsystem on Alfresco and create the Service Principal Name \(SPN\) in Active Directory to include the proxy DNS name. With this option, the load balancer relays the `negotiate headers` to the Alfresco repository, but the client sees the proxy as a DNS name. You must set Active Directory to allow this by creating the SPN for the proxy.

For some scenarios on using Kerberos with a proxy, see [Load Balancers and Kerberos](https://ssimo.org/blog/id_019.html).

For some pointers and background information on JAAS, the Java Authentication and Authorization Service, refer to the following web sites:

-   [Oracle Java SE Security](http://java.sun.com/products/jaas/)
-   [JAAS](http://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service)

-   **[Kerberos configuration properties](../concepts/auth-kerberos-props.md)**  
To enable full Kerberos support in Alfresco, the CIFS server and the SSO authentication filters each need a Kerberos service ticket.
-   **[Configuring Kerberos against Active Directory](../tasks/auth-kerberos-ADconfig.md)**  
You can set up accounts for use by Alfresco on a Windows domain controller running Active Directory.
-   **[Kerberos client configuration](../concepts/auth-kerberos-clientconfig.md)**  
Configure the Kerberos client authentication on Windows using Internet Explorer, WebDav, Firefox, and Chrome browsers.
-   **[Configuring cross-domain support for Kerberos](../tasks/auth-kerberos-cross-domain.md)**  
Use this information to configure Kerberos authentication in a multi-domain environment.
-   **[Debugging Kerberos](../concepts/auth-kerberos-debug.md)**  
You can debug Kerberos issues using the log4j properties file. This file is located at <installLocation\>/tomcat/shared/classes/alfresco/extension/custom-log4j.properties.sample.
-   **[Configuring Share Kerberos SSO](../tasks/auth-kerberos-shareSSO.md)**  
You can configure the Share server and Active Directory server to work with Kerberos Single Sign On \(SSO\).

**Parent topic:**[Configuring authentication subsystems](../concepts/auth-config-examples.md)

