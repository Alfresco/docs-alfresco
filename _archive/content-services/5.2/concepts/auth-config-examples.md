---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Developer]
keyword: [configuration, authentication]
---

# Configuring authentication subsystems

A number of examples demonstrate how to express various authentication configuration requirements in subsystem instances in the authentication chain. They also explain how the authentication chain integrates the functions of multiple subsystem instances into a more powerful conglomerate, letting you cater for even the most complex authentication scenarios.These examples demonstrate the flexibility and power of an authentication chain. You can combine the strengths of a variety of different authentication protocols and keep the user database synchronized almost transparently.

The authentication configuration examples adopt the following structured approach:

1.  Decide the authentication chain composition \(required subsystem types, instance names, order of precedence\) and express this in the alfresco-global.properties file.
2.  For each subsystem instance:
    1.  Locate the properties files for its subsystem type. These properties files define the configurable properties for that subsystem type and their default values.
    2.  Create a folder named after the subsystem instance under the extension folders.
    3.  Copy the properties files into your new folder.
    4.  Edit the properties files to record the required configuration of the subsystem instance.

-   **[Configuring external authentication](../concepts/auth-external-intro.md)**  
Use this information to enable the external authentication subsystem using the alfresco-global.properties file and the Admin Console in Share.
-   **[Configuring alfrescoNtlm](../concepts/auth-alfrescontlm-intro.md)**  
`alfrescoNtlm` is the subsystem configured by default in the Alfresco Content Services authentication chain. It performs authentication based on user and password information stored in the repository. It is capable of supporting both form-based login and NTLM-based Single Sign-On \(SSO\), as well as providing authentication for the CIFS server.
-   **[Configuring pass-through](../concepts/auth-passthru-intro.md)**  
The pass-through \(`passthru`\) subsystem can be used to replace the standard user database with a Windows server/domain controller, or list of servers, to authenticate users accessing Alfresco Content Services. This saves having to create user accounts within Alfresco Content Services.
-   **[Configuring LDAP](../concepts/auth-ldap-intro.md)**  
An LDAP subsystem supports two main functions:
-   **[Configuring Kerberos](../concepts/auth-kerberos-intro.md)**  
The Java Authentication and Authorization Service \(JAAS\) is used within the Kerberos subsystem to support Kerberos authentication of user names and passwords. You can choose to use Kerberos against an Active Directory server in preference to LDAP or NTLM as it provides strong encryption without using SSL. It would still be possible to export user registry information using a chained LDAP subsystem.
-   **[Share SSO log in bypass](../concepts/auth-alfrescontlm-sso-loginbypass.md)**  
When configuring Share authentication as NTLM SSO, you can bypass the SSO authentication so that it is possible to log in as a different user than the one used in the Windows version.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

