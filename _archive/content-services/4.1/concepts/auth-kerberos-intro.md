---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication]
---

# Configuring Kerberos

The Java Authentication and Authorization Service \(JAAS\) is used within the Kerberos subsystem to support Kerberos authentication of user names and passwords. You may choose to use Kerberos against an Active Directory server in preference to LDAP or NTLM as it provides strong encryption without using SSL. It would still be possible to export user registry information using a chained LDAP subsystem.

The disadvantages of using LDAP authentication against Active Directory compared with JAAS/Kerberos are:

-   the simplest approach is to use the SIMPLE LDAP authentication protocol, which should be used with SSL
-   AD requires special set up to use digest MD5 authentication \(reversible encryption for passwords\), which may be difficult retrospectively
-   LDAP can use GSSAPI and Kerberos which would be equivalent but this is more difficult to configure and has not been tested

For some pointers and background information on JAAS, the Java Authentication and Authorization Service, refer to the following web sites:

-   [Oracle Java SE Security](http://java.sun.com/products/jaas/)
-   [JAAS](http://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service)

-   **[Kerberos configuration properties](../concepts/auth-kerberos-props.md)**  
To enable full Kerberos support in Alfresco requires that the CIFS server and the SSO authentication filters each have a Kerberos service ticket.
-   **[Configuring Kerberos against Active Directory](../tasks/auth-kerberos-ADconfig.md)**  
This section describes how to set up accounts for use by Alfresco on a Windows domain controller running Active Directory.
-   **[Kerberos client configuration](../tasks/auth-kerberos-clientconfig.md)**  
This section describes how to configure the Kerberos client authentication.
-   **[Debugging Kerberos](../concepts/auth-kerberos-debug.md)**  
You can debug Kerberos issues using the log4j properties file. This file is located at <installLocation\>/tomcat/shared/classes/alfresco/extension/custom-log4j.properties.sample.
-   **[Configuring Share Kerberos SSO](../tasks/auth-kerberos-shareSSO.md)**  
This section describes how to configure the Share server and Active Directory server to work with Kerberos Single Sign On \(SSO\).

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

